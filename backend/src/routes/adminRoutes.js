const express = require('express');
const { check, query } = require('express-validator');
const FormSubmission = require('../models/FormSubmission');
const User = require('../models/User');
const { protect, restrictTo } = require('../middleware/auth');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);
router.use(restrictTo('admin'));

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard statistics
 * @access  Private/Admin
 */
router.get('/stats', async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [
      totalSubmissions,
      newSubmissions,
      inProgressSubmissions,
      resolvedSubmissions,
      spamSubmissions,
      todaySubmissions,
      totalUsers,
      activeUsers,
    ] = await Promise.all([
      FormSubmission.countDocuments(),
      FormSubmission.countDocuments({ status: 'new' }),
      FormSubmission.countDocuments({ status: 'in_progress' }),
      FormSubmission.countDocuments({ status: 'resolved' }),
      FormSubmission.countDocuments({ status: 'spam' }),
      FormSubmission.countDocuments({ createdAt: { $gte: startOfDay } }),
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
    ]);

    // Get submissions by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const submissionsByDate = await FormSubmission.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Get submissions by status
    const submissionsByStatus = await FormSubmission.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalSubmissions,
          newSubmissions,
          inProgressSubmissions,
          resolvedSubmissions,
          spamSubmissions,
          todaySubmissions,
          totalUsers,
          activeUsers,
        },
        submissionsByDate,
        submissionsByStatus,
      },
    });
  } catch (err) {
    console.error('Error getting dashboard stats:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// @route   POST /api/admin/export
// @desc    Export form submissions
// @access  Private/Admin
router.post(
  '/export',
  protect,
  authorize('admin'),
  [
    check('startDate', 'Start date is required').not().isEmpty(),
    check('endDate', 'End date is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const { startDate, endDate, format = 'json' } = req.body;
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      const submissions = await FormSubmission.find({
        createdAt: { $gte: start, $lte: end },
      }).sort({ createdAt: -1 });
      
      if (format === 'csv') {
        // Convert to CSV
        const json2csv = require('json2csv').parse;
        const fields = ['name', 'email', 'phone', 'subject', 'message', 'status', 'createdAt'];
        const csv = json2csv(submissions, { fields });
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=submissions-${new Date().toISOString()}.csv`);
        return res.status(200).send(csv);
      }
      
      // Default to JSON
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename=submissions-${new Date().toISOString()}.json`);
      return res.status(200).send(JSON.stringify(submissions, null, 2));
      
    } catch (err) {
      console.error('Export error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }
  }
);

/**
 * @route   GET /api/admin/submissions
 * @desc    Get all form submissions with filtering, sorting, and pagination
 * @access  Private/Admin
 */
router.get(
  '/submissions',
  [
    query('status').optional().isIn(['new', 'in_progress', 'resolved', 'spam']),
    query('sort').optional(),
    query('fields').optional(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
  ],
  async (req, res, next) => {
    try {
      // EXECUTE QUERY
      const features = new APIFeatures(FormSubmission.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const submissions = await features.query;
      const total = await FormSubmission.countDocuments(features.filteredQuery);

      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: submissions.length,
        total,
        data: {
          submissions,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @route   GET /api/admin/submissions/:id
 * @desc    Get a single form submission
 * @access  Private/Admin
 */
router.get('/submissions/:id', async (req, res, next) => {
  try {
    const submission = await FormSubmission.findById(req.params.id);

    if (!submission) {
      return next(new AppError('No submission found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        submission,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   PATCH /api/admin/submissions/:id/status
 * @desc    Update submission status
 * @access  Private/Admin
 */
router.patch(
  '/submissions/:id/status',
  [
    check('status')
      .isIn(['new', 'in_progress', 'resolved', 'spam'])
      .withMessage('Invalid status value'),
    check('notes').optional().isString(),
  ],
  async (req, res, next) => {
    try {
      const submission = await FormSubmission.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
          $push: {
            statusHistory: {
              status: req.body.status,
              changedBy: req.user.id,
              notes: req.body.notes,
            },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!submission) {
        return next(new AppError('No submission found with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        data: {
          submission,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 * @access  Private/Admin
 */
router.get(
  '/users',
  [
    query('role').optional().isIn(['admin', 'editor']),
    query('active').optional().isBoolean(),
    query('sort').optional(),
    query('fields').optional(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
  ],
  async (req, res, next) => {
    try {
      // EXECUTE QUERY
      const features = new APIFeatures(User.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const users = await features.query.select('-__v');
      const total = await User.countDocuments(features.filteredQuery);

      res.status(200).json({
        status: 'success',
        results: users.length,
        total,
        data: {
          users,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @route   PATCH /api/admin/users/:id/status
 * @desc    Update user status (active/inactive)
 * @access  Private/Admin
 */
router.patch(
  '/users/:id/status',
  [
    check('isActive').isBoolean().withMessage('isActive must be a boolean'),
  ],
  async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive: req.body.isActive },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!user) {
        return next(new AppError('No user found with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete a user (soft delete)
 * @access  Private/Admin
 */
router.delete('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
