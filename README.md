# 🚀 Career Guidance Platform

A full-stack career readiness assessment tool that helps users analyze skill gaps, generate personalized learning roadmaps, and stay updated with the latest tech news.

## 📋 Table of Contents

- [Live URLs](#live-urls)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Assumptions & Design Decisions](#assumptions--design-decisions)
- [Future Enhancements](#future-enhancements)

## 🔗 Live URLs

- **Frontend (Render):** https://career-guidance-1-0qbm.onrender.com
- **Backend API (Render):** https://career-guidance-apw9.onrender.com/api

## ✨ Features

### 1. **Skill Gap Analysis**
- Analyze your current skills against target role requirements
- Intelligent skill matching with fuzzy matching and synonym support
- Get personalized recommendations based on skill match percentage
- Suggested learning order for missing skills

### 2. **Career Roadmap Generator**
- 3-phase learning roadmaps for each supported role
- Detailed topics, resources, and time estimates
- Phase-by-phase breakdown with focus areas

### 3. **Tech News Integration**
- Fetches top 5 tech news stories from HackerNews API
- Displays title, author, score, time, and URL
- Auto-refreshes on each analysis

### 4. **Modern Dashboard UI**
- Clean, responsive design with dark theme
- Real-time skill match visualization
- Interactive roadmap display
- User-friendly error handling

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB (Optional)** - Database (falls back to in-memory storage)
- **Axios** - HTTP client for external APIs

### External APIs
- **HackerNews API** - Tech news feed

## 📁 Project Structure

```
career-guidance/
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── AuthForm.jsx     # Authentication form
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   ├── CareerInputForm.jsx
│   │   │   ├── SkillGapCard.jsx
│   │   │   ├── RoadmapCard.jsx
│   │   │   └── NewsCard.jsx
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useAuth.js       # Authentication hook
│   │   │   └── useCareerAnalysis.js
│   │   ├── services/            # API services
│   │   │   └── api.js           # API client & endpoints
│   │   ├── utils/               # Utility functions
│   │   │   └── formatters.js    # Date & data formatters
│   │   ├── constants/           # Constants & config
│   │   │   ├── roles.js         # Role definitions
│   │   │   └── api.js           # API configuration
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── server.js            # Express server setup
│   │   ├── routes/              # API routes
│   │   │   └── careerRoutes.js
│   │   ├── controllers/         # Request handlers
│   │   │   └── careerController.js
│   │   ├── services/            # Business logic
│   │   │   ├── skillService.js      # Skill gap analysis
│   │   │   ├── roadmapService.js    # Roadmap generation
│   │   │   └── newsService.js       # HackerNews integration
│   │   ├── models/              # Database models (MongoDB)
│   │   │   └── Analysis.js
│   │   ├── middlewares/         # Express middlewares
│   │   │   ├── errorHandler.js
│   │   │   └── logger.js
│   │   ├── validators/           # Input validation
│   │   │   └── careerValidators.js
│   │   ├── utils/                # Utility functions
│   │   │   ├── skillMatcher.js   # Skill matching logic
│   │   │   └── responseHelpers.js # Response helpers
│   │   ├── constants/            # Constants & config
│   │   │   └── roles.js          # Role & skill definitions
│   │   └── config/               # Configuration
│   │       └── database.js       # Database connection
│   ├── package.json
│   └── .gitignore
│
├── README.md
└── QUICKSTART.md
```

## 📦 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (optional - app works without it)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone [<repository-url>](https://github.com/anandbhardwaj456/Career-Guidance.git)
cd career-guidance
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Optional: MongoDB connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/career-guidance
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Health Check
```
GET /api/health
```
Returns server status and database connection info.

**Response:**
```json
{
  "status": "ok",
  "message": "Career guidance API is running",
  "database": "MongoDB" | "In-memory",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Skill Gap Analysis
```
POST /api/skill-gap
```

**Request Body:**
```json
{
  "targetRole": "Backend Developer",
  "currentSkills": "Java, SQL, Git, Spring Boot"
}
```

**Response:**
```json
{
  "targetRole": "Backend Developer",
  "currentSkills": ["Java", "SQL", "Git", "Spring Boot"],
  "matchedSkills": ["Java", "SQL", "Git", "Spring Boot"],
  "missingSkills": ["APIs"],
  "recommendations": "Focus first on: APIs and then move to the remaining skills.",
  "learningOrder": ["APIs"],
  "matchPercentage": 80,
  "totalRequired": 5
}
```

#### 3. Generate Roadmap
```
POST /api/roadmap
```

**Request Body:**
```json
{
  "targetRole": "Backend Developer"
}
```

**Response:**
```json
{
  "targetRole": "Backend Developer",
  "phases": [
    {
      "phase": "Phase 1: Foundations (1–2 months)",
      "focus": "Core Java, OOP, Git, basic SQL",
      "topics": ["Java basics", "OOP principles", ...],
      "resources": ["Oracle Java Tutorials", ...],
      "estimatedTime": "40-60 hours"
    },
    ...
  ],
  "totalEstimatedTime": "180+ hours",
  "summary": {
    "totalPhases": 3,
    "duration": "4-7 months",
    "difficulty": "Beginner to Intermediate"
  }
}
```

#### 4. Get Tech News
```
GET /api/news/top-tech?limit=5
```

#### 5. Register User
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 6. Login User
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 7. Get Current User
```
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

#### 8. Logout User
```
POST /api/auth/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

#### 9. Check Email Availability
```
GET /api/auth/check-email?email=user@example.com
```

**Query Parameters:**
- `email` (required): Email address to check

**Response:**
```json
{
  "success": true,
  "data": {
    "available": true,
    "message": "Email is available"
  }
}
```

**Response (if email exists):**
```json
{
  "success": true,
  "data": {
    "available": false,
    "message": "This email is already registered"
  }
}
```

**Query Parameters:**
- `limit` (optional): Number of stories to fetch (default: 5, max: 20)

**Response:**
```json
[
  {
    "id": 12345678,
    "title": "Article Title",
    "url": "https://example.com/article",
    "score": 150,
    "time": 1704067200,
    "type": "story",
    "by": "username"
  },
  ...
]
```

## 🔧 Environment Variables

### Backend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `5000` |
| `NODE_ENV` | Environment | No | `development` |
| `CLIENT_URL` | Frontend URL for CORS | No | `http://localhost:5173` |
| `MONGODB_URI` | MongoDB connection string | No | (uses in-memory) |
| `JWT_SECRET` | Secret key for JWT tokens | No | `your-secret-key-change-in-production` |
| `JWT_EXPIRE` | JWT token expiration | No | `7d` |

### Frontend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_BASE_URL` | Backend API URL | No | `http://localhost:5000/api` |

For the deployed backend on Render, you can set:

```env
VITE_API_BASE_URL=https://career-guidance-apw9.onrender.com/api
```

## 🌐 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to Vercel or Netlify

3. Set environment variable:
   - `VITE_API_BASE_URL`: Your backend API URL (for example: `https://career-guidance-apw9.onrender.com/api`)

### Backend (Render/Railway)

1. Connect your GitHub repository

2. Set build command:
```bash
cd backend && npm install
```

3. Set start command:
```bash
cd backend && npm start
```

4. Set environment variables:
   - `PORT`: (auto-assigned)
   - `CLIENT_URL`: Your frontend URL (for example: `https://career-guidance-1-0qbm.onrender.com`)
   - `MONGODB_URI`: (optional)

## 💡 Assumptions & Design Decisions

### 1. **Database Optional**
- MongoDB is optional to reduce setup complexity
- Falls back to in-memory storage if MongoDB is not configured
- Analysis results are still returned but not persisted without MongoDB

### 2. **Skill Matching**
- Case-insensitive matching
- Supports synonyms (e.g., "JS" matches "JavaScript")
- Partial matching (e.g., "React.js" matches "React")
- Normalizes special characters

### 3. **Supported Roles**
Currently supports **11 specialized roles**:

**Frontend:**
- Frontend Developer
- UI/UX Developer

**Backend:**
- Backend Developer (Java/Spring Boot)
- Python Developer
- Node.js Developer

**Full Stack:**
- MERN Stack Developer
- Full Stack Developer

**Data:**
- Data Analyst
- Data Scientist

**DevOps:**
- DevOps Engineer

**Mobile:**
- React Native Developer

### 4. **Roadmap Structure**
- 3 phases per role
- Each phase includes: topics, resources, time estimates
- Total duration: 4-7 months

### 5. **News Integration**
- Fetches top 5 stories by default
- Uses HackerNews public API
- Handles API failures gracefully

### 6. **Error Handling**
- Comprehensive error messages
- Validation on both frontend and backend
- Graceful degradation when services are unavailable

## 🔮 Future Enhancements

- [ ] Add more career roles (DevOps, Full Stack, etc.)
- [ ] User authentication and profile persistence
- [ ] Progress tracking for learning roadmaps
- [ ] Integration with learning platforms (Coursera, Udemy)
- [ ] Skill assessment quizzes
- [ ] Job market insights integration
- [ ] Export roadmap as PDF
- [ ] Dark/light theme toggle
- [ ] Multi-language support



## 👤 Author

Anand Bhardwaj

---


