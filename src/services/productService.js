import api from './api';
import { mockProducts } from '../data/products';

/**
 * Filter mock products locally when backend is offline
 */
const filterLocalProducts = ({ search, category, brand, minPrice, maxPrice, sort, rating }) => {
  let results = [...mockProducts];

  // Search keyword
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    results = results.filter((p) => 
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  // Category filter
  if (category && category !== 'All') {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  // Brand filter (can be single or comma-separated)
  if (brand) {
    const brandList = Array.isArray(brand) ? brand : brand.split(',').map(b => b.trim().toLowerCase());
    results = results.filter((p) => brandList.includes(p.brand.toLowerCase()));
  }

  // Price range
  if (minPrice !== undefined && minPrice !== '') {
    results = results.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice !== undefined && maxPrice !== '') {
    results = results.filter((p) => p.price <= Number(maxPrice));
  }

  // Rating
  if (rating) {
    results = results.filter((p) => p.rating >= Number(rating));
  }

  // Sorting
  if (sort === 'price_asc') {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating_desc') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'newest') {
    results.sort((a, b) => b.price - a.price);
  }

  return results;
};

export const productService = {
  /**
   * Fetch products with query filters
   */
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params });
      return {
        success: true,
        data: response.data.products || response.data,
        total: response.data.total || response.data.length,
        source: 'backend'
      };
    } catch (err) {
      // Backend not running or endpoint not yet implemented -> fallback to local mock data
      const localFiltered = filterLocalProducts(params);
      return {
        success: true,
        data: localFiltered,
        total: localFiltered.length,
        source: 'mock'
      };
    }
  },

  /**
   * Fetch single product by ID
   */
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return {
        success: true,
        data: response.data.product || response.data,
        source: 'backend'
      };
    } catch (err) {
      // Local fallback
      const found = mockProducts.find((p) => p._id === id || p._id === String(id));
      if (found) {
        return {
          success: true,
          data: found,
          source: 'mock'
        };
      }
      return {
        success: false,
        error: 'Product not found',
        source: 'mock'
      };
    }
  }
};
