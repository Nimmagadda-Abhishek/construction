const express = require('express');
const { check, validationResult } = require('express-validator');
const FormSubmission = require('../models/FormSubmission');
const { protect, authorize } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Rate limiting configuration
const formSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 form submissions per windowMs
  message: 'Too many form submissions from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// @route   POST /api/forms
// @desc    Submit a new form
// @access  Public
router.post(
  '/',
  formSubmitLimiter, // Apply rate limiting
  [
    check('name', 'Name is required').trim().notEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('phone', 'Please enter a valid phone number').optional({ checkFalsy: true }).isMobilePhone(),
    check('subject', 'Subject is required').trim().notEmpty(),
    check('message', 'Message must be at least 10 characters long').isLength({ min: 10 }),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    try {
      const { name, email, phone, subject, message } = req.body;
      
      // Check for potential spam (same IP and similar content in the last hour)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentSubmissions = await FormSubmission.countDocuments({
        $or: [
          { 'metadata.ipAddress': req.ip, createdAt: { $gte: oneHourAgo } },
          { email, createdAt: { $gte: oneHourAgo } }
        ]
      });

      const formSubmission = new FormSubmission({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone ? phone.trim() : '',
        subject: subject.trim(),
        message: message.trim(),
        status: recentSubmissions > 3 ? 'spam' : 'new',
        metadata: {
          ipAddress: req.ip,
          userAgent: req.get('user-agent'),
          referrer: req.get('referer') || '',
          isPotentialSpam: recentSubmissions > 3,
        },
      });

      await formSubmission.save();
      
      // TODO: Trigger email notification for new submission
      
      res.status(201).json({ 
        success: true, 
        data: formSubmission,
        message: 'Thank you for your submission. We will get back to you soon!'
      });
    } catch (err) {
      console.error('Form submission error:', err);
      res.status(500).json({
        success: false,
        message: 'Failed to process your submission. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }
  }
);

// @route   GET /api/forms
// @desc    Get all form submissions (protected)
// @access  Private/Admin
router.get('/', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const startIndex = (page - 1) * limit;
    const total = await FormSubmission.countDocuments(query);
    
    const submissions = await FormSubmission.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(startIndex)
      .exec();
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: submissions,
    });
  } catch (err) {
    console.error('Error fetching form submissions:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// @route   GET /api/forms/:id
// @desc    Get single form submission (protected)
// @access  Private/Admin
router.get('/:id', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const submission = await FormSubmission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Form submission not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (err) {
    console.error('Error fetching form submission:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// @route   PUT /api/forms/:id/status
// @desc    Update form submission status (protected)
// @access  Private/Admin
router.put(
  '/:id/status',
  protect,
  authorize('admin', 'editor'),
  [check('status', 'Status is required').not().isEmpty()],
  async (req, res) => {
    try {
      const submission = await FormSubmission.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true, runValidators: true }
      );
      
      if (!submission) {
        return res.status(404).json({
          success: false,
          message: 'Form submission not found',
        });
      }
      
      res.status(200).json({
        success: true,
        data: submission,
      });
    } catch (err) {
      console.error('Error updating form submission status:', err);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }
  }
);

// @route   DELETE /api/forms/:id
// @desc    Delete form submission (protected)
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const submission = await FormSubmission.findByIdAndDelete(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Form submission not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error('Error deleting form submission:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

module.exports = router;
