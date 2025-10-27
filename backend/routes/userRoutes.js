const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyOTP,
  resendOTP,
  getMe,
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  changePassword
} = require('../controllers/userController');
const { authorize } = require('../middleware/authMiddleware');
const authenticate = require('../middleware/authenticate');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/change-password', authenticate, changePassword);

// Other routes
router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(authorize('admin'), deleteUser);

module.exports = router;

