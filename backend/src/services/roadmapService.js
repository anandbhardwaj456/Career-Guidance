const baseRoadmaps = {
  'Backend Developer': [
    {
      phase: 'Phase 1: Foundations (1–2 months)',
      focus: 'Core Java, OOP, Git, basic SQL',
      topics: [
        'Java basics (variables, loops, conditionals)',
        'Object-Oriented Programming (OOP) principles',
        'Java Collections Framework',
        'Git & GitHub workflows',
        'Basic SQL queries and database concepts'
      ],
      resources: ['Oracle Java Tutorials', 'GitHub Learning Lab', 'SQLBolt'],
      estimatedTime: '40-60 hours',
    },
    {
      phase: 'Phase 2: Backend Skills (2–3 months)',
      focus: 'Spring Boot, REST APIs, relational DBs',
      topics: [
        'Spring Boot fundamentals and dependency injection',
        'REST API design and HTTP methods',
        'Advanced SQL (joins, subqueries, transactions)',
        'Authentication & Authorization (JWT)',
        'Database migrations and ORM basics'
      ],
      resources: ['Spring Boot Official Docs', 'REST API Design Guide', 'PostgreSQL Docs'],
      estimatedTime: '80-120 hours',
    },
    {
      phase: 'Phase 3: Projects & Deployment (1–2 months)',
      focus: 'Build production-like projects, deployment, system design basics',
      topics: [
        'Build 2–3 portfolio projects (Todo API, Blog API, E-commerce backend)',
        'Deploy on cloud platforms (Render/Railway/AWS)',
        'Intro to system design and scalability',
        'API documentation (Swagger/OpenAPI)',
        'Testing basics (unit & integration tests)'
      ],
      resources: ['System Design Primer', 'Docker Basics', 'Testing Best Practices'],
      estimatedTime: '60-80 hours',
    },
  ],
  FrontendDeveloper: [
    {
      phase: 'Phase 1: Web Foundations (1–2 months)',
      focus: 'HTML, CSS, JavaScript basics',
      topics: [
        'Semantic HTML5 and accessibility',
        'Modern CSS (Flexbox, Grid, CSS Variables)',
        'JavaScript fundamentals (ES6+, async/await)',
        'DOM manipulation and events',
        'Responsive design principles'
      ],
      resources: ['MDN Web Docs', 'CSS-Tricks', 'JavaScript.info'],
      estimatedTime: '50-70 hours',
    },
    {
      phase: 'Phase 2: Frontend Framework (2–3 months)',
      focus: 'React, state management, API integration',
      topics: [
        'React components, hooks, and lifecycle',
        'State management (useState, useContext, Redux)',
        'React Router for navigation',
        'Working with REST APIs (fetch, axios)',
        'UI libraries & Tailwind CSS',
        'Form handling and validation'
      ],
      resources: ['React Official Docs', 'React Router Docs', 'Tailwind CSS Docs'],
      estimatedTime: '100-150 hours',
    },
    {
      phase: 'Phase 3: Production UI & Portfolio (1–2 months)',
      focus: 'Complex UIs, testing, deployment',
      topics: [
        'Build 2–3 SPA projects (Todo App, Weather App, Portfolio)',
        'Testing basics (Jest, React Testing Library)',
        'Performance optimization',
        'Deployment on Netlify/Vercel',
        'CI/CD basics'
      ],
      resources: ['Vercel Deployment Guide', 'React Testing Library', 'Web Performance'],
      estimatedTime: '60-90 hours',
    },
  ],
  'Data Analyst': [
    {
      phase: 'Phase 1: Data Foundations (1–2 months)',
      focus: 'Excel, SQL basics, analytical thinking',
      topics: [
        'Excel formulas, pivot tables, and data cleaning',
        'SQL querying (SELECT, WHERE, GROUP BY, JOINs)',
        'Descriptive statistics (mean, median, mode, variance)',
        'Data types and data quality assessment',
        'Basic data visualization in Excel'
      ],
      resources: ['SQLBolt', 'Khan Academy Statistics', 'ExcelJet'],
      estimatedTime: '40-60 hours',
    },
    {
      phase: 'Phase 2: Tools & Visualization (2–3 months)',
      focus: 'Python for analysis, dashboards',
      topics: [
        'Python basics and pandas for data manipulation',
        'Data visualization (Matplotlib, Seaborn)',
        'BI tools (Power BI / Tableau basics)',
        'Data cleaning and preprocessing',
        'Exploratory Data Analysis (EDA)'
      ],
      resources: ['Pandas Documentation', 'Real Python', 'Tableau Learning'],
      estimatedTime: '80-120 hours',
    },
    {
      phase: 'Phase 3: Domain Projects (1–2 months)',
      focus: 'End-to-end analysis projects',
      topics: [
        'Build case studies (sales analysis, customer segmentation)',
        'Data storytelling and presentation skills',
        'Create portfolio with 2–3 projects',
        'Advanced SQL (window functions, CTEs)',
        'Statistical analysis and hypothesis testing'
      ],
      resources: ['Kaggle Datasets', 'Towards Data Science', 'Storytelling with Data'],
      estimatedTime: '60-80 hours',
    },
  ],
  'MERN Stack Developer': [
    {
      phase: 'Phase 1: JavaScript & React Foundation (2–3 months)',
      focus: 'JavaScript ES6+, React basics, Node.js fundamentals',
      topics: [
        'JavaScript fundamentals (ES6+, async/await, promises)',
        'React components, hooks, and state management',
        'Node.js basics and npm package management',
        'Express.js framework and routing',
        'RESTful API concepts and HTTP methods'
      ],
      resources: ['JavaScript.info', 'React Official Docs', 'Node.js Docs', 'Express.js Guide'],
      estimatedTime: '100-150 hours',
    },
    {
      phase: 'Phase 2: MongoDB & Full Stack Integration (2–3 months)',
      focus: 'MongoDB, API development, frontend-backend connection',
      topics: [
        'MongoDB database design and CRUD operations',
        'Mongoose ODM and schema modeling',
        'Building REST APIs with Express and MongoDB',
        'Connecting React frontend to Node.js backend',
        'Authentication & Authorization (JWT)',
        'State management (Context API or Redux)'
      ],
      resources: ['MongoDB University', 'Mongoose Docs', 'JWT.io', 'React Context API'],
      estimatedTime: '120-180 hours',
    },
    {
      phase: 'Phase 3: Production MERN Apps (2–3 months)',
      focus: 'Build full-stack projects, deployment, optimization',
      topics: [
        'Build 2–3 full-stack MERN projects (E-commerce, Social Media, Blog)',
        'Deploy on platforms (Heroku, Render, Vercel + MongoDB Atlas)',
        'Error handling and validation',
        'Performance optimization and security best practices',
        'Testing (Jest, Supertest)',
        'Git workflows and collaboration'
      ],
      resources: ['MERN Stack Tutorials', 'MongoDB Atlas', 'Deployment Guides'],
      estimatedTime: '150-200 hours',
    },
  ],
  'Python Developer': [
    {
      phase: 'Phase 1: Python Fundamentals (1–2 months)',
      focus: 'Python basics, OOP, data structures, Git',
      topics: [
        'Python syntax and core concepts (variables, loops, functions)',
        'Object-Oriented Programming in Python',
        'Data structures (lists, dictionaries, sets, tuples)',
        'File handling and modules',
        'Git & GitHub basics',
        'Virtual environments and pip'
      ],
      resources: ['Python.org Tutorial', 'Real Python', 'Python Crash Course'],
      estimatedTime: '50-70 hours',
    },
    {
      phase: 'Phase 2: Web Frameworks (2–3 months)',
      focus: 'Django or Flask, databases, APIs',
      topics: [
        'Django framework (models, views, templates, admin) OR Flask (routes, blueprints)',
        'Database integration (PostgreSQL/SQLite)',
        'REST API development (Django REST Framework or Flask-RESTful)',
        'Authentication and user management',
        'Template engines and frontend integration',
        'Testing with pytest or Django TestCase'
      ],
      resources: ['Django Official Docs', 'Flask Documentation', 'Django REST Framework'],
      estimatedTime: '100-150 hours',
    },
    {
      phase: 'Phase 3: Advanced Python & Projects (2–3 months)',
      focus: 'Advanced features, deployment, production apps',
      topics: [
        'Build 2–3 portfolio projects (API, Web App, Automation tool)',
        'Deploy on platforms (Heroku, Railway, AWS, DigitalOcean)',
        'Working with external APIs and web scraping',
        'Database optimization and caching',
        'Docker basics for Python apps',
        'CI/CD pipelines'
      ],
      resources: ['Python Best Practices', 'Deployment Guides', 'Docker for Python'],
      estimatedTime: '120-160 hours',
    },
  ],
  'Node.js Developer': [
    {
      phase: 'Phase 1: JavaScript & Node.js Core (1–2 months)',
      focus: 'JavaScript ES6+, Node.js runtime, npm',
      topics: [
        'Advanced JavaScript (closures, promises, async/await)',
        'Node.js runtime and event loop',
        'npm and package management',
        'File system operations and streams',
        'HTTP module and creating servers',
        'Git & version control'
      ],
      resources: ['Node.js Official Docs', 'You Don\'t Know JS', 'Node.js Best Practices'],
      estimatedTime: '60-80 hours',
    },
    {
      phase: 'Phase 2: Express.js & Database Integration (2–3 months)',
      focus: 'Express framework, databases, APIs',
      topics: [
        'Express.js framework and middleware',
        'RESTful API design and routing',
        'Database integration (MongoDB with Mongoose or PostgreSQL with Sequelize)',
        'Authentication & Authorization (JWT, Passport.js)',
        'Error handling and validation',
        'API testing with Postman and Jest'
      ],
      resources: ['Express.js Guide', 'MongoDB Docs', 'JWT Authentication'],
      estimatedTime: '100-140 hours',
    },
    {
      phase: 'Phase 3: Production Node.js Apps (2–3 months)',
      focus: 'Advanced features, deployment, microservices',
      topics: [
        'Build 2–3 production-ready APIs (E-commerce, Real-time chat, Microservices)',
        'WebSocket integration (Socket.io)',
        'Deploy on cloud platforms (AWS, Heroku, Railway)',
        'Performance optimization and caching (Redis)',
        'Docker and containerization',
        'Monitoring and logging'
      ],
      resources: ['Node.js Production Guide', 'Docker Docs', 'AWS Node.js'],
      estimatedTime: '120-180 hours',
    },
  ],
  'Full Stack Developer': [
    {
      phase: 'Phase 1: Frontend & Backend Foundations (2–3 months)',
      focus: 'HTML/CSS/JS, React, Node.js basics',
      topics: [
        'HTML5, CSS3, and JavaScript ES6+',
        'React framework and component architecture',
        'Node.js and Express.js basics',
        'RESTful API concepts',
        'Database fundamentals (SQL and NoSQL)',
        'Git workflows'
      ],
      resources: ['MDN Web Docs', 'React Docs', 'Node.js Docs', 'SQLBolt'],
      estimatedTime: '120-160 hours',
    },
    {
      phase: 'Phase 2: Full Stack Integration (2–3 months)',
      focus: 'Connect frontend and backend, databases, authentication',
      topics: [
        'Building REST APIs with Express/Node.js',
        'Database integration (PostgreSQL or MongoDB)',
        'Connecting React frontend to backend APIs',
        'Authentication & Authorization (JWT)',
        'State management (Redux or Context API)',
        'File uploads and cloud storage'
      ],
      resources: ['Full Stack Tutorials', 'JWT Guide', 'Database Design'],
      estimatedTime: '140-180 hours',
    },
    {
      phase: 'Phase 3: Production Full Stack Apps (2–3 months)',
      focus: 'Build complete applications, deployment, DevOps basics',
      topics: [
        'Build 2–3 full-stack projects (Social Media, E-commerce, SaaS)',
        'Deploy frontend (Vercel/Netlify) and backend (Railway/Heroku)',
        'CI/CD pipelines and automated testing',
        'Performance optimization and SEO',
        'Security best practices',
        'Docker and containerization basics'
      ],
      resources: ['Full Stack Deployment', 'CI/CD Guides', 'Security Best Practices'],
      estimatedTime: '150-200 hours',
    },
  ],
  'UI/UX Developer': [
    {
      phase: 'Phase 1: Design Foundations (1–2 months)',
      focus: 'Design principles, Figma, HTML/CSS',
      topics: [
        'UI/UX design principles and color theory',
        'Figma for prototyping and design',
        'HTML5 semantic markup',
        'CSS3 (Flexbox, Grid, animations)',
        'Responsive design and mobile-first approach',
        'Accessibility (WCAG guidelines)'
      ],
      resources: ['Figma Tutorials', 'MDN Web Docs', 'A11y Project', 'Design Systems'],
      estimatedTime: '60-80 hours',
    },
    {
      phase: 'Phase 2: Interactive Development (2–3 months)',
      focus: 'JavaScript, React, design-to-code',
      topics: [
        'JavaScript for interactive UIs',
        'React for component-based development',
        'Converting Figma designs to code',
        'CSS frameworks (Tailwind CSS, Material-UI)',
        'Animation libraries (Framer Motion)',
        'User testing and feedback integration'
      ],
      resources: ['React Docs', 'Tailwind CSS', 'Framer Motion', 'Design to Code'],
      estimatedTime: '100-140 hours',
    },
    {
      phase: 'Phase 3: Advanced UI & Portfolio (2–3 months)',
      focus: 'Complex interfaces, portfolio, deployment',
      topics: [
        'Build 3–4 portfolio projects showcasing design skills',
        'Advanced CSS techniques and animations',
        'Performance optimization for UI',
        'Deploy on Vercel/Netlify',
        'Create design system and component library',
        'Portfolio website and case studies'
      ],
      resources: ['UI Design Patterns', 'Portfolio Examples', 'Deployment Guides'],
      estimatedTime: '120-160 hours',
    },
  ],
  'Data Scientist': [
    {
      phase: 'Phase 1: Python & Data Fundamentals (2–3 months)',
      focus: 'Python, statistics, data manipulation',
      topics: [
        'Python programming and data structures',
        'NumPy and Pandas for data manipulation',
        'Statistics and probability fundamentals',
        'Data cleaning and preprocessing',
        'Jupyter Notebooks for analysis',
        'Exploratory Data Analysis (EDA)'
      ],
      resources: ['Python for Data Analysis', 'Pandas Docs', 'Statistics Courses', 'Kaggle Learn'],
      estimatedTime: '100-140 hours',
    },
    {
      phase: 'Phase 2: Machine Learning & Visualization (3–4 months)',
      focus: 'ML algorithms, visualization, model building',
      topics: [
        'Machine Learning fundamentals (supervised, unsupervised)',
        'Scikit-learn for ML models',
        'Data visualization (Matplotlib, Seaborn, Plotly)',
        'Feature engineering and selection',
        'Model evaluation and validation',
        'Introduction to deep learning (TensorFlow/Keras)'
      ],
      resources: ['Scikit-learn Docs', 'Hands-On ML Book', 'TensorFlow Tutorials', 'Data Visualization'],
      estimatedTime: '150-200 hours',
    },
    {
      phase: 'Phase 3: Advanced ML & Projects (2–3 months)',
      focus: 'Advanced techniques, real-world projects',
      topics: [
        'Build 2–3 ML projects (prediction, classification, NLP)',
        'Deep learning and neural networks',
        'Model deployment (Flask/FastAPI, cloud platforms)',
        'Working with large datasets',
        'MLOps basics and model versioning',
        'Portfolio and presentation of findings'
      ],
      resources: ['ML Deployment', 'Kaggle Competitions', 'MLOps Guides', 'Project Ideas'],
      estimatedTime: '140-180 hours',
    },
  ],
  'DevOps Engineer': [
    {
      phase: 'Phase 1: Linux & Cloud Foundations (2–3 months)',
      focus: 'Linux, cloud basics, Git, scripting',
      topics: [
        'Linux command line and shell scripting (Bash)',
        'Git and version control workflows',
        'Cloud platforms basics (AWS/Azure/GCP)',
        'Networking fundamentals',
        'YAML and configuration management',
        'CI/CD concepts and tools'
      ],
      resources: ['Linux Command Line', 'AWS Free Tier', 'Git Workflows', 'CI/CD Basics'],
      estimatedTime: '80-120 hours',
    },
    {
      phase: 'Phase 2: Containerization & Orchestration (2–3 months)',
      focus: 'Docker, Kubernetes, infrastructure as code',
      topics: [
        'Docker containers and images',
        'Docker Compose for multi-container apps',
        'Kubernetes basics (pods, services, deployments)',
        'Infrastructure as Code (Terraform or CloudFormation)',
        'CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI)',
        'Monitoring and logging (Prometheus, Grafana)'
      ],
      resources: ['Docker Docs', 'Kubernetes Tutorials', 'Terraform Docs', 'CI/CD Tools'],
      estimatedTime: '120-160 hours',
    },
    {
      phase: 'Phase 3: Production DevOps (2–3 months)',
      focus: 'Advanced automation, security, scaling',
      topics: [
        'Build and maintain production infrastructure',
        'Security best practices (secrets management, IAM)',
        'Auto-scaling and load balancing',
        'Disaster recovery and backup strategies',
        'Performance optimization and cost management',
        'DevOps culture and collaboration'
      ],
      resources: ['DevOps Best Practices', 'Security Guides', 'Scaling Strategies'],
      estimatedTime: '100-140 hours',
    },
  ],
  'React Native Developer': [
    {
      phase: 'Phase 1: React & JavaScript Foundation (1–2 months)',
      focus: 'React, JavaScript ES6+, mobile concepts',
      topics: [
        'React fundamentals (components, hooks, state)',
        'JavaScript ES6+ (async/await, destructuring)',
        'Mobile app development concepts',
        'React Native basics and setup',
        'Navigation (React Navigation)',
        'Styling in React Native'
      ],
      resources: ['React Docs', 'React Native Docs', 'React Navigation', 'Expo Docs'],
      estimatedTime: '60-80 hours',
    },
    {
      phase: 'Phase 2: Native Features & APIs (2–3 months)',
      focus: 'Device APIs, state management, backend integration',
      topics: [
        'Accessing device features (camera, location, notifications)',
        'State management (Redux or Context API)',
        'REST API integration and data fetching',
        'Authentication and secure storage',
        'Push notifications',
        'Testing React Native apps'
      ],
      resources: ['React Native APIs', 'State Management', 'API Integration', 'Testing Guide'],
      estimatedTime: '100-140 hours',
    },
    {
      phase: 'Phase 3: Production Mobile Apps (2–3 months)',
      focus: 'Build apps, publish, performance',
      topics: [
        'Build 2–3 mobile apps (Todo, Social, E-commerce)',
        'App store deployment (iOS App Store, Google Play)',
        'Performance optimization',
        'Error handling and crash reporting',
        'CodePush for OTA updates',
        'Monetization strategies'
      ],
      resources: ['App Store Guidelines', 'React Native Performance', 'Deployment Guides'],
      estimatedTime: '120-160 hours',
    },
  ],
};

