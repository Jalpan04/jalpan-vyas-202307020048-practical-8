const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name')
      .trim()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  register
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

// GET /api/auth/profile (protected)
router.get('/profile', protect, getProfile);

module.exports = router;
