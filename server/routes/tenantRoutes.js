// server/routes/tenantRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const Tenant = require('../models/Tenant');
const router = express.Router();
const Contract = require('../models/Contract'); // If applicable


// Get all tenants
router.get('/', async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new tenant
router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  const newTenant = new Tenant({ name, email, phone });
  try {
    const savedTenant = await newTenant.save();
    res.json(savedTenant);
  } catch (err) {
    console.err(err);
    res.status(400).json({ message: err.message });
  }
});

// Tenant DELETE endpoint
router.delete('/:id', async (req, res) => {
  const tenantId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(tenantId)) {
    return res.status(400).json({ message: 'Invalid Tenant ID' });
  }

  try {
    // Check for associated contracts if needed
    const contracts = await Contract.find({ tenantId });

    if (contracts.length > 0) {
      return res.status(400).json({
        message:
          'Cannot delete tenant: There are contracts associated with this tenant.',
      });
    }

    const tenant = await Tenant.findByIdAndDelete(tenantId);

    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    res.status(200).json({ message: 'Tenant deleted successfully' });
  } catch (error) {
    console.error('Error deleting tenant:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
