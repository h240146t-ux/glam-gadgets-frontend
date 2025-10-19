import apiRequest from './api';

export const authService = {
  // Register new user
  register: async (userData) => {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: userData,
    });
  },

  // Login user
  login: async (credentials) => {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  },

  // Get current user
  getMe: async () => {
    return await apiRequest('/auth/me');
  },

  // Update user details
  updateDetails: async (userData) => {
    return await apiRequest('/auth/updatedetails', {
      method: 'PUT',
      body: userData,
    });
  },
};