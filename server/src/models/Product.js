import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

export const CATEGORIES = [
  'Indoor Plants',
  'Outdoor Plants',
  'Seeds',
  'Pots',
  'Fertilizers',
  'Tools',
];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, enum: CATEGORIES, required: true },
    stock: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    images: {
      type: [imageSchema],
      validate: {
        validator: (arr) => arr.length <= 5,
        message: 'A product can have at most 5 images',
      },
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
