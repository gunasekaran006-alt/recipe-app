const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Create transporter using secure port 587 and explicit IPv4 hint
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for 587
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    }); 

    // 2. Email details
    const mailOptions = {
        from: `"Recipe Share App" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }; 

    // 3. Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;