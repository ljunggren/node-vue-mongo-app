// server/models/Tenant.js
const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
});

const Tenant = mongoose.model('Tenant', tenantSchema);
module.exports = Tenant;
