import api from './api';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('amazon_token', response.data.token);
        localStorage.setItem('amazon_user', JSON.stringify(response.data.user));
      }
      return { success: true, user: response.data.user, source: 'backend' };
    } catch (err) {
      // If backend is offline, provide smooth demo authentication
      if (err.code === 'ERR_NETWORK' || !err.response) {
        const demoUser = {
          name: email.split('@')[0] || 'Demo Shopper',
          email: email,
          isDemo: true,
          token: 'demo-jwt-token-' + Date.now()
        };
        localStorage.setItem('amazon_token', demoUser.token);
        localStorage.setItem('amazon_user', JSON.stringify(demoUser));
        return { success: true, user: demoUser, source: 'mock' };
      }
      return {
        success: false,
        error: err.response?.data?.message || 'Login failed. Please check your credentials.'
      };
    }
  },

  async register(name, email, password) {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      if (response.data.token) {
        localStorage.setItem('amazon_token', response.data.token);
        localStorage.setItem('amazon_user', JSON.stringify(response.data.user));
      }
      return { success: true, user: response.data.user, source: 'backend' };
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || !err.response) {
        const demoUser = {
          name: name,
          email: email,
          isDemo: true,
          token: 'demo-jwt-token-' + Date.now()
        };
        localStorage.setItem('amazon_token', demoUser.token);
        localStorage.setItem('amazon_user', JSON.stringify(demoUser));
        return { success: true, user: demoUser, source: 'mock' };
      }
      return {
        success: false,
        error: err.response?.data?.message || 'Registration failed.'
      };
    }
  },

  getCurrentUser() {
    try {
      const saved = localStorage.getItem('amazon_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem('amazon_token');
    localStorage.removeItem('amazon_user');
  }
};
