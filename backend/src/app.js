const express = require('express');
const cors = require('cors');
const { errorMiddleware } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
