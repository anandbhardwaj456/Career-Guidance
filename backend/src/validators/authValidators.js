/**
 * Validates email format with enhanced regex
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Enhanced email regex (RFC 5322 compliant subset)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Additional checks
  if (email.length > 254) {
    return false; // RFC 5321 limit
  }

  if (email.includes('..')) {
    return false; // No consecutive dots
  }

  if (email.startsWith('.') || email.endsWith('.')) {
    return false; // Cannot start or end with dot
  }

  return emailRegex.test(email);
}

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {Object} { valid: boolean, error?: string }
 */
function validatePassword(password) {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }

  if (password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters long' };
  }

  if (password.length > 50) {
    return { valid: false, error: 'Password cannot exceed 50 characters' };
  }

  return { valid: true };
}

/**
 * Validates name
 * @param {string} name - Name to validate
 * @returns {Object} { valid: boolean, error?: string }
 */
function validateName(name) {
  if (!name) {
    return { valid: false, error: 'Name is required' };
  }

  if (name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters long' };
  }

  if (name.length > 50) {
    return { valid: false, error: 'Name cannot exceed 50 characters' };
  }

  return { valid: true };
}

/**
 * Validates registration request
 * @param {Object} body - Request body
 * @returns {Object} { valid: boolean, error?: string, data?: Object }
 */
function validateRegisterRequest(body) {
  const { name, email, password } = body;

  const nameValidation = validateName(name);
  if (!nameValidation.valid) {
    return nameValidation;
  }

  if (!email) {
    return { valid: false, error: 'Email is required' };
  }

  if (!isValidEmail(email)) {
    return { valid: false, error: 'Please provide a valid email address' };
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    return passwordValidation;
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    },
  };
}

/**
 * Validates login request
 * @param {Object} body - Request body
 * @returns {Object} { valid: boolean, error?: string, data?: Object }
 */
function validateLoginRequest(body) {
  const { email, password } = body;

  if (!email) {
    return { valid: false, error: 'Email is required' };
  }

  if (!isValidEmail(email)) {
    return { valid: false, error: 'Please provide a valid email address' };
  }

  if (!password) {
    return { valid: false, error: 'Password is required' };
  }

  return {
    valid: true,
    data: {
      email: email.toLowerCase().trim(),
      password,
    },
  };
}

module.exports = {
  validateRegisterRequest,
  validateLoginRequest,
  validatePassword,
  validateName,
  isValidEmail,
};

