const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

module.exports = generateToken;

// This function generates a JWT token for a user with a validity of 7 days.
// It uses the user's ID and a secret key stored in environment variables.