const express = require('express');
const router = express.Router();

// Importing the controller you created
const { forgotPassword, resetPassword } = require('../controllers/passwordController');

// Creating the forgot password route
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;