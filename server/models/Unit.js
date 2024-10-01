// models/Unit.js
const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  unitNumber: String,
  description: String,
  numberOfBedrooms: Number,
  numberOfBathrooms: Number,
  squareFootage: Number,
  rentAmount: Number,
  availabilityStatus: {
    type: String,
    enum: ['available', 'occupied', 'maintenance'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Unit', unitSchema);
