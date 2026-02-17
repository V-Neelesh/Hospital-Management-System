const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, default: 0 },
    qualifications: { type: String, default: 'MBBS' },
    contactNumber: { type: String, default: 'N/A' },
    schedule: [{ day: String, startTime: String, endTime: String }],
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
