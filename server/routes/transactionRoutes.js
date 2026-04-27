const express = require('express');
const Transaction = require('../models/Transaction.js');

const router = express.Router();

// @desc    Fetch all transactions (optionally filter by wallet)
// @route   GET /api/transactions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.wallet) {
      filter.walletAddress = req.query.wallet;
    }

    const transactions = await Transaction.find(filter)
      .populate('property', 'title location token_price image_url')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(transactions);
  } catch (error) {
    console.error(`[GET TRANSACTIONS ERROR]: ${error.message}`);
    res.status(500).json({
      message: 'Failed to fetch transactions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Get platform-wide statistics
// @route   GET /api/transactions/stats
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalTransactions = await Transaction.countDocuments();
    const volumeResult = await Transaction.aggregate([
      { $group: { _id: null, totalVolume: { $sum: '$totalCost' }, totalTokens: { $sum: '$tokensBought' } } },
    ]);

    const uniqueInvestors = await Transaction.distinct('walletAddress');

    res.json({
      totalTransactions,
      totalVolume: volumeResult[0]?.totalVolume || 0,
      totalTokensBought: volumeResult[0]?.totalTokens || 0,
      uniqueInvestors: uniqueInvestors.length,
    });
  } catch (error) {
    console.error(`[GET STATS ERROR]: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

module.exports = router;
