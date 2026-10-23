import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('edupulse_token'));
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('edupulse_token');
      const storedUser = localStorage.getItem('edupulse_user');

      if (storedToken) {
        try {
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
          // Verify with backend
          const me = await authApi.getCurrentUser();
          if (me) {
            setUser(me);
            localStorage.setItem('edupulse_user', JSON.stringify(me));
          }
        } catch (err) {
          console.warn('Session expired or invalid:', err.message);
          localStorage.removeItem('edupulse_token');
          localStorage.removeItem('edupulse_user');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();

    const handleUnauthorized = () => {
      setUser(null);
      setToken(null);
      addToast('Your session has expired. Please log in again.', 'warning');
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [addToast]);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    if (data && data.token) {
      localStorage.setItem('edupulse_token', data.token);
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        role: data.role || 'ROLE_STUDENT',
      };
      localStorage.setItem('edupulse_user', JSON.stringify(userData));
      setToken(data.token);
      setUser(userData);
      addToast(`Welcome back, ${userData.fullName || userData.username}!`, 'success');
      return userData;
    }
    throw new Error(data?.message || 'Login failed');
  };

  const register = async (userData) => {
    const response = await authApi.register(userData);
    addToast('Account created successfully! You can now log in.', 'success');
    return response;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore
    } finally {
      localStorage.removeItem('edupulse_token');
      localStorage.removeItem('edupulse_user');
      setUser(null);
      setToken(null);
      addToast('Logged out successfully', 'info');
    }
  };

  const isAdmin = user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN';
  const isTeacher = user?.role === 'ROLE_TEACHER' || user?.role === 'TEACHER';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        isAdmin,
        isTeacher,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
