const express = require('express');
const router = express.Router();
const { getPatientProfile } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getPatientProfile);

module.exports = router;
