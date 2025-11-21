import axios from 'axios';
import { API_BASE, API_ENDPOINTS } from '../constants/api';

/**
 * Creates an axios instance with base configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Skill gap analysis API
 * @param {string} targetRole - Target career role
 * @param {string} currentSkills - Comma-separated skills or array
 * @returns {Promise} Analysis result
 */
export const analyzeSkillGap = async (targetRole, currentSkills) => {
  const response = await apiClient.post(API_ENDPOINTS.SKILL_GAP, {
    targetRole,
    currentSkills,
  });
  return response.data;
};

/**
 * Generate roadmap API
 * @param {string} targetRole - Target career role
 * @returns {Promise} Roadmap data
 */
export const generateRoadmap = async (targetRole) => {
  const response = await apiClient.post(API_ENDPOINTS.ROADMAP, {
    targetRole,
  });
  return response.data;
};

/**
 * Fetch top tech news API
 * @param {number} limit - Number of stories to fetch
 * @returns {Promise} News array
 */
export const fetchTechNews = async (limit = 5) => {
  const response = await apiClient.get(API_ENDPOINTS.NEWS, {
    params: { limit },
  });
  return response.data;
};

/**
 * Health check API
 * @returns {Promise} Health status
 */
export const checkHealth = async () => {
  const response = await apiClient.get(API_ENDPOINTS.HEALTH);
  return response.data;
};

// Auth API endpoints
export const authAPI = {
  /**
   * Register a new user
   * @param {string} name - User's full name
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise} User data and token
   */
  register: async (name, email, password) => {
    const response = await apiClient.post('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },

  /**
   * Login user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise} User data and token
   */
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Get current user
   * @returns {Promise} User data
   */
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * Logout user
   * @returns {Promise} Logout confirmation
   */
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  /**
   * Check if email is available
   * @param {string} email - Email to check
   * @returns {Promise} Availability status
   */
  checkEmailAvailability: async (email) => {
    const response = await apiClient.get('/auth/check-email', {
      params: { email },
    });
    return response.data;
  },
};

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration and errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't redirect on auth endpoints (login/register) - let them handle errors
    const isAuthEndpoint = error.config?.url?.includes('/auth/login') || 
                          error.config?.url?.includes('/auth/register');
    
    if (error.response?.status === 401 && !isAuthEndpoint) {
      // Token expired or invalid (but not on login/register pages)
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      // Only redirect if not already on auth page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

