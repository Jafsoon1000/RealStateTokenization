const express = require('express');
const { z } = require('zod');
const Property = require('../models/Property.js');
const Transaction = require('../models/Transaction.js');

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
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Fetch single property by ID
// @route   GET /api/properties/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error(`[GET PROPERTY ERROR]: ${error.message}`);
    res.status(500).json({
      message: 'Failed to fetch property',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Simulate buying tokens with validation
// @route   POST /api/properties/buy
// @access  Public (Wallet connected)
router.post('/buy', async (req, res) => {
  try {
    const validatedData = buyTokenSchema.parse(req.body);
    const { propertyId, tokensToBuy, walletAddress } = validatedData;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.available_tokens < tokensToBuy) {
      return res.status(400).json({ message: 'Insufficient tokens available' });
    }

    property.available_tokens -= tokensToBuy;
    await property.save();

    const txHash = `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`;

    // Record the transaction
    await Transaction.create({
      property: property._id,
      walletAddress,
      tokensBought: tokensToBuy,
      totalCost: tokensToBuy * property.token_price,
      txHash,
      status: 'confirmed',
    });

    res.json({
      message: 'Purchase successful',
      tx_hash: txHash,
      property_title: property.title,
      tokens_bought: tokensToBuy,
      total_cost: tokensToBuy * property.token_price,
      buyer: walletAddress,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors,
      });
    }

    console.error(`[BUY TOKENS ERROR]: ${error.message}`);
    res.status(500).json({ message: 'Server error during purchase' });
  }
});

// Property Input Schema for Admin validation
const propertyInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image_url: z.string().min(1, 'Image URL is required'),
  location: z.string().min(1, 'Location is required'),
  total_value: z.number().positive('Total value must be positive'),
  token_price: z.number().positive('Token price must be positive'),
  available_tokens: z.number().int().nonnegative('Available tokens must be non-negative'),
  yield_percentage: z.number().nonnegative('Yield percentage must be non-negative'),
  property_type: z.enum(['commercial', 'residential', 'industrial', 'retail', 'mixed-use']),
  description: z.string().optional().default(''),
});

// @desc    Create a new property
// @route   POST /api/properties
// @access  Admin
router.post('/', async (req, res) => {
  try {
    const validatedData = propertyInputSchema.parse(req.body);
    const newProperty = await Property.create(validatedData);
    res.status(201).json(newProperty);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors,
      });
    }
    console.error(`[CREATE PROPERTY ERROR]: ${error.message}`);
    res.status(500).json({ message: 'Failed to create property asset' });
  }
});

// @desc    Update an existing property
// @route   PUT /api/properties/:id
// @access  Admin
router.put('/:id', async (req, res) => {
  try {
    const validatedData = propertyInputSchema.parse(req.body);
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Update fields
    Object.assign(property, validatedData);
    await property.save();

    res.json(property);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors,
      });
    }
    console.error(`[UPDATE PROPERTY ERROR]: ${error.message}`);
    res.status(500).json({ message: 'Failed to update property asset' });
  }
});

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Admin
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await Property.deleteOne({ _id: req.params.id });
    res.json({ message: 'Property successfully removed from inventory' });
  } catch (error) {
    console.error(`[DELETE PROPERTY ERROR]: ${error.message}`);
    res.status(500).json({ message: 'Failed to delete property asset' });
  }
});

module.exports = router;

