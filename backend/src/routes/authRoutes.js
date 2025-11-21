const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
  checkEmailAvailability,
} = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);
router.get('/check-email', checkEmailAvailability);

module.exports = router;
