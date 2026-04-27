const mongoose = require('mongoose');

const propertySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    total_value: {
      type: Number,
      required: true,
    },
    token_price: {
      type: Number,
      required: true,
    },
    available_tokens: {
      type: Number,
      required: true,
    },
    yield_percentage: {
      type: Number,
      default: 0,
    },
    property_type: {
      type: String,
      enum: ['commercial', 'residential', 'industrial', 'retail', 'mixed-use'],
      default: 'commercial',
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
