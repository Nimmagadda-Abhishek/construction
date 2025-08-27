import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.status(201).json({
      message: 'Thank you for your inquiry. We will contact you soon!',
      contact: savedContact
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all contact submissions (protected route for admin)
router.get('/', async (req, res) => {
  try {
    const { status, sortBy = 'createdAt' } = req.query;
    const filter = status ? { status } : {};
    
    const contacts = await Contact.find(filter)
      .sort({ [sortBy]: -1 })
      .select('-__v');
      
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single contact submission (protected route for admin)
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update contact status (protected route for admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete contact submission (protected route for admin)
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get contact statistics (protected route for admin)
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalCount = await Contact.countDocuments();
    const todayCount = await Contact.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    });

    res.json({
      total: totalCount,
      today: todayCount,
      byStatus: stats.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {})
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;