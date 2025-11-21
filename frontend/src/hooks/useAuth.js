import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

/**
 * Custom hook for authentication with backend API
 * @returns {Object} Auth state and handlers
 */
export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Verify token on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !user) {
      verifyToken();
    }
  }, []);

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return;

      const response = await authAPI.getMe();
      if (response.success && response.data.user) {
        setUser(response.data.user);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      } else {
        // Token invalid, clear storage
        clearAuth();
      }
    } catch (err) {
      // Token invalid or expired
      clearAuth();
    }
  };

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const login = async (email, password) => {
    // Prevent multiple simultaneous login attempts
    if (loading) {
      throw new Error('Login already in progress. Please wait...');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(email, password);

      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        
        // Store token and user data
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setUser(userData);

        return userData;
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to login. Please check your credentials and try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    // Prevent multiple simultaneous registration attempts
    if (loading) {
      throw new Error('Registration already in progress. Please wait...');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.register(name, email, password);

      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        
        // Store token and user data
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setUser(userData);

        return userData;
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (err) {
      // Handle specific error cases
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (err.response?.status === 409) {
        errorMessage = 'This email is already registered. Please login instead.';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearAuth();
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};

