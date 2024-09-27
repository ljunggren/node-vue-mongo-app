// server/models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  numberOfUnits: {
    type: Number,
    default: 1,
  },
  description: String,
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
