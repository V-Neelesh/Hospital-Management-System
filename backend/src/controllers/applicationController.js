const Application = require('../models/Application');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment'); // Import Appointment model
const { sendEmail, sendSMS } = require('../utils/notificationService');

// @desc    Submit a new application
// @route   POST /api/applications
// @access  Public
const createApplication = async (req, res, next) => {
    try {
        const { name, email, phone, age, gender, problem, appointmentRequest, user } = req.body;

        // Generate a random 6-digit serial number prefixed with 'APP'
        const serialNumber = 'APP-' + Math.floor(100000 + Math.random() * 900000);

        const application = await Application.create({
            user, // Save the user ID
            name,
            email,
            phone,
            age,
            gender,
            problem,
            appointmentRequest,
            serialNumber
        });

        res.status(201).json({
            success: true,
            data: application
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private (Admin)
const getApplications = async (req, res, next) => {
    try {
        const applications = await Application.find()
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update application (Assign Doctor / Update Status)
// @route   PUT /api/applications/:id
// @access  Private (Admin)
const updateApplication = async (req, res, next) => {
    try {
        const { doctor, status, appointmentRequest } = req.body;
        
        // Build the update object dynamically
        let updateData = {};
        if (doctor) updateData.doctor = doctor;
        if (status) updateData.status = status;
        if (appointmentRequest) updateData.appointmentRequest = appointmentRequest;

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate({
            path: 'doctor',
            populate: { path: 'user', select: 'name' }
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // AUTO-CREATE APPOINTMENT if status is Approved and doctor/date are present
        if (status === 'Approved' && application.doctor && application.appointmentRequest) {
            // Check if appointment already exists for this application to avoid duplicates
            // We can use a simple check or just create a new one. 
            // Since we don't have a direct link field in Appointment back to Application, we'll just create it.
            
            await Appointment.create({
                patient: application.user || null, // Can be null for guests
                patientName: application.name,      // Always present in Application
                doctor: application.doctor._id, // application.doctor is populated, access _id
                date: application.appointmentRequest,
                reason: application.problem || 'Approved Application',
                status: 'Scheduled'
            });
            console.log('Appointment auto-created for approved application');

            // --- NOTIFICATIONS ---
            const message = `Dear ${application.name}, your appointment has been confirmed for ${new Date(application.appointmentRequest).toLocaleString()}. Doctor: ${application.doctor.user.name}.`;
            
            if (application.email) {
                await sendEmail(application.email, 'Appointment Confirmation', message);
            }
            if (application.phone) {
                await sendSMS(application.phone, message);
            }
            // ---------------------
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createApplication,
    getApplications,
    getApplicationById,
    updateApplication
};

// @desc    Get single application by ID
// @route   GET /api/applications/:id
// @access  Public
async function getApplicationById(req, res, next) {
    try {
        const application = await Application.findById(req.params.id)
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (err) {
        next(err);
    }
}
