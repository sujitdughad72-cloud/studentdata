import { apiRequest } from './client';

export const academicYearApi = {
  getAll: async () => {
    return await apiRequest('/academic-years');
  },

  getCurrent: async () => {
    return await apiRequest('/academic-years/current');
  },

  getById: async (id) => {
    return await apiRequest(`/academic-years/${id}`);
  },

  create: async (academicYear) => {
    return await apiRequest('/academic-years', {
      method: 'POST',
      body: JSON.stringify(academicYear),
    });
  },

  setCurrent: async (id) => {
    return await apiRequest(`/academic-years/${id}/set-current`, {
      method: 'PUT',
    });
  },

  delete: async (id) => {
    return await apiRequest(`/academic-years/${id}`, {
      method: 'DELETE',
    });
  },
};
