// models/Landlord.js
const mongoose = require('mongoose');

const landlordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bankInfo: {
    bankName: String,
    accountNumber: String,
    routingNumber: String,
  },
  units: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Landlord', landlordSchema);
