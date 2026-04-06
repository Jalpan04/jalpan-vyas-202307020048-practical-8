const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Helper: generate signed JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// POST /api/auth/register
const register = async (req, res) => {
  // Check for express-validator errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: 'Email is already registered' });
    }

    // Create user - password is hashed by the model pre-save hook
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Fetch user with password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    // Compare using model method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/auth/profile (protected)
const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

module.exports = { register, login, getProfile };
