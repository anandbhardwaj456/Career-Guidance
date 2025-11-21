/**
 * Formats a Unix timestamp to a readable date string
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  return new Date(timestamp * 1000).toLocaleString();
};

/**
 * Calculates skill match percentage
 * @param {Object} skillGap - Skill gap analysis result
 * @returns {number} Match percentage (0-100)
 */
export const calculateMatchPercentage = (skillGap) => {
  if (!skillGap) return 0;
  const total = (skillGap.matchedSkills?.length || 0) + (skillGap.missingSkills?.length || 0);
  if (!total) return 0;
  return Math.round(((skillGap.matchedSkills?.length || 0) / total) * 100);
};

/**
 * Formats user's name from email
 * @param {string} email - User email
 * @returns {string} Formatted name
 */
export const formatNameFromEmail = (email) => {
  if (!email) return 'User';
  return email.split('@')[0];
};

