const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Otp = require('../models/Otp');
const generateToken = require('../utils/generateToken');
const { generateOTP, isOTPExpired } = require('../utils/otpGenerator');
const smsService = require('../services/smsService');
const consoleSmsService = require('../services/consoleSmsService');

// @desc    Register user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;

    // For user role, no password is required
    if (role && role !== 'user' && role !== 'admin' && role !== 'company' && role !== 'mentor') {
      return res.status(400).json({
        success: false,
        error: 'Invalid role'
      });
    }

    const userRole = role || 'user';

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: existingUser.email === email
          ? 'User already exists with this email'
          : 'User already exists with this phone number'
      });
    }

    // For user role - OTP based registration (no password)
    if (userRole === 'user') {
      // Validate required fields
      if (!name || !email || !phone) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and phone are required for user registration'
        });
      }

      // Create user without password
      const user = await User.create({
        name,
        email,
        phone,
        role: 'user',
        ...req.body
      });

      // Generate OTP
      const otp = generateOTP();

      // Format phone number for SMS (should be with country code)
      const cleanPhone = phone.replace(/\D/g, '');
      const formattedPhone = '91' + cleanPhone;

      // Save OTP
      await Otp.create({
        phone: formattedPhone,
        otp,
        purpose: 'register',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      });

      // Send OTP via SMS with fallback mechanism
      console.log(`[REGISTER] Sending OTP to ${formattedPhone}`);
      let smsResult;

      try {
        smsResult = await smsService.sendOTP(formattedPhone, otp);
        console.log('SMS sending result:', smsResult);

        if (!smsResult.success) {
          console.error('SMS sending failed:', smsResult.error);
          throw new Error('SMS service failed');
        }
      } catch (smsError) {
        console.error('SMS service error:', smsError.message);
        console.log('🔄 Falling back to Console SMS Service...');

        // Use console SMS service as fallback
        try {
          smsResult = await consoleSmsService.sendOTP(formattedPhone, otp);
          console.log('Console SMS result:', smsResult);
        } catch (consoleError) {
          console.error('Console SMS error:', consoleError.message);
          smsResult = {
            success: true,
            messageId: 'fallback-' + Date.now(),
            message: 'SMS service unavailable. Check console for OTP.',
            provider: 'Fallback'
          };
        }
      }

      return res.json({
        success: true,
        message: 'OTP sent to your phone. Please verify to complete registration.',
        data: {
          phone: phone,
          purpose: 'register'
        }
      });
    }

    // For admin, company, mentor - password required
    if (!req.body.password) {
      return res.status(400).json({
        success: false,
        error: 'Password is required for admin, company, and mentor roles'
      });
    }

    // Hash password for non-user roles
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: userRole,
      ...req.body
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { phone, password, role } = req.body;

    // For user role - OTP based login
    if (role === 'user' || (!password && phone)) {
      if (!phone) {
        return res.status(400).json({
          success: false,
          error: 'Phone number is required for user login'
        });
      }

      // Check if user exists
      const user = await User.findOne({ phone, role: 'user' });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found with this phone number'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          error: 'Account is inactive. Please contact support.'
        });
      }

      // Generate OTP
      const otp = generateOTP();

      // Format phone number for SMS (should be with country code)
      const cleanPhone = phone.replace(/\D/g, '');
      const formattedPhone = '91' + cleanPhone;

      // Save OTP with formatted phone
      await Otp.create({
        phone: formattedPhone,
        otp,
        purpose: 'login',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      });

      // Send OTP via SMS with fallback mechanism
      console.log(`[LOGIN] Sending OTP to ${formattedPhone}`);
      let smsResult;

      try {
        smsResult = await smsService.sendOTP(formattedPhone, otp);
        console.log('SMS sending result:', smsResult);

        if (!smsResult.success) {
          console.error('SMS sending failed:', smsResult.error);
          throw new Error('SMS service failed');
        }
      } catch (smsError) {
        console.error('SMS service error:', smsError.message);
        console.log('🔄 Falling back to Console SMS Service...');

        // Use console SMS service as fallback
        try {
          smsResult = await consoleSmsService.sendOTP(formattedPhone, otp);
          console.log('Console SMS result:', smsResult);
        } catch (consoleError) {
          console.error('Console SMS error:', consoleError.message);
          smsResult = {
            success: true,
            messageId: 'fallback-' + Date.now(),
            message: 'SMS service unavailable. Check console for OTP.',
            provider: 'Fallback'
          };
        }
      }

      return res.json({
        success: true,
        message: 'OTP sent to your phone. Please verify to complete login.',
        data: {
          phone: phone,
          purpose: 'login'
        }
      });
    }

    // For admin, company, mentor - password based login
    if (!req.body.email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required for admin, company, and mentor login'
      });
    }

    const { email } = req.body;

    // Find user by email (including password field)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Account is inactive. Please contact support.'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/users/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create user
