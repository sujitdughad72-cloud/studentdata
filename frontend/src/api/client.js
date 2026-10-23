// Centralized API client with JWT Auth handling
import { extractErrorMessage } from '../utils/errorHandler';

// Use production backend URL if set in environment, or fallback to local proxy /api
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '');

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('edupulse_token');

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // If unauthorized, clean up and notify
    if (response.status === 401) {
      localStorage.removeItem('edupulse_token');
      localStorage.removeItem('edupulse_user');
      if (!window.location.pathname.includes('/login')) {
        window.dispatchEvent(new Event('auth:unauthorized'));
      }
    }

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!response.ok) {
      const errorMessage = extractErrorMessage(
        data,
        `Request failed with status ${response.status}`
      );
      const err = new Error(errorMessage);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    const cleanMessage = extractErrorMessage(
      error,
      `Network error communicating with server`
    );
    if (!error.message || error.message === '[object Object]') {
      error.message = cleanMessage;
    }
    console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, cleanMessage, error);
    throw error;
  }
}
