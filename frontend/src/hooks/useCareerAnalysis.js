import { useState } from 'react';
import { analyzeSkillGap, generateRoadmap, fetchTechNews } from '../services/api';

/**
 * Custom hook for career analysis
 * @returns {Object} Analysis state and handlers
 */
export const useCareerAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [skillGap, setSkillGap] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [news, setNews] = useState([]);

  const analyze = async (targetRole, currentSkills) => {
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!targetRole || !currentSkills?.trim()) {
      setError('Please provide both target role and current skills.');
      setIsLoading(false);
      return;
    }

    try {
      const [skillRes, roadmapRes, newsRes] = await Promise.all([
        analyzeSkillGap(targetRole, currentSkills),
        generateRoadmap(targetRole),
        fetchTechNews(5),
      ]);

      setSkillGap(skillRes);
      setRoadmap(roadmapRes);
      setNews(newsRes || []);
    } catch (err) {
      console.error('Analysis error:', err);
      if (err.response) {
        const errorMsg = err.response.data?.message || err.response.data?.error || 'Server error occurred';
        setError(`${errorMsg}. Please check your input and try again.`);
      } else if (err.request) {
        setError('Unable to connect to the backend server. Please make sure the backend is running on port 5000.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSkillGap(null);
    setRoadmap(null);
    setNews([]);
    setError('');
  };

  return {
    isLoading,
    error,
    skillGap,
    roadmap,
    news,
    analyze,
    reset,
  };
};

