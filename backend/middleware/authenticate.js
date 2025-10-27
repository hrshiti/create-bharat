const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Authenticate user and attach to request
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route. Please provide a valid token.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token and attach to request
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      if (!req.user.isActive) {
        return res.status(403).json({
          success: false,
          error: 'Account is inactive. Please contact support.'
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route. Invalid token.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = authenticate;

