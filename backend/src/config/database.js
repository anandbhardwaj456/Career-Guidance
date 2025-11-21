const mongoose = require('mongoose');

/**
 * Connects to MongoDB if URI is provided
 * @param {string} mongoUri - MongoDB connection string
 * @returns {Promise<void>}
 */
async function connectDatabase(mongoUri) {
  if (!mongoUri) {
    console.log('ℹ️  No MONGODB_URI provided, using in-memory storage');
    return null;
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
    return mongoose.connection;
  } catch (err) {
    console.warn('⚠️  MongoDB connection failed, using in-memory storage:', err.message);
    return null;
  }
}

/**
 * Checks if database is connected
 * @returns {boolean}
 */
function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = {
  connectDatabase,
  isDatabaseConnected,
};

