const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    res.json({ message: 'Register User' });
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user by name (since frontend uses username field)
        const user = await User.findOne({ name: username });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: 'dummy_token' // jwt implementation can be added later
            });
        } else {
             // Fallback for simple testing if seeding wasn't perfect or for admin hardcode override 
             // (though admin is in DB now too)
            if (username === 'admin' && password === 'admin') {
                 res.json({
                    _id: 'admin_id',
                    name: 'Admin',
                    role: 'admin',
                    token: 'admin_token'
                });
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const simpleLogin = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ name: username });

        if (user) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            // For simple login, if user doesn't exist, maybe we create a temporary one or just fail?
            // To keep "status by ID" working, we need an ID.
            // Let's return error if not found, forcing user to pick a valid seeded name or "register" (which we don't have UI for).
            // OR effectively "auto-register" temp user? 
            // Let's stick to "Must match existing name" for now to view existing status.
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, simpleLogin };
