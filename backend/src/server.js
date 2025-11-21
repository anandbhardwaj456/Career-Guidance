const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const careerRoutes = require('./routes/careerRoutes');
const authRoutes = require('./routes/authRoutes');
const requestLogger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const { connectDatabase } = require('./config/database');

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use(requestLogger);

// Auth routes
app.use('/api/auth', authRoutes);

// Career routes
app.use('/api', careerRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Career guidance API is running',
    database: process.env.MONGODB_URI ? 'MongoDB' : 'In-memory',
    timestamp: new Date().toISOString()
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server with optional database connection
const startServer = async () => {
  // Connect to database if URI is provided
  await connectDatabase(process.env.MONGODB_URI);

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

