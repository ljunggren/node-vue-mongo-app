// models/Lease.js
const mongoose = require('mongoose');

const leaseSchema = new mongoose.Schema({
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: true,
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: Date,
  rent: {
    type: Number,
    required: true,
  },
  leaseDocument: String, // URL or path to the lease document
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Lease', leaseSchema);
