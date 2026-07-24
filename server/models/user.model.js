// let users = [];
// module.exports = users;




const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordHistory: { type: [String], default: [] },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ],
    resetPasswordOTP: { type: String },
    resetPasswordExpires: { type: Date },
    otp: { type: String },
    otpExpire: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);