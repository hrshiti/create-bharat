const User = require('../models/User');

// Check if user has required role(s)
// NOTE: This middleware must be used AFTER authenticate middleware
// authenticate sets req.user, then authorize checks if the role matches
const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      // Check if user is attached to request (from authenticate middleware)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Not authorized to access this route. Please authenticate first.'
        });
      }

      // Check if user is active
      if (!req.user.isActive) {
        return res.status(403).json({
          success: false,
          error: 'Account is inactive'
        });
      }

      // Check if user role is authorized
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          error: `User role '${req.user.role}' is not authorized to access this route. Required roles: ${roles.join(', ')}`
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
};

// Check if user is admin
const isAdmin = authorize('admin');

// Check if user is company
const isCompany = authorize('company');

// Check if user is mentor
const isMentor = authorize('mentor');

// Check if user is company or mentor
const isCompanyOrMentor = authorize('company', 'mentor');

module.exports = {
  authorize,
  isAdmin,
  isCompany,
  isMentor,
  isCompanyOrMentor
};

