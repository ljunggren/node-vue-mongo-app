// controllers/leaseController.js

const Lease = require('../models/Lease');
const Unit = require('../models/Unit');
const Tenant = require('../models/Tenant');

// Create a new lease
exports.createLease = async (req, res) => {
  try {
    const { unitId, tenantId, dateStart, dateEnd, rent } = req.body;
    let leaseDocument = null;

    // Handle file upload if leaseDocument is uploaded
    if (req.file) {
      leaseDocument = req.file.path; // Assuming multer stores file path in req.file.path
    }

    // Validate required fields
    if (!unitId || !tenantId || !dateStart || !rent) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if unit exists and is available
    const unit = await Unit.findById(unitId);
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    if (unit.availabilityStatus !== 'available') {
      return res.status(400).json({ message: 'Unit is not available' });
    }

    // Check if tenant exists
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    // Create new lease
    const lease = new Lease({
      unitId,
      tenantId,
      dateStart,
      dateEnd,
      rent,
      leaseDocument,
    });

    const savedLease = await lease.save();

    // Update unit availability status
    unit.availabilityStatus = 'occupied';
    await unit.save();

    res.status(201).json(savedLease);
  } catch (error) {
    console.error('Error creating lease:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all leases
exports.getAllLeases = async (req, res) => {
  try {
    const leases = await Lease.find()
      .populate({
        path: 'unitId',
        populate: {
          path: 'propertyId',
          model: 'Property',
        },
      })
      .populate({
        path: 'tenantId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'firstName lastName email',
        },
      });

    res.json(leases);
  } catch (error) {
    console.error('Error fetching leases:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a lease by ID
exports.getLeaseById = async (req, res) => {
  try {
    const leaseId = req.params.id;

    const lease = await Lease.findById(leaseId)
      .populate({
        path: 'unitId',
        populate: {
          path: 'propertyId',
          model: 'Property',
        },
      })
      .populate({
        path: 'tenantId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'firstName lastName email',
        },
      });

    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }

    res.json(lease);
  } catch (error) {
    console.error('Error fetching lease:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a lease
exports.updateLease = async (req, res) => {
  try {
    const leaseId = req.params.id;
    const updates = req.body;

    const lease = await Lease.findById(leaseId);
    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }

    // If unitId is being updated, check if the new unit is available
    if (updates.unitId && updates.unitId !== lease.unitId.toString()) {
      const newUnit = await Unit.findById(updates.unitId);
      if (!newUnit) {
        return res.status(404).json({ message: 'New unit not found' });
      }
      if (newUnit.availabilityStatus !== 'available') {
        return res.status(400).json({ message: 'New unit is not available' });
      }

      // Update old unit to available
      const oldUnit = await Unit.findById(lease.unitId);
      oldUnit.availabilityStatus = 'available';
      await oldUnit.save();

      // Update new unit to occupied
      newUnit.availabilityStatus = 'occupied';
      await newUnit.save();

      lease.unitId = updates.unitId;
    }

    // If tenantId is being updated, check if the new tenant exists
    if (updates.tenantId && updates.tenantId !== lease.tenantId.toString()) {
      const newTenant = await Tenant.findById(updates.tenantId);
      if (!newTenant) {
        return res.status(404).json({ message: 'New tenant not found' });
      }
      lease.tenantId = updates.tenantId;
    }

    // Update other fields
    if (updates.dateStart) lease.dateStart = updates.dateStart;
    if (updates.dateEnd) lease.dateEnd = updates.dateEnd;
    if (updates.rent) lease.rent = updates.rent;

    // Handle leaseDocument update
    if (req.file) {
      lease.leaseDocument = req.file.path;
    }

    const updatedLease = await lease.save();

    res.json(updatedLease);
  } catch (error) {
    console.error('Error updating lease:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a lease
exports.deleteLease = async (req, res) => {
  try {
    const leaseId = req.params.id;

    const lease = await Lease.findById(leaseId);
    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }

    // Update unit availability status to available
    const unit = await Unit.findById(lease.unitId);
    unit.availabilityStatus = 'available';
    await unit.save();

    // Remove the lease
    await lease.remove();

    res.json({ message: 'Lease deleted successfully' });
  } catch (error) {
    console.error('Error deleting lease:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get leases by tenant ID
exports.getLeasesByTenant = async (req, res) => {
  try {
    const tenantId = req.params.tenantId;

    const leases = await Lease.find({ tenantId })
      .populate('unitId')
      .populate({
        path: 'tenantId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'firstName lastName email',
        },
      });

    res.json(leases);
  } catch (error) {
    console.error('Error fetching leases for tenant:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get leases by unit ID
exports.getLeasesByUnit = async (req, res) => {
  try {
    const unitId = req.params.unitId;

    const leases = await Lease.find({ unitId })
      .populate('unitId')
      .populate({
        path: 'tenantId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'firstName lastName email',
        },
      });

    res.json(leases);
  } catch (error) {
    console.error('Error fetching leases for unit:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
