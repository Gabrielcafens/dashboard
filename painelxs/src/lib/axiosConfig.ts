import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Obtém o token do localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Inclui o token no cabeçalho Authorization
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
