// server/routes/contractRoutes.js
const express = require('express');
const mongoose = require('mongoose');

const Contract = require('../models/Contract');
const router = express.Router();

// Get all contracts
router.get('/', async (req, res) => {
  console.log('Getting contracts...');

  try {
    const contracts = await Contract.find()
      .populate('propertyId')
      .populate('tenantId');
    res.json(contracts);
  } catch (err) {
    console.error("Err: ", err),
    res.status(500).json({ message: err.message });
  }
});

// Create a new contract
router.post('/', async (req, res) => {
  console.log('Adding contract...');

  const { propertyId, tenantId, startDate, endDate, rentAmount } = req.body;
  console.log('Adding contract for property:', propertyId);

  const newContract = new Contract({ propertyId, tenantId, startDate, endDate, rentAmount });
  try {
    const savedContract = await newContract.save();
    console.log('Saved contract', savedContract);

    res.json(savedContract);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Contract DELETE endpoint
router.delete('/:id', async (req, res) => {
  const contractId = req.params.id;

  // Validate the contract ID
  if (!mongoose.Types.ObjectId.isValid(contractId)) {
    return res.status(400).json({ message: 'Invalid Contract ID' });
  }

  try {
    // Attempt to delete the contract
    const contract = await Contract.findByIdAndDelete(contractId);

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.status(200).json({ message: 'Contract deleted successfully' });
  } catch (error) {
    console.error('Error deleting contract:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
