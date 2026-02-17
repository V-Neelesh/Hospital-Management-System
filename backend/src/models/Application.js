const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Added user reference
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    problem: { type: String, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    appointmentRequest: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    serialNumber: { type: String, unique: true } // Generated automatically
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
