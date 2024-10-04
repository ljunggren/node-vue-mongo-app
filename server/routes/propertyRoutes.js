// server/routes/propertyRoutes.js
const express = require('express');
const Property = require('../models/Property');
const Contract = require('../models/Contract'); // Import the Contract model
const router = express.Router();
const mongoose = require('mongoose');


// Get all properties
router.get('/', async (req, res) => {
  console.log('Retrieving properties...');

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


router.delete('/:id', async (req, res) => {
  const propertyId = req.params.id;
  console.log('Delete request for property ID:', propertyId);

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    console.error('Invalid Property ID');
    return res.status(400).json({ message: 'Invalid Property ID' });
  }

  try {
    // Check for existing contracts
    const contracts = await Contract.find({ propertyId });
    console.log(`Contracts found for property ID ${propertyId}:`, contracts);

    if (contracts.length > 0) {
      console.warn(
        `Cannot delete property ID ${propertyId}: Associated contracts exist.`
      );
      return res.status(400).json({
        message:
          'Cannot delete property: There are contracts associated with this property.',
      });
    }

    // Proceed to delete the property
    const property = await Property.findByIdAndDelete(propertyId);

    if (!property) {
      console.warn('Property not found:', propertyId);
      return res.status(404).json({ message: 'Property not found' });
    }

    console.log('Property deleted successfully:', propertyId);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
