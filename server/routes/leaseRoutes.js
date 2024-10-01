// routes/leaseRoutes.js
const express = require('express');
const router = express.Router();
const leaseController = require('../controllers/leaseController');
const { protect } = require('../middleware/authMiddleware');


// routes/leaseRoutes.js
const { upload } = require('../middleware/uploadMiddleware');

router.post('/', upload.single('leaseDocument'), leaseController.createLease);

// Protected Routes
router.use(protect);

// Create Lease
router.post('/', leaseController.createLease);

// Get All Leases (e.g., for admin or landlord)
router.get('/', leaseController.getAllLeases);

// Get Lease by ID
router.get('/:id', leaseController.getLeaseById);

// Update Lease
router.put('/:id', leaseController.updateLease);

// Delete Lease
router.delete('/:id', leaseController.deleteLease);

module.exports = router;
