import express from 'express';
import { z } from 'zod';
import Property from '../models/Property.js';

const router = express.Router();

// Buy Token Schema for Validation
const buyTokenSchema = z.object({
  propertyId: z.string().min(1, 'Property ID is required'),
  tokensToBuy: z.number().int().positive('Must buy at least 1 token'),
  walletAddress: z.string().startsWith('0x', 'Invalid Ethereum address'),
});

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find({});
    
    if (properties.length === 0) {
      return res.status(404).json({ message: 'No properties found in institutional inventory' });
    }
    
    res.json(properties);
  } catch (error) {
    console.error(`[GET PROPERTIES ERROR]: ${error.message}`);
    res.status(500).json({ 
      message: 'Failed to fetch properties',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});

// @desc    Simulate buying tokens with validation
// @route   POST /api/properties/buy
// @access  Public (Wallet connected)
router.post('/buy', async (req, res) => {
  try {
    // Validate request body using Zod
    const validatedData = buyTokenSchema.parse(req.body);
    
    const { propertyId, tokensToBuy, walletAddress } = validatedData;
    
    const property = await Property.findById(propertyId);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    if (property.available_tokens < tokensToBuy) {
      return res.status(400).json({ message: 'Insufficient tokens available' });
    }
    
    // In a real app, you would verify on-chain payment here
    // For now, we simulate the update
    property.available_tokens -= tokensToBuy;
    await property.save();
    
    res.json({
      message: 'Purchase successful',
      tx_hash: `0x${Math.random().toString(16).slice(2)}...${Math.random().toString(16).slice(2)}`,
      property_title: property.title,
      tokens_bought: tokensToBuy,
      buyer: walletAddress
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: error.errors 
      });
    }
    
    console.error(`[BUY TOKENS ERROR]: ${error.message}`);
    res.status(500).json({ message: 'Server error during purchase' });
  }
});

export default router;
