# 🚀 Quick Start Guide

Get the Career Guidance Platform up and running in 5 minutes!

## Prerequisites Check

Make sure you have:
- ✅ Node.js (v18+) installed: `node --version`
- ✅ npm installed: `npm --version`

## Step-by-Step Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 3. Configure Environment (Optional)

**Backend** - Create `backend/.env`:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> **Note:** The app works without these files using default values!

### 4. Start the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server listening on port 5000
📡 Health check: http://localhost:5000/api/health
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 5. Open the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## Test the Application

1. **Login/Register** - Use any email and password (frontend-only auth)
2. **Enter Career Goal:**
   - Select a role: "Backend Developer"
   - Enter skills: "Java, SQL, Git"
3. **Click "Analyze My Career Path"**
4. **View Results:**
   - Skill gap analysis on the left
   - Career roadmap on the right
   - Tech news at the bottom

## Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Verify Node.js version: `node --version` (should be v18+)
- Check for errors in the terminal

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check `VITE_API_BASE_URL` in `frontend/.env`
- Open browser console for error messages

### MongoDB Connection (Optional)
- If you see MongoDB warnings, that's OK! The app uses in-memory storage
- To use MongoDB, add `MONGODB_URI` to `backend/.env`

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check API endpoints in the README
- Explore the code structure

Happy coding! 🎉

