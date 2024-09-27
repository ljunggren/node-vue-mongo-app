// server/routes/tenantRoutes.js
const express = require('express');
const Tenant = require('../models/Tenant');
const router = express.Router();

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
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
