/**
 * Supported career roles and their required skills
 * Skills are ordered by importance/priority
 */
const ROLE_SKILLS = {
  // Frontend Roles
  FrontendDeveloper: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
  'UI/UX Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Figma', 'Git'],
  
  // Backend Roles
  'Backend Developer': ['Java', 'Spring Boot', 'SQL', 'APIs', 'Git'],
  'Python Developer': ['Python', 'Django', 'Flask', 'SQL', 'APIs', 'Git'],
  'Node.js Developer': ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'APIs', 'Git'],
  
  // Full Stack Roles
  'MERN Stack Developer': ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript', 'Git'],
  'Full Stack Developer': ['JavaScript', 'React', 'Node.js', 'SQL', 'APIs', 'Git'],
  
  // Data Roles
  'Data Analyst': ['Excel', 'SQL', 'Python', 'Dashboards', 'Statistics'],
  'Data Scientist': ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Jupyter', 'Git'],
  
  // DevOps Roles
  'DevOps Engineer': ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Linux', 'Git'],
  
  // Mobile Roles
  'React Native Developer': ['JavaScript', 'React', 'React Native', 'APIs', 'Git'],
};

/**
 * Supported roles list
 */
const SUPPORTED_ROLES = Object.keys(ROLE_SKILLS).map(key => 
  key === 'FrontendDeveloper' ? 'Frontend Developer' : key
);

/**
 * Role categories for better organization
 */
const ROLE_CATEGORIES = {
  'Frontend': ['Frontend Developer', 'UI/UX Developer'],
  'Backend': ['Backend Developer', 'Python Developer', 'Node.js Developer'],
  'Full Stack': ['MERN Stack Developer', 'Full Stack Developer'],
  'Data': ['Data Analyst', 'Data Scientist'],
  'DevOps': ['DevOps Engineer'],
  'Mobile': ['React Native Developer'],
};

/**
 * Skill synonyms and variations for better matching
 */
const SKILL_SYNONYMS = {
  // JavaScript & Related
  'javascript': ['js', 'ecmascript', 'nodejs', 'node.js', 'node', 'typescript', 'ts', 'es6', 'es2015'],
  'react': ['reactjs', 'react.js', 'reactjs', 'reactjs'],
  'node.js': ['nodejs', 'node', 'nodejs', 'server-side javascript'],
  'express': ['express.js', 'expressjs', 'express framework'],
  
  // Frontend
  'html': ['html5', 'hypertext markup language'],
  'css': ['css3', 'scss', 'sass', 'less', 'stylus', 'styling'],
  'figma': ['ui design', 'ux design', 'design tools', 'prototyping'],
  
  // Backend
  'java': ['java programming', 'java development', 'jdk', 'jvm'],
  'spring boot': ['springboot', 'spring', 'spring framework', 'spring mvc'],
  'python': ['py', 'python3', 'python programming', 'python development'],
  'django': ['django framework', 'django web framework'],
  'flask': ['flask framework', 'flask web framework', 'microframework'],
  
  // Databases
  'sql': ['mysql', 'postgresql', 'postgres', 'database', 'db', 'sqlite', 'mssql', 'oracle'],
  'mongodb': ['mongo', 'nosql', 'document database'],
  
  // APIs & Services
  'apis': ['rest api', 'rest', 'api', 'restful', 'http api', 'web api', 'graphql'],
  
  // Version Control
  'git': ['github', 'gitlab', 'version control', 'vcs', 'source control', 'git version control'],
  
  // Data & Analytics
  'excel': ['microsoft excel', 'ms excel', 'spreadsheet', 'excel sheets'],
  'dashboards': ['dashboard', 'data visualization', 'viz', 'visualization', 'bi dashboard'],
  'statistics': ['stats', 'statistical analysis', 'data analysis', 'statistical methods'],
  'machine learning': ['ml', 'ai', 'artificial intelligence', 'deep learning', 'neural networks'],
  'jupyter': ['jupyter notebook', 'jupyter lab', 'ipython'],
  
  // DevOps
  'docker': ['containerization', 'containers', 'docker containers'],
  'kubernetes': ['k8s', 'container orchestration', 'kube'],
  'ci/cd': ['continuous integration', 'continuous deployment', 'jenkins', 'github actions', 'gitlab ci'],
  'aws': ['amazon web services', 'cloud computing', 'ec2', 's3', 'lambda'],
  'linux': ['unix', 'bash', 'shell scripting', 'command line'],
  
  // Mobile
  'react native': ['reactnative', 'mobile development', 'cross-platform', 'mobile app'],
};

module.exports = {
  ROLE_SKILLS,
  SUPPORTED_ROLES,
  SKILL_SYNONYMS,
  ROLE_CATEGORIES,
};

