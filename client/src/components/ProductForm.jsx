import { useEffect, useState } from 'react';

const MAX_IMAGES = 5;

export default function ProductForm({ initialProduct, categories, onSubmit, onCancel, submitting }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('0');
  const [featured, setFeatured] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [removedIds, setRemovedIds] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name || '');
      setDescription(initialProduct.description || '');
      setPrice(String(initialProduct.price ?? ''));
      setCategory(initialProduct.category || '');
      setStock(String(initialProduct.stock ?? 0));
      setFeatured(!!initialProduct.featured);
      setExistingImages(initialProduct.images || []);
      setRemovedIds([]);
      setNewFiles([]);
    }
  }, [initialProduct]);

  const remainingSlots = MAX_IMAGES - (existingImages.length - removedIds.length) - newFiles.length;

  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    setError('');
    if (files.length > remainingSlots) {
      setError(`You can only add ${remainingSlots} more image(s) (max ${MAX_IMAGES} total).`);
      e.target.value = '';
      return;
    }
    setNewFiles((prev) => [...prev, ...files]);
    e.target.value = '';
  }

  function removeNewFile(idx) {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  function toggleRemoveExisting(publicId) {
    setRemovedIds((prev) =>
      prev.includes(publicId) ? prev.filter((id) => id !== publicId) : [...prev, publicId]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!name || !price || !category) {
      setError('Name, price, and category are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('featured', featured);
    removedIds.forEach((id) => formData.append('removeImageIds', id));
    newFiles.forEach((file) => formData.append('images', file));

    onSubmit(formData);
  }

  const visibleExisting = existingImages.filter((img) => !removedIds.includes(img.publicId));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-leaf-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">Category</label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-leaf-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf-400"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">Price (₹)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-leaf-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">Stock</label>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border border-leaf-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-leaf-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf-400"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-earth-700">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        Featured on homepage
      </label>

      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">
          Images ({visibleExisting.length + newFiles.length}/{MAX_IMAGES})
        </label>

        <div className="flex flex-wrap gap-3 mb-3">
          {visibleExisting.map((img) => (
            <div key={img.publicId} className="relative w-20 h-20 rounded-lg overflow-hidden border border-leaf-200">
              <img src={img.url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => toggleRemoveExisting(img.publicId)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
          {newFiles.map((file, idx) => (
            <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-leaf-200">
              <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeNewFile(idx)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {remainingSlots > 0 && (
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="text-sm" />
        )}
      </div>

      <div className="flex gap-3 justify-end pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-leaf-200 text-earth-700 hover:bg-leaf-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-lg bg-leaf-600 text-white font-semibold hover:bg-leaf-700 disabled:opacity-60"
        >
          {submitting ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
}
