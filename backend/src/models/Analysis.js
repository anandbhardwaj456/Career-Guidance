const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema(
  {
    targetRole: { type: String, required: true },
    currentSkills: [{ type: String }],
    matchedSkills: [{ type: String }],
    missingSkills: [{ type: String }],
    recommendations: { type: String },
    learningOrder: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analysis', analysisSchema);
