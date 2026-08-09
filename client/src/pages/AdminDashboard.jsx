import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/ProductForm';
import {
  getCategories,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/products';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function loadProducts() {
    setLoading(true);
    return getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getCategories().then(setCategories);
    loadProducts();
  }, []);

  function openCreate() {
    setEditingProduct(null);
    setShowForm(true);
    setError('');
  }

  function openEdit(product) {
    setEditingProduct(product);
    setShowForm(true);
    setError('');
  }

  async function handleSubmit(formData) {
    setSubmitting(true);
    setError('');
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
      } else {
        await createProduct(formData);
      }
      setShowForm(false);
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(product) {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(product._id);
      await loadProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product');
    }
  }

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-earth-700">Admin Dashboard</h1>
          <p className="text-sm text-earth-500">Signed in as {user?.email}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={openCreate}
            className="bg-leaf-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-leaf-700"
          >
            + Add Product
          </button>
          <button
            onClick={handleLogout}
            className="border border-leaf-200 text-earth-700 px-4 py-2 rounded-lg hover:bg-leaf-50"
          >
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white border border-leaf-100 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-earth-700 mb-4">
            {editingProduct ? 'Edit Product' : 'New Product'}
          </h2>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <ProductForm
            initialProduct={editingProduct}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
            submitting={submitting}
          />
        </div>
      )}

      <div className="bg-white border border-leaf-100 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-leaf-50 text-earth-700">
              <tr>
                <th className="text-left px-4 py-3">Image</th>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3">Stock</th>
                <th className="text-left px-4 py-3">Featured</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-leaf-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-leaf-600">
                    Loading...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-earth-500">
                    No products yet. Add your first one!
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id}>
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-leaf-50">
                        {p.images?.[0]?.url ? (
                          <img src={p.images[0].url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-leaf-300">🌿</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-earth-700">{p.name}</td>
                    <td className="px-4 py-3 text-earth-600">{p.category}</td>
                    <td className="px-4 py-3 text-earth-600">₹{p.price}</td>
                    <td className="px-4 py-3 text-earth-600">{p.stock}</td>
                    <td className="px-4 py-3">{p.featured ? '✓' : ''}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-leaf-600 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
