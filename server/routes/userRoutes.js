// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected Routes
// Add any protected routes here

router.get('/dashboard', protect, (req, res) => {
  res.json({ message: 'Welcome to the dashboard!' });
});



module.exports = router;
