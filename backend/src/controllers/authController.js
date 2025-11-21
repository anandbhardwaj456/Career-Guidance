const { validateRegisterRequest, validateLoginRequest } = require('../validators/authValidators');
const { generateToken } = require('../utils/jwt');
const { sendError, sendSuccess } = require('../utils/responseHelpers');
const { isDatabaseConnected } = require('../config/database');

let User;
try {
  User = require('../models/User');
} catch (err) {
  // Model not available if MongoDB not connected
}

// In-memory user storage fallback
const inMemoryUsers = new Map();

/**
 * Register a new user
 */
exports.register = async (req, res) => {
  try {
    const validation = validateRegisterRequest(req.body);

    if (!validation.valid) {
      return sendError(res, validation.error, 400);
    }

    const { name, email, password } = validation.data;

    // Check if user already exists
    if (isDatabaseConnected() && User) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return sendError(res, 'User with this email already exists', 409);
      }

      // Create new user
      const user = await User.create({ name, email, password });
      const token = generateToken({ userId: user._id, email: user.email, name: user.name });

      return sendSuccess(res, {
        user: user.toJSON(),
        token,
      }, 201);
    } else {
      // In-memory mode
      if (inMemoryUsers.has(email)) {
        return sendError(res, 'User with this email already exists', 409);
      }

      const userData = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date(),
      };

      inMemoryUsers.set(email, {
        ...userData,
        password, // In production, this should be hashed
      });

      const token = generateToken({ userId: userData.id, email, name });

      return sendSuccess(res, {
        user: userData,
        token,
      }, 201);
    }
  } catch (error) {
    console.error('Register error:', error);
    
    if (error.code === 11000) {
      return sendError(res, 'User with this email already exists', 409);
    }

    return sendError(res, 'Failed to create account. Please try again.', 500);
  }
};

/**
 * Login user
 */
exports.login = async (req, res) => {
  try {
    const validation = validateLoginRequest(req.body);

    if (!validation.valid) {
      return sendError(res, validation.error, 400);
    }

    const { email, password } = validation.data;

    if (isDatabaseConnected() && User) {
      // Find user with password field
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return sendError(res, 'Invalid email or password', 401);
      }

      // Compare password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return sendError(res, 'Invalid email or password', 401);
      }

      const token = generateToken({ userId: user._id, email: user.email, name: user.name });

      return sendSuccess(res, {
        user: user.toJSON(),
        token,
      });
    } else {
      // In-memory mode
      const storedUser = inMemoryUsers.get(email);

      if (!storedUser || storedUser.password !== password) {
        return sendError(res, 'Invalid email or password', 401);
      }

      const userData = {
        id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email,
      };

      const token = generateToken({ userId: userData.id, email, name: userData.name });

      return sendSuccess(res, {
        user: userData,
        token,
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    
    // Provide more specific error messages
    if (error.message && error.message.includes('password')) {
      return sendError(res, 'Invalid email or password', 401);
    }
    
    return sendError(res, 'Failed to login. Please try again.', 500);
  }
};

/**
 * Get current user
 */
exports.getMe = async (req, res) => {
  try {
    if (isDatabaseConnected() && User && req.user._id) {
      const user = await User.findById(req.user._id);
      return sendSuccess(res, { user: user.toJSON() });
    } else {
      return sendSuccess(res, { user: req.user });
    }
  } catch (error) {
    console.error('GetMe error:', error);
    return sendError(res, 'Failed to fetch user data', 500);
  }
};

/**
 * Logout user (client-side token removal, but we can add token blacklisting here)
 */
exports.logout = async (req, res) => {
  // In a production app, you might want to blacklist the token
  // For now, we'll just return success (client removes token)
  return sendSuccess(res, { message: 'Logged out successfully' });
};

/**
 * Check if email is available
 */
exports.checkEmailAvailability = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return sendError(res, 'Email is required', 400);
    }

    const { isValidEmail } = require('../validators/authValidators');
    if (!isValidEmail(email)) {
      return sendError(res, 'Invalid email format', 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isDatabaseConnected() && User) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return sendSuccess(res, { available: false, message: 'This email is already registered' });
      }
    } else {
      // In-memory mode
      if (inMemoryUsers.has(normalizedEmail)) {
        return sendSuccess(res, { available: false, message: 'This email is already registered' });
      }
    }

    return sendSuccess(res, { available: true, message: 'Email is available' });
  } catch (error) {
    console.error('CheckEmailAvailability error:', error);
    return sendError(res, 'Failed to check email availability', 500);
  }
};

