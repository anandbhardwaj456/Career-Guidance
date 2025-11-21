const { extractToken, verifyToken } = require('../utils/jwt');
const { isDatabaseConnected } = require('../config/database');
const { sendError } = require('../utils/responseHelpers');

let User;
try {
  User = require('../models/User');
} catch (err) {
  // Model not available if MongoDB not connected
}

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
const authenticate = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return sendError(res, 'Authentication required. Please login.', 401);
    }

    const decoded = verifyToken(token);

    // If database is connected, fetch user
    if (isDatabaseConnected() && User) {
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return sendError(res, 'User not found. Please login again.', 401);
      }

      req.user = user;
    } else {
      // In-memory mode: use decoded token data
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
      };
    }

    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token. Please login again.', 401);
  }
};

/**
 * Optional authentication middleware
 * Attaches user if token is valid, but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (token) {
      const decoded = verifyToken(token);
      
      if (isDatabaseConnected() && User) {
        const user = await User.findById(decoded.userId).select('-password');
        if (user) {
          req.user = user;
        }
      } else {
        req.user = {
          id: decoded.userId,
          email: decoded.email,
          name: decoded.name,
        };
      }
    }
  } catch (error) {
    // Ignore errors for optional auth
  }

  next();
};

module.exports = {
  authenticate,
  optionalAuth,
};

