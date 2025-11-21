/**
 * API base URL from environment or default
 */
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  HEALTH: '/health',
  SKILL_GAP: '/skill-gap',
  ROADMAP: '/roadmap',
  NEWS: '/news/top-tech',
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
};

