import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from || '/admin';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-earth-700 mb-6 text-center">Admin Login</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-leaf-100 rounded-xl shadow-sm p-6 flex flex-col gap-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-leaf-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-leaf-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf-400"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-leaf-600 text-white font-semibold py-2 rounded-lg hover:bg-leaf-700 transition-colors disabled:opacity-60"
        >
          {submitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
