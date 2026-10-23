import { apiRequest } from './client';

export const departmentApi = {
  getAll: async () => {
    return await apiRequest('/departments');
  },

  getById: async (id) => {
    return await apiRequest(`/departments/${id}`);
  },

  create: async (department) => {
    return await apiRequest('/departments', {
      method: 'POST',
      body: JSON.stringify(department),
    });
  },

  update: async (id, department) => {
    return await apiRequest(`/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(department),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/departments/${id}`, {
      method: 'DELETE',
    });
  },
};
