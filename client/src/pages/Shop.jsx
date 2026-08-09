import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getCategories, getProducts } from '../api/products';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;
    getProducts(params)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [category, search]);

  function updateParams(next) {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    setSearchParams(params);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-earth-700 mb-6">Shop</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form
          className="flex-1 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            updateParams({ search: searchInput });
          }}
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search plants, seeds, pots..."
            className="flex-1 border border-leaf-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf-400"
          />
          <button
            type="submit"
            className="bg-leaf-600 text-white px-4 py-2 rounded-lg hover:bg-leaf-700 transition-colors"
          >
            Search
          </button>
        </form>

        <select
          value={category}
          onChange={(e) => updateParams({ category: e.target.value })}
          className="border border-leaf-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf-400"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-leaf-600 py-12">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-earth-500 py-12">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
