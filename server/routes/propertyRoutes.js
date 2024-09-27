// server/routes/propertyRoutes.js
const express = require('express');
const Property = require('../models/Property');
const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new property
router.post('/', async (req, res) => {
  const { address, ownerName, numberOfUnits, description } = req.body;
  const newProperty = new Property({ address, ownerName, numberOfUnits, description });
  try {
    const savedProperty = await newProperty.save();
    res.json(savedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
