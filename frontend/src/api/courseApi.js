import { apiRequest } from './client';

export const courseApi = {
  getAll: async () => {
    return await apiRequest('/courses');
  },

  getById: async (id) => {
    return await apiRequest(`/courses/${id}`);
  },

  getByDepartment: async (deptName) => {
    return await apiRequest(`/courses/department/${encodeURIComponent(deptName)}`);
  },

  create: async (course) => {
    return await apiRequest('/courses', {
      method: 'POST',
      body: JSON.stringify(course),
    });
  },

  update: async (id, course) => {
    return await apiRequest(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(course),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/courses/${id}`, {
      method: 'DELETE',
    });
  },
};
