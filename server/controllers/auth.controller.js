const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. User Registration (Signup)
exports.registerApi = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User account already exists! ⚠️" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "User Registration Successful! 🎉",
            user: { _id: newUser._id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error during registration", error: error.message });
    }
};

// 2. User Login (SignIn)
exports.loginApi = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password! ❌" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Email or Password! ❌" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // 🛠️ The same options provided during login must also be provided during logout
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set this to false when testing on localhost
            sameSite: "lax", // 'lax' is safest for local testing
            maxAge: 24 * 60 * 60 * 1000 // 1 Day
        }).status(200).json({
            message: "Welcome back!",
            user: { _id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error during login", error: error.message });
    }
};

// 3. User Logout (Fixed Version)
exports.logoutApi = async (req, res) => {
    try {
        // 🛠️ The same options (secure & sameSite) used during login must be provided here as well
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(200).json({ message: "Logged out successfully! 🚪" });
    } catch (error) {
        res.status(500).json({ message: "Server Error during logout", error: error.message });
    }
};

// 4. Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};