const Doctor = require('../models/Doctor');
// Ensure User model is registered for population
require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find().populate('user', 'name email');
        res.status(200).json({
            success: true,
            data: doctors
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getDoctors };
