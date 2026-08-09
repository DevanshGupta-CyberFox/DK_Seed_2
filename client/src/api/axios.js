import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-drab-three-87.vercel.app/api',
  withCredentials: true,
});

export default api;