function toKey(role) {
  // Map role names to their keys in baseRoadmaps
  const roleMap = {
    'Frontend Developer': 'FrontendDeveloper',
    'UI/UX Developer': 'UI/UX Developer',
    'Backend Developer': 'Backend Developer',
    'Python Developer': 'Python Developer',
    'Node.js Developer': 'Node.js Developer',
    'MERN Stack Developer': 'MERN Stack Developer',
    'Full Stack Developer': 'Full Stack Developer',
    'Data Analyst': 'Data Analyst',
    'Data Scientist': 'Data Scientist',
    'DevOps Engineer': 'DevOps Engineer',
    'React Native Developer': 'React Native Developer',
  };
  return roleMap[role] || role;
}

function generateRoadmapForRole(targetRole) {
  const key = toKey(targetRole);
  const phases = baseRoadmaps[key];

  if (!phases) {
    return {
      targetRole,
      phases: [],
      note: 'Roadmap is not defined for this role yet. Please choose one of the supported roles.',
      supportedRoles: [
        'Frontend Developer', 'UI/UX Developer',
        'Backend Developer', 'Python Developer', 'Node.js Developer',
        'MERN Stack Developer', 'Full Stack Developer',
        'Data Analyst', 'Data Scientist',
        'DevOps Engineer', 'React Native Developer'
      ],
    };
  }

  // Calculate total estimated time
  const totalTime = phases.reduce((sum, phase) => {
    const timeRange = phase.estimatedTime.match(/(\d+)-(\d+)/);
    if (timeRange) {
      return sum + parseInt(timeRange[2]);
    }
    return sum;
  }, 0);

  return {
    targetRole,
    phases,
    totalEstimatedTime: `${totalTime}+ hours`,
    summary: {
      totalPhases: phases.length,
      duration: '4-7 months',
      difficulty: 'Beginner to Intermediate',
    },
  };
}

module.exports = { generateRoadmapForRole };
