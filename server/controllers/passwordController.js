const bcrypt = require('bcryptjs');
const User = require('../models/user.model'); // your model name and path
const sendEmail = require('../utils/sendEmail');

// 1. Forgot Password Controller (OTP Generation & Email Sending)
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // 1. Check if the user exists 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "This email address is not registered!" });
        }

        // 2. Generate a 6-digit OTP 
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes 

        // 3. Using updateOne() is safer than save() (avoids validation errors) 
        await User.updateOne(
            { email: user.email },
            {
                $set: {
                    resetPasswordOTP: otp,
                    resetPasswordExpires: expiryTime
                }
            }
        );

        // 4. Send email 
        const message = `Your password reset OTP is: ${otp}\nThis OTP is valid for 10 minutes only.`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'RecipeShare - Password Reset OTP',
                message
            });

            res.status(200).json({ message: "OTP successfully sent to your email!" });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // Clear OTP fields if email sending fails 
            await User.updateOne(
                { email: user.email },
                { $unset: { resetPasswordOTP: "", resetPasswordExpires: "" } }
            );
            return res.status(500).json({ message: "Failed to send email. Please check your .env settings." });
        }

    } catch (error) {
        console.error("Forgot password server error:", error);
        res.status(500).json({ message: "A server error occurred", error: error.message });
    }
};

// 2. Reset Password Controller (OTP Verification & Updating Password securely)
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({
            email,
            resetPasswordOTP: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid OTP or OTP has expired!" });
        }

        // 1. Check if the new password matches any of the previous 3 passwords
        if (user.passwordHistory && user.passwordHistory.length > 0) {
            for (const oldPassHash of user.passwordHistory) {
                const isMatch = await bcrypt.compare(newPassword, oldPassHash);
                if (isMatch) {
                    return res.status(400).json({ message: "The new password cannot be one of your previous 3 passwords!" });
                }
            }
        }

        // 2. Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 3. Add the old password to history and keep a maximum of 3 entries
        let updatedHistory = user.passwordHistory || [];
        if (user.password) {
            updatedHistory.unshift(user.password); // Add to the beginning
        }
        if (updatedHistory.length > 3) {
            updatedHistory.pop(); // Remove the oldest if it exceeds 3
        }

        // 4. Update the database
        await User.updateOne(
            { email: email },
            {
                $set: {
                    password: hashedPassword,
                    passwordHistory: updatedHistory
                },
                $unset: { resetPasswordOTP: "", resetPasswordExpires: "" }
            }
        ); res.status(200).json({ message: "Password successfully changed! You can now log in." });

    } catch (error) {
        console.error("Reset password server error:", error);
        res.status(500).json({ message: "An error occurred while changing the password", error: error.message });
    }
};