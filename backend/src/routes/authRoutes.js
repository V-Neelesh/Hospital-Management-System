const express = require('express');
const router = express.Router();
const { registerUser, loginUser, simpleLogin } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/simple-login', simpleLogin);

module.exports = router;
