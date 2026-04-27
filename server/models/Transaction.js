const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
    },
    tokensBought: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    txHash: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'failed'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
