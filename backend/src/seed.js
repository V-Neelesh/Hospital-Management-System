const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');
const Application = require('./models/Application');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        console.log('Clearing existing data...');
        await Appointment.deleteMany({});
        await Doctor.deleteMany({});
        await Patient.deleteMany({});
        await User.deleteMany({});
        await Application.deleteMany({});

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        // Create Users
        console.log('Creating users...');
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });

        const doctorUser1 = await User.create({
            name: 'Dr. John Doe',
            email: 'doctor1@example.com',
            password: hashedPassword,
            role: 'doctor'
        });

        const doctorUser2 = await User.create({
            name: 'Dr. Jane Smith',
            email: 'doctor2@example.com',
            password: hashedPassword,
            role: 'doctor'
        });

        const doctorUser3 = await User.create({
            name: 'Dr. Emily Blunt',
            email: 'doctor3@example.com',
            password: hashedPassword,
            role: 'doctor'
        });

        const doctorUser4 = await User.create({
            name: 'Dr. Michael Scott',
            email: 'doctor4@example.com',
            password: hashedPassword,
            role: 'doctor'
        });

        const doctorUser5 = await User.create({
            name: 'Dr. Susan Storm',
            email: 'doctor5@example.com',
            password: hashedPassword,
            role: 'doctor'
        });

        const doctorUser6 = await User.create({
            name: 'Dr. Bruce Banner',
            email: 'doctor6@example.com',
            password: hashedPassword,
            role: 'doctor'
        });

        const doctorUser7 = await User.create({
            name: 'Dr. Hank Pym',
            email: 'doctor7@example.com',
            password: hashedPassword,
            role: 'doctor'
        });

        const doctorUser8 = await User.create({
            name: 'Dr. Stephen Strange',
            email: 'doctor8@example.com',
            password: hashedPassword,
            role: 'doctor'
        });

        const patientUser1 = await User.create({
            name: 'Alice Patient',
            email: 'patient1@example.com',
            password: hashedPassword,
            role: 'patient'
        });

        const patientUser2 = await User.create({
            name: 'Bob Patient',
            email: 'patient2@example.com',
            password: hashedPassword,
            role: 'patient'
        });

        // Create Doctors Details
        console.log('Creating doctor profiles...');
        const doctor1 = await Doctor.create({
            user: doctorUser1._id,
            specialization: 'Cardiology',
            experience: 15,
            qualifications: 'MBBS, MD (Cardiology)',
            contactNumber: '555-0101',
            schedule: [
                { day: 'Monday', startTime: '09:00', endTime: '17:00' },
                { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
                { day: 'Friday', startTime: '09:00', endTime: '13:00' }
            ]
        });

        const doctor2 = await Doctor.create({
            user: doctorUser2._id,
            specialization: 'Pediatrics',
            experience: 8,
            qualifications: 'MBBS, DCH',
            contactNumber: '555-0102',
            schedule: [
                { day: 'Tuesday', startTime: '10:00', endTime: '18:00' },
                { day: 'Thursday', startTime: '10:00', endTime: '18:00' }
            ]
        });

        const doctor3 = await Doctor.create({
            user: doctorUser3._id,
            specialization: 'Orthopedics',
            experience: 12,
            qualifications: 'MBBS, MS (Ortho)',
            contactNumber: '555-0103',
            schedule: [
                { day: 'Monday', startTime: '14:00', endTime: '20:00' },
                { day: 'Wednesday', startTime: '14:00', endTime: '20:00' },
                { day: 'Friday', startTime: '14:00', endTime: '20:00' }
            ]
        });

        const doctor4 = await Doctor.create({
            user: doctorUser4._id,
            specialization: 'Neurology',
            experience: 20,
            qualifications: 'MBBS, DM (Neurology)',
            contactNumber: '555-0104',
            schedule: [
                { day: 'Tuesday', startTime: '08:00', endTime: '14:00' },
                { day: 'Thursday', startTime: '08:00', endTime: '14:00' }
            ]
        });

        const doctor5 = await Doctor.create({
            user: doctorUser5._id,
            specialization: 'Dermatology',
            experience: 9,
            qualifications: 'MBBS, MD (Derma)',
            contactNumber: '555-0105',
            schedule: [
                { day: 'Monday', startTime: '10:00', endTime: '16:00' },
                { day: 'Friday', startTime: '10:00', endTime: '16:00' }
            ]
        });

        const doctor6 = await Doctor.create({
            user: doctorUser6._id,
            specialization: 'Oncology',
            experience: 18,
            qualifications: 'MBBS, MD (Oncology)',
            contactNumber: '555-0106',
            schedule: [
                { day: 'Wednesday', startTime: '08:00', endTime: '16:00' },
                { day: 'Thursday', startTime: '08:00', endTime: '16:00' }
            ]
        });

        const doctor7 = await Doctor.create({
            user: doctorUser7._id,
            specialization: 'ENT',
            experience: 11,
            qualifications: 'MBBS, MS (ENT)',
            contactNumber: '555-0107',
            schedule: [
                { day: 'Tuesday', startTime: '12:00', endTime: '20:00' },
                { day: 'Friday', startTime: '12:00', endTime: '20:00' }
            ]
        });

        const doctor8 = await Doctor.create({
            user: doctorUser8._id,
            specialization: 'Neurosurgery',
            experience: 14,
            qualifications: 'MBBS, MCh (Neurosurgery)',
            contactNumber: '555-0108',
            schedule: [
                { day: 'Monday', startTime: '08:00', endTime: '20:00' }
            ]
        });

        // Create Patient Details
        console.log('Creating patient profiles...');
        await Patient.create({
            user: patientUser1._id,
            age: 30,
            gender: 'Female',
            medicalHistory: ['Allergy to peanuts', 'Asthma']
        });

        await Patient.create({
            user: patientUser2._id,
            age: 45,
            gender: 'Male',
            medicalHistory: ['Hypertension']
        });

        // Create Appointments (Legacy/Already Scheduled)
        console.log('Creating appointments...');
        // Appointment for patient 1 with doctor 1
        await Appointment.create({
            patient: patientUser1._id,
            doctor: doctor1._id,
            date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
            reason: 'Regular checkup',
            status: 'Scheduled'
        });

        // Create Applications (Pending Appointments from Form)
        console.log('Creating applications...');
        await Application.create({
            user: patientUser1._id, // Linked to Alice
            name: 'Alice Patient', // Matches Alice
            age: 30,
            gender: 'female',
            problem: 'Severe headache and need consultation',
            appointmentRequest: new Date(new Date().setDate(new Date().getDate() + 3)),
            status: 'Pending',
            serialNumber: 'APP-SEED-001'
        });
        
         await Application.create({
            name: 'Jane Smith (Request)',
            age: 28,
            gender: 'female',
            problem: 'Fever and chills for 2 days',
            appointmentRequest: new Date(new Date().setDate(new Date().getDate() + 1)),
            status: 'Pending',
            serialNumber: 'APP-SEED-002'
        });


        console.log('Data Imported!');
        process.exit();
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }
};



seedData();