// @route   POST /api/users
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Verify OTP
// @route   POST /api/users/verify-otp
const verifyOTP = async (req, res) => {
  try {
    const { phone, otp, purpose } = req.body;

    if (!phone || !otp || !purpose) {
      return res.status(400).json({
        success: false,
        error: 'Phone, OTP, and purpose are required'
      });
    }

    // Format phone number for lookup
    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = '91' + cleanPhone;

    // Find OTP in database
    const otpRecord = await Otp.findOne({
      phone: formattedPhone,
      otp,
      purpose,
      verified: false
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired OTP'
      });
    }

    // Check if OTP is expired
    if (isOTPExpired(otpRecord.createdAt, 10)) {
      return res.status(400).json({
        success: false,
        error: 'OTP has expired. Please request a new one.'
      });
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    if (purpose === 'register') {
      // For registration - user should already exist (check original phone format)
      const user = await User.findOne({ phone, role: 'user' });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Return user with token
      return res.json({
        success: true,
        message: 'Registration completed successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          token: generateToken(user._id)
        }
      });
    }

    if (purpose === 'login') {
      // For login - find user and return token (check original phone format)
      const user = await User.findOne({ phone, role: 'user' });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          error: 'Account is inactive. Please contact support.'
        });
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Get user details without password
      const userData = await User.findById(user._id);

      return res.json({
        success: true,
        message: 'Login successful',
        data: {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: userData.role,
          token: generateToken(userData._id)
        }
      });
    }

    return res.json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Resend OTP
// @route   POST /api/users/resend-otp
const resendOTP = async (req, res) => {
  try {
    const { phone, purpose } = req.body;

    if (!phone || !purpose) {
      return res.status(400).json({
        success: false,
        error: 'Phone and purpose are required'
      });
    }

    // Check if user exists (for login)
    if (purpose === 'login') {
      const user = await User.findOne({ phone, role: 'user' });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found with this phone number'
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          error: 'Account is inactive. Please contact support.'
        });
      }
    }

    // Generate new OTP
    const otp = generateOTP();

    // Format phone number for SMS (should be with country code)
    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = '91' + cleanPhone;

    // Delete old OTPs for this phone and purpose
    await Otp.deleteMany({ phone: formattedPhone, purpose });

    // Save new OTP with formatted phone
    await Otp.create({
      phone: formattedPhone,
      otp,
      purpose,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    });

    // Send OTP via SMS with fallback mechanism
    console.log(`[RESEND] Sending OTP to ${formattedPhone}`);
    let smsResult;

    try {
      smsResult = await smsService.sendOTP(formattedPhone, otp);
      console.log('SMS sending result:', smsResult);

      if (!smsResult.success) {
        console.error('SMS sending failed:', smsResult.error);
        throw new Error('SMS service failed');
      }
    } catch (smsError) {
      console.error('SMS service error:', smsError.message);
      console.log('🔄 Falling back to Console SMS Service...');

      // Use console SMS service as fallback
      try {
        smsResult = await consoleSmsService.sendOTP(formattedPhone, otp);
        console.log('Console SMS result:', smsResult);
      } catch (consoleError) {
        console.error('Console SMS error:', consoleError.message);
        smsResult = {
          success: true,
          messageId: 'fallback-' + Date.now(),
          message: 'SMS service unavailable. Check console for OTP.',
          provider: 'Fallback'
        };
      }
    }

    return res.json({
      success: true,
      message: 'OTP resent successfully',
      data: {
        phone,
        purpose
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyOTP,
  resendOTP,
  getMe,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changePassword
};

