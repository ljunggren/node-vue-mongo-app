// server/models/Contract.js
const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  rentAmount: {
    type: Number,
    required: true,
  },
});

const Contract = mongoose.model('Contract', contractSchema);
module.exports = Contract;
