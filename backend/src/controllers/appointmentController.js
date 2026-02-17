const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor');


// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Public
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patient', 'name email')
            .populate({
                path: 'doctor',
                populate: {
                    path: 'user',
                    select: 'name email'
                }
            });

        res.status(200).json({
            success: true, 
            count: appointments.length,
            data: appointments
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

const createAppointment = async (req, res) => {
    res.json({ message: 'Create appointment' });
};

module.exports = { getAppointments, createAppointment };
