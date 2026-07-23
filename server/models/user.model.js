// let users = [];
// module.exports = users;




const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    passwordHistory: {type: [String], default: [] },
    resetPasswordOTP: {type: String},
    resetPasswordExpires: {type: Date},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpire: { type: Date }
}, { timestamps: true });
// timestamps: true if createdAt, updatedAt will be created automatically!





module.exports = mongoose.model("User", userSchema);