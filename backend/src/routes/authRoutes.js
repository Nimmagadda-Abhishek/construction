const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

router.post(
  '/forgot-password',
  [check('email', 'Please include a valid email').isEmail()],
  authController.forgotPassword
);

router.patch(
  '/reset-password/:token',
  [
    check('password', 'Please provide a password with at least 8 characters')
      .notEmpty()
      .isLength({ min: 8 }),
    check('passwordConfirm', 'Please confirm your password').notEmpty(),
  ],
  authController.resetPassword
);

// Protected routes (require authentication)
router.use(protect);

// Get current user
router.get('/me', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});

// Update password for logged-in user
router.patch(
  '/update-password',
  [
    check('passwordCurrent', 'Current password is required').notEmpty(),
    check('password', 'Please provide a new password')
      .notEmpty()
      .isLength({ min: 8 }),
    check('passwordConfirm', 'Please confirm your new password').notEmpty(),
  ],
  authController.updatePassword
);

// Admin-only routes
router.use(restrictTo('admin'));

// Register new admin/editor
router.post(
  '/register',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 8+ characters, at least one uppercase, one lowercase, one number and one special character'
    ).matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
    check('role', 'Role must be either admin or editor').isIn(['admin', 'editor']),
  ],
  authController.register
);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Check if password matches
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Create token
      const token = user.getSignedJwtToken();

      res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error('Get current user error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

module.exports = router;
