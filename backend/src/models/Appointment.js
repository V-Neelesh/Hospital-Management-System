const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference is now optional
    patientName: { type: String }, // For guest patients or fallback
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    date: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Scheduled', 'Completed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
