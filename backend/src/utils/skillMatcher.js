const { SKILL_SYNONYMS } = require('../constants/roles');

/**
 * Normalizes a skill string by trimming, lowercasing, and removing special characters
 * @param {string} skill - The skill to normalize
 * @returns {string} Normalized skill
 */
function normalizeSkill(skill) {
  return skill.trim().toLowerCase().replace(/[^\w\s]/g, '');
}

/**
 * Finds if a user skill matches a required skill using various matching strategies
 * @param {string} userSkill - User's skill
 * @param {string} requiredSkill - Required skill for the role
 * @returns {boolean} True if skills match
 */
function findSkillMatch(userSkill, requiredSkill) {
  const normalizedUser = normalizeSkill(userSkill);
  const normalizedRequired = normalizeSkill(requiredSkill);

  // Exact match
  if (normalizedUser === normalizedRequired) {
    return true;
  }

  // Contains match (e.g., "JavaScript" matches "JS" or "React" matches "React.js")
  if (normalizedUser.includes(normalizedRequired) || normalizedRequired.includes(normalizedUser)) {
    return true;
  }

  // Synonym match
  const requiredKey = normalizedRequired;
  const synonyms = SKILL_SYNONYMS[requiredKey] || [];
  if (synonyms.some(syn => normalizedUser === syn || normalizedUser.includes(syn) || syn.includes(normalizedUser))) {
    return true;
  }

  // Check if user skill is a synonym of required skill
  for (const [key, synList] of Object.entries(SKILL_SYNONYMS)) {
    if (key === normalizedRequired && synList.includes(normalizedUser)) {
      return true;
    }
  }

  return false;
}

module.exports = {
  normalizeSkill,
  findSkillMatch,
};

