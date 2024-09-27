// server/routes/contractRoutes.js
const express = require('express');
const Contract = require('../models/Contract');
const router = express.Router();

// Get all contracts
router.get('/', async (req, res) => {
  try {
    const contracts = await Contract.find()
      .populate('property')
      .populate('tenant');
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new contract
router.post('/', async (req, res) => {
  const { property, tenant, startDate, endDate, rentAmount } = req.body;
  const newContract = new Contract({ property, tenant, startDate, endDate, rentAmount });
  try {
    const savedContract = await newContract.save();
    res.json(savedContract);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
