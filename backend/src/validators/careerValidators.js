const { SUPPORTED_ROLES } = require('../constants/roles');

/**
 * Validates target role
 * @param {string} targetRole - The target role to validate
 * @returns {Object} { valid: boolean, error?: string }
 */
function validateTargetRole(targetRole) {
  if (!targetRole) {
    return { valid: false, error: 'targetRole is required' };
  }

  if (typeof targetRole !== 'string' || targetRole.trim().length === 0) {
    return { valid: false, error: 'targetRole must be a non-empty string' };
  }

  const normalizedRole = targetRole === 'Frontend Developer' ? 'FrontendDeveloper' : targetRole;
  const roleKey = normalizedRole === 'FrontendDeveloper' ? 'Frontend Developer' : normalizedRole;

  if (!SUPPORTED_ROLES.includes(roleKey)) {
    return {
      valid: false,
      error: `Unsupported role: ${targetRole}. Supported roles: ${SUPPORTED_ROLES.join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Validates current skills input
 * @param {*} currentSkills - The current skills to validate
 * @returns {Object} { valid: boolean, error?: string, skills?: string[] }
 */
function validateCurrentSkills(currentSkills) {
  if (!currentSkills) {
    return { valid: false, error: 'currentSkills is required' };
  }

  let skillsList;
  if (Array.isArray(currentSkills)) {
    skillsList = currentSkills.map(s => String(s).trim()).filter(Boolean);
  } else {
    skillsList = String(currentSkills)
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }

  if (skillsList.length === 0) {
    return { valid: false, error: 'Please provide at least one skill' };
  }

  return { valid: true, skills: skillsList };
}

/**
 * Validates skill gap analysis request
 * @param {Object} body - Request body
 * @returns {Object} { valid: boolean, error?: string, data?: Object }
 */
function validateSkillGapRequest(body) {
  const { targetRole, currentSkills } = body;

  const roleValidation = validateTargetRole(targetRole);
  if (!roleValidation.valid) {
    return roleValidation;
  }

  const skillsValidation = validateCurrentSkills(currentSkills);
  if (!skillsValidation.valid) {
    return skillsValidation;
  }

  return {
    valid: true,
    data: {
      targetRole,
      currentSkills: skillsValidation.skills,
    },
  };
}

/**
 * Validates roadmap generation request
 * @param {Object} body - Request body
 * @returns {Object} { valid: boolean, error?: string, data?: Object }
 */
function validateRoadmapRequest(body) {
  const { targetRole } = body;

  const roleValidation = validateTargetRole(targetRole);
  if (!roleValidation.valid) {
    return roleValidation;
  }

  return {
    valid: true,
    data: { targetRole },
  };
}

module.exports = {
  validateTargetRole,
  validateCurrentSkills,
  validateSkillGapRequest,
  validateRoadmapRequest,
};

