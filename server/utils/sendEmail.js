const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Create transporter with secure timeout handling for Render
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false // 👈 This bypasses cloud network restrictions
        }
    }); 

    const mailOptions = {
        from: `"Recipe Share App" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }; 

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;