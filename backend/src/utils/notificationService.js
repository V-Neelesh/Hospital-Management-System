const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        // Create a transporter using environment variables or a default test account
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail', // Default to Gmail
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };

        const isConfigured = 
            process.env.EMAIL_USER && 
            process.env.EMAIL_PASS && 
            !process.env.EMAIL_USER.includes('your_email') && 
            !process.env.EMAIL_PASS.includes('your_email');

        if (isConfigured) {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } else {
            console.log('==========================================');
            console.log('EMAIL NOT SENT - Configuration Missing or Default');
            console.log('Please update backend/.env with real credentials.');
            console.log(`Current User: ${process.env.EMAIL_USER}`);
            console.log('==========================================');
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendSMS = async (to, message) => {
    // Placeholder for SMS integration (e.g., Twilio)
    console.log('==========================================');
    console.log(`MOCK SMS SERVICE - (Integrate Twilio/Vonage for real SMS)`);
    console.log(`To: ${to}`);
    console.log(`Message: ${message}`);
    console.log('==========================================');
};

module.exports = { sendEmail, sendSMS };
