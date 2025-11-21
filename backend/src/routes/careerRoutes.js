const express = require('express');
const {
  analyzeSkillGap,
  generateRoadmap,
  getTopTechNews,
} = require('../controllers/careerController');

const router = express.Router();

router.post('/skill-gap', analyzeSkillGap);
router.post('/roadmap', generateRoadmap);
router.get('/news/top-tech', getTopTechNews);

module.exports = router;
