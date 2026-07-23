const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
// 1. Create transporter (using Gmail SMTP)
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: process.env.EMAIL_USER, // Your Gmail address
pass: process.env.EMAIL_PASS  // Gmail App Password
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