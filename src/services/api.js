import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Request Interceptor: Attach JWT Token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('amazon_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle standard responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend is not running (Network Error or refused), log gracefully
    if (error.code === 'ERR_NETWORK' || !error.response) {
      console.warn('Backend server unreachable at', API_BASE_URL, '– Operating in client demo mode.');
    }
    return Promise.reject(error);
  }
);

export default api;
