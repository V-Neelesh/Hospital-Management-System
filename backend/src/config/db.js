const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

module.exports = connectDB;
