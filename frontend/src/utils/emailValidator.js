/**
 * Enhanced email validation with detailed feedback
 * @param {string} email - Email to validate
 * @returns {Object} { valid: boolean, error?: string, suggestions?: string[] }
 */
export const validateEmail = (email) => {
  if (!email) {
    return { valid: false, error: 'Email is required' };
  }

  const trimmedEmail = email.trim();

  // Check for common typos
  const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
  const emailParts = trimmedEmail.split('@');
  
  if (emailParts.length === 2) {
    const domain = emailParts[1].toLowerCase();
    const suggestions = commonDomains
      .filter(d => d.startsWith(domain.substring(0, 3)) || domain.startsWith(d.substring(0, 3)))
      .map(d => `${emailParts[0]}@${d}`)
      .slice(0, 2);

    // Check for common typos in popular domains
    const typoMap = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'gmal.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'yaho.com': 'yahoo.com',
      'outlok.com': 'outlook.com',
      'hotmial.com': 'hotmail.com',
    };

    if (typoMap[domain]) {
      return {
        valid: false,
        error: `Did you mean ${emailParts[0]}@${typoMap[domain]}?`,
        suggestions: [`${emailParts[0]}@${typoMap[domain]}`],
      };
    }
  }

  // Enhanced email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(trimmedEmail)) {
    if (!trimmedEmail.includes('@')) {
      return { valid: false, error: 'Email must contain @ symbol' };
    }
    if (trimmedEmail.indexOf('@') === 0) {
      return { valid: false, error: 'Email must have text before @' };
    }
    if (trimmedEmail.indexOf('@') === trimmedEmail.length - 1) {
      return { valid: false, error: 'Email must have domain after @' };
    }
    if (!trimmedEmail.includes('.')) {
      return { valid: false, error: 'Email must contain a domain (e.g., .com)' };
    }
    return { valid: false, error: 'Please enter a valid email address' };
  }

  // Check for consecutive dots
  if (trimmedEmail.includes('..')) {
    return { valid: false, error: 'Email cannot contain consecutive dots' };
  }

  // Check for spaces
  if (trimmedEmail.includes(' ')) {
    return { valid: false, error: 'Email cannot contain spaces' };
  }

  // Check length
  if (trimmedEmail.length > 254) {
    return { valid: false, error: 'Email is too long (max 254 characters)' };
  }

  return { valid: true };
};

/**
 * Normalize email (lowercase, trim)
 * @param {string} email - Email to normalize
 * @returns {string} Normalized email
 */
export const normalizeEmail = (email) => {
  return email.trim().toLowerCase();
};

