const express = require('express');
const {
  initializeRoom,
  getUserRooms
} = require('../controllers/roomController');
const auth = require('../middleware/auth');

const router = express.Router();

// All room routes are protected
router.post('/init', auth, initializeRoom);
router.get('/userrooms', auth, getUserRooms);

module.exports = router;
// This code defines the room routes for the application.
// It uses Express to create a router and sets up routes for initializing a chat room and fetching a user's chat rooms. The `auth` middleware is applied to ensure that only authenticated users can access these routes. The router is then exported for use in the main application file.