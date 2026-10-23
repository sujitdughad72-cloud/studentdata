import { apiRequest } from './client';

export const authApi = {
  login: async (credentials) => {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData) => {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },

  logout: async () => {
    try {
      return await apiRequest('/auth/logout', {
        method: 'POST',
      });
    } catch {
      // Ignore if token already invalidated
    } finally {
      localStorage.removeItem('edupulse_token');
      localStorage.removeItem('edupulse_user');
    }
  },
};
