const express = require('express');
const Quote = require('../models/Quote');
const router = express.Router();

// Get random quote
router.get('/random', async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

// Get quotes by category
router.get('/category/:category', async (req, res) => {
  try {
    const quotes = await Quote.find({ category: req.params.category })
      .sort({ likes: -1 })
      .limit(10);
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

// Like a quote
router.post('/:id/like', async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to like quote' });
  }
});

module.exports = router; 