import mongoose from 'mongoose';

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
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model('Property', propertySchema);

export default Property;
