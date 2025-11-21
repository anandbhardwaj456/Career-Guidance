import { ROLE_SKILLS } from '../constants/roles';

/**
 * Get suggested skills for a role
 * @param {string} role - Target role
 * @returns {string[]} Array of suggested skills
 */
export const getSuggestedSkills = (role) => {
  const roleKey = role === 'Frontend Developer' ? 'FrontendDeveloper' : role;
  return ROLE_SKILLS[roleKey] || [];
};

/**
 * Parse skills from comma-separated string
 * @param {string} skillsString - Comma-separated skills
 * @returns {string[]} Array of skills
 */
export const parseSkills = (skillsString) => {
  if (!skillsString) return [];
  return skillsString
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);
};

/**
 * Format skills array to comma-separated string
 * @param {string[]} skills - Array of skills
 * @returns {string} Comma-separated string
 */
export const formatSkills = (skills) => {
  return skills.join(', ');
};

/**
 * Common additional skills by role
 */
export const ADDITIONAL_SKILLS = {
  'Frontend Developer': [
    'TypeScript', 'Vue.js', 'Angular', 'Next.js', 'Svelte',
    'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Redux', 'Zustand',
    'Webpack', 'Vite', 'Jest', 'Cypress', 'Storybook'
  ],
  'UI/UX Developer': [
    'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Prototyping',
    'Tailwind CSS', 'Styled Components', 'Framer Motion', 'Design Systems',
    'User Research', 'Wireframing', 'Accessibility', 'Responsive Design'
  ],
  'Backend Developer': [
    'Python', 'Node.js', 'Express', 'Django', 'Flask',
    'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'GraphQL', 'Microservices', 'RabbitMQ'
  ],
  'Python Developer': [
    'Django REST Framework', 'FastAPI', 'Celery', 'Redis',
    'PostgreSQL', 'SQLAlchemy', 'Pytest', 'Docker',
    'AWS Lambda', 'Serverless', 'Web Scraping', 'Automation'
  ],
  'Node.js Developer': [
    'TypeScript', 'Nest.js', 'Socket.io', 'GraphQL',
    'MongoDB', 'PostgreSQL', 'Redis', 'Docker',
    'Microservices', 'Serverless', 'AWS', 'Testing'
  ],
  'MERN Stack Developer': [
    'TypeScript', 'Redux', 'Socket.io', 'JWT',
    'MongoDB Atlas', 'Express Middleware', 'React Router',
    'Deployment', 'Testing', 'Performance Optimization'
  ],
  'Full Stack Developer': [
    'TypeScript', 'Next.js', 'GraphQL', 'Docker',
    'PostgreSQL', 'MongoDB', 'Redis', 'AWS',
    'CI/CD', 'Testing', 'Microservices'
  ],
  'Data Analyst': [
    'R', 'Tableau', 'Power BI', 'Jupyter', 'Pandas',
    'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'TensorFlow',
    'Google Analytics', 'A/B Testing', 'Machine Learning', 'Data Mining'
  ],
  'Data Scientist': [
    'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn',
    'Pandas', 'NumPy', 'Matplotlib', 'Seaborn',
    'NLP', 'Computer Vision', 'Deep Learning', 'MLOps'
  ],
  'DevOps Engineer': [
    'Terraform', 'Ansible', 'Jenkins', 'GitLab CI',
    'AWS', 'Azure', 'GCP', 'Kubernetes',
    'Prometheus', 'Grafana', 'ELK Stack', 'Helm'
  ],
  'React Native Developer': [
    'TypeScript', 'Redux', 'React Navigation',
    'Firebase', 'Expo', 'Native Modules',
    'App Store', 'Google Play', 'Push Notifications'
  ],
};

/**
 * Get all suggested skills including additional ones
 * @param {string} role - Target role
 * @returns {string[]} Array of all suggested skills
 */
export const getAllSuggestedSkills = (role) => {
  const core = getSuggestedSkills(role);
  const additional = ADDITIONAL_SKILLS[role] || [];
  return [...core, ...additional];
};

