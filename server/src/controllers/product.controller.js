import Product, { CATEGORIES } from '../models/Product.js';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function uniqueSlug(name, excludeId) {
  const base = slugify(name);
  let slug = base;
  let n = 1;
  while (true) {
    const query = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Product.findOne(query);
    if (!existing) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

export async function listProducts(req, res) {
  const { category, search, featured } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (featured === 'true') filter.featured = true;
  if (search) filter.name = { $regex: search, $options: 'i' };

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
}

export async function getProduct(req, res) {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

export async function getProductById(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

export function getCategories(req, res) {
  res.json(CATEGORIES);
}

export async function createProduct(req, res) {
  const { name, description, price, category, stock, featured } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ message: 'name, price, and category are required' });
  }
  if (!CATEGORIES.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  const files = req.files || [];
  if (files.length > 5) {
    return res.status(400).json({ message: 'A product can have at most 5 images' });
  }

  const uploaded = await Promise.all(files.map((f) => uploadBufferToCloudinary(f.buffer)));

  const slug = await uniqueSlug(name);

  const product = await Product.create({
    name,
    slug,
    description,
    price,
    category,
    stock: stock || 0,
    featured: featured === 'true' || featured === true,
    images: uploaded,
  });

  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const { name, description, price, category, stock, featured, removeImageIds } = req.body;

  if (category && !CATEGORIES.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  let removeIds = [];
  if (removeImageIds) {
    removeIds = Array.isArray(removeImageIds) ? removeImageIds : [removeImageIds];
  }

  const remainingImages = product.images.filter((img) => !removeIds.includes(img.publicId));
  const files = req.files || [];

  if (remainingImages.length + files.length > 5) {
    return res.status(400).json({ message: 'A product can have at most 5 images' });
  }

  const toDelete = product.images.filter((img) => removeIds.includes(img.publicId));
  await Promise.all(toDelete.map((img) => deleteFromCloudinary(img.publicId)));

  const uploaded = await Promise.all(files.map((f) => uploadBufferToCloudinary(f.buffer)));

  if (name && name !== product.name) {
    product.slug = await uniqueSlug(name, product._id);
    product.name = name;
  }
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;
  if (category !== undefined) product.category = category;
  if (stock !== undefined) product.stock = stock;
  if (featured !== undefined) product.featured = featured === 'true' || featured === true;
  product.images = [...remainingImages, ...uploaded];

  await product.save();
  res.json(product);
}

export async function deleteProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await Promise.all(product.images.map((img) => deleteFromCloudinary(img.publicId)));
  await product.deleteOne();

  res.json({ message: 'Product deleted' });
}
