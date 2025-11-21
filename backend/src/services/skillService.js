const { ROLE_SKILLS } = require('../constants/roles');
const { findSkillMatch } = require('../utils/skillMatcher');

function analyzeSkillGapForUser(targetRole, currentSkillsList) {
  const roleKey =
    targetRole === 'Frontend Developer' ? 'FrontendDeveloper' : targetRole;

  const requiredSkills = ROLE_SKILLS[roleKey];

  if (!requiredSkills) {
    throw new Error(`Unsupported role: ${targetRole}. Please choose from the available roles.`);
  }

  const matchedSkills = [];
  const missingSkills = [];
  const matchedUserSkills = []; // Track which user skills matched

  requiredSkills.forEach((required) => {
    let isMatched = false;
    for (const userSkill of currentSkillsList) {
      if (findSkillMatch(userSkill, required)) {
        isMatched = true;
        if (!matchedUserSkills.includes(userSkill)) {
          matchedUserSkills.push(userSkill);
        }
        break;
      }
    }

    if (isMatched) {
      matchedSkills.push(required);
    } else {
      missingSkills.push(required);
    }
  });

  // Prioritize missing skills based on importance
  const learningOrder = [...missingSkills];

  // Generate personalized recommendations
  let recommendations;
  const matchPercentage = Math.round((matchedSkills.length / requiredSkills.length) * 100);
  
  if (matchPercentage === 100) {
    recommendations = 'Excellent! You have all the core skills. Focus on building real-world projects, contributing to open source, and deepening your expertise in advanced topics.';
  } else if (matchPercentage >= 60) {
    recommendations = `You're ${matchPercentage}% ready! Focus on mastering: ${learningOrder.slice(0, 2).join(' and ')}. Then work on ${learningOrder.slice(2).join(', ')}. Build small projects to practice these skills.`;
  } else if (matchPercentage >= 30) {
    recommendations = `You have a solid foundation (${matchPercentage}% match). Start with the fundamentals: ${learningOrder.slice(0, 2).join(' and ')}. These are critical for your target role. Once comfortable, move to ${learningOrder[2] || 'the remaining skills'}.`;
  } else {
    recommendations = `You're starting your journey (${matchPercentage}% match). Begin with the most essential skills: ${learningOrder.slice(0, 2).join(' and ')}. Take structured courses, practice daily, and build simple projects. Don't rush—master the basics first.`;
  }

  return {
    targetRole,
    currentSkills: currentSkillsList,
    matchedSkills,
    missingSkills,
    recommendations,
    learningOrder,
    matchPercentage,
    totalRequired: requiredSkills.length,
  };
}

module.exports = {
  analyzeSkillGapForUser,
  ROLE_SKILLS,
};
