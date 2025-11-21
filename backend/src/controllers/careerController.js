const { analyzeSkillGapForUser } = require('../services/skillService');
const { generateRoadmapForRole } = require('../services/roadmapService');
const { fetchTopTechNews } = require('../services/newsService');
const { validateSkillGapRequest, validateRoadmapRequest } = require('../validators/careerValidators');
const { isDatabaseConnected } = require('../config/database');
const { sendError } = require('../utils/responseHelpers');
const { SUPPORTED_ROLES } = require('../constants/roles');

let Analysis;
try {
  Analysis = require('../models/Analysis');
} catch (err) {
  // Model not available if MongoDB not connected
}

// In-memory storage fallback
const inMemoryAnalyses = [];

exports.analyzeSkillGap = async (req, res) => {
  try {
    const validation = validateSkillGapRequest(req.body);
    
    if (!validation.valid) {
      return sendError(res, validation.error, 400, {
        supportedRoles: SUPPORTED_ROLES,
      });
    }

    const { targetRole, currentSkills } = validation.data;
    const analysisResult = analyzeSkillGapForUser(targetRole, currentSkills);

    // Try to save to MongoDB if available, otherwise use in-memory
    let saved;
    if (isDatabaseConnected() && Analysis) {
      try {
        saved = await Analysis.create({
          targetRole: analysisResult.targetRole,
          currentSkills: analysisResult.currentSkills,
          matchedSkills: analysisResult.matchedSkills,
          missingSkills: analysisResult.missingSkills,
          recommendations: analysisResult.recommendations,
          learningOrder: analysisResult.learningOrder,
        });
      } catch (dbError) {
        console.warn('Database save failed, using in-memory:', dbError.message);
        saved = { ...analysisResult, _id: Date.now(), createdAt: new Date() };
        inMemoryAnalyses.push(saved);
      }
    } else {
      saved = { ...analysisResult, _id: Date.now(), createdAt: new Date() };
      inMemoryAnalyses.push(saved);
    }

    return res.json(saved);
  } catch (err) {
    console.error('analyzeSkillGap error:', err);
    if (err.message && err.message.includes('Unsupported role')) {
      return sendError(res, err.message, 400, {
        supportedRoles: SUPPORTED_ROLES,
      });
    }
    return sendError(res, 'Failed to analyze skill gap. Please try again.', 500);
  }
};

exports.generateRoadmap = async (req, res) => {
  try {
    const validation = validateRoadmapRequest(req.body);
    
    if (!validation.valid) {
      return sendError(res, validation.error, 400, {
        supportedRoles: SUPPORTED_ROLES,
      });
    }

    const { targetRole } = validation.data;
    const roadmap = generateRoadmapForRole(targetRole);
    
    if (roadmap.phases && roadmap.phases.length === 0) {
      return sendError(res, roadmap.note || 'Roadmap not available for this role', 400, {
        supportedRoles: SUPPORTED_ROLES,
      });
    }

    return res.json(roadmap);
  } catch (err) {
    console.error('generateRoadmap error:', err);
    return sendError(res, 'Failed to generate roadmap. Please try again.', 500);
  }
};

exports.getTopTechNews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const news = await fetchTopTechNews(Math.min(limit, 20)); // Max 20 items
    return res.json(news);
  } catch (err) {
    console.error('getTopTechNews error:', err);
    return sendError(
      res,
      'Unable to retrieve tech news. Please try again later.',
      500,
      process.env.NODE_ENV === 'development' ? { details: err.message } : undefined
    );
  }
};
