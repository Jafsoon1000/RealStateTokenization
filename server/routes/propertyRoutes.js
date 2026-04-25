import express from 'express';
import Property from '../models/Property.js';

const router = express.Router();

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
