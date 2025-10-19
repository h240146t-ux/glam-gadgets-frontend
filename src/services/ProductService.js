import apiRequest from './api';

export const productService = {
  // Get all products
  getProducts: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await apiRequest(`/products?${queryParams}`);
  },

  // Get single product
  getProduct: async (id) => {
    return await apiRequest(`/products/${id}`);
  },
};