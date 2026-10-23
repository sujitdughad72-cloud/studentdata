import { apiRequest } from './client';

export const studentApi = {
  getAll: async () => {
    return await apiRequest('/students');
  },

  search: async ({
    query = '',
    course = '',
    department = '',
    academicYear = '',
    semester = '',
    page = 0,
    size = 10,
    sortBy = 'id',
    sortDir = 'asc',
  } = {}) => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (course) params.append('course', course);
    if (department) params.append('department', department);
    if (academicYear) params.append('academicYear', academicYear);
    if (semester !== '' && semester !== null && semester !== undefined) {
      params.append('semester', semester);
    }
    params.append('page', page);
    params.append('size', size);
    params.append('sortBy', sortBy);
    params.append('sortDir', sortDir);

    return await apiRequest(`/students/search?${params.toString()}`);
  },

  getById: async (id) => {
    return await apiRequest(`/students/find/${id}`);
  },

  getByRollno: async (rollno) => {
    return await apiRequest(`/students/rollno/${encodeURIComponent(rollno)}`);
  },

  create: async (studentData) => {
    return await apiRequest('/students/create', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  },

  update: async (id, studentData) => {
    return await apiRequest(`/students/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/students/${id}`, {
      method: 'DELETE',
    });
  },

  getDetained: async () => {
    return await apiRequest('/students/detain');
  },
};
