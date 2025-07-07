const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  searchUsers
} = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/logout', auth, logoutUser);
router.get('/me', auth, getUserProfile);
router.get('/search', auth, searchUsers);

module.exports = router;
// This code defines the user routes for the application.
// It uses Express to create a router and sets up routes for user registration, login, logout, fetching user profile, and searching users. The `auth` middleware is applied to protected routes to ensure that only authenticated users can access them. The router is then exported for use in the main application file.