
// //STAGE 1
// const userModel = require("../models/user.model");

// // 1. User Registration (Signup)
// exports.registerApi = (req, res) => {
// // Since the React app sends it as 'name', we receive it exactly as is.
//     const { name, email, password } = req.body;

//     const userExists = userModel.find(data => data.email === email);

//     if(userExists){
//         return res.status(400).json({ message: "User account already exists! ⚠️" });
//     }

//     const newUser = {
//         id: Date.now().toString(),
//         name,
//         email,
//         password
//     };

//     userModel.push(newUser);
//     res.status(201).json({ message: "User Registration Successful! 🎉", user: newUser });
// }

// // 2. User Login (SignIn)
// exports.loginApi = (req, res) => {
//     const { email, password } = req.body;

// // We are checking if both the email and password match.
//     const user = userModel.find(data => data.email === email && data.password === password);

//     if(!user){
//         return res.status(401).json({ message: "Invalid Email or Password! ❌" });
//     }

// // We are also sending user data to the React app (to be stored in the session).
//     res.status(200).json({ message: "Welcome back!", user });
// };





// STAGE 2
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. User Registration (Signup) - with Bcrypt Hashing
exports.registerApi = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 🆕 Mongoose Query: We check if the email already exists using db.users.findOne()
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User account already exists! ⚠️" });
        }


        // 🆕 Password Hashing Logic
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // 🆕 Mongoose Command: Creating a new user document
        const newUser = new User({
            name,
            email,
            password: hashedPassword // Save the hashed password instead of raw password
        });

        // await newUser.save(); // We are saving it to the MongoDB database!

        // res.status(201).json({ message: "User Registration Successful! 🎉", user: newUser });

        await newUser.save();
        res.status(201).json({
            message: "User Registration Successful! 🎉",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        // We catch the error to prevent the server from crashing.
        res.status(500).json({ message: "Server Error during registration", error: error.message });
    }
}

// 2. User Login (SignIn) - MongoDB Approach
exports.loginApi = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🆕 Mongoose Query: We are looking for a user whose email and password match.
        // const user = await User.findOne({ email, password });
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password! ❌" });
        }


        // 🆕 Compare the entered password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Email or Password! ❌" });
        }

        // 🆕 Generate JWT Token (Valid for 1 day)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // res.status(200).json({ 
        // message: "Welcome back!", user });

        // // Send token and user data (without password) to the frontend
        // res.status(200).json({
        //     message: "Welcome back!",
        //     token,
        //     user: { _id: user._id, name: user.name, email: user.email }
        // });


        // 🆕 Sending the token via an HttpOnly cookie (Secure Way)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Works only when HTTPS is enabled in production (e.g., Render)
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 Day
        }).status(200).json({
            message: "Welcome back!",
            user: { _id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error during login", error: error.message });
    }
};



exports.getProfile = async (req, res) => {
    try {
        // req.userId is the ID coming from your middleware (extracted from the token)
        const user = await User.findById(req.userId).select("-password"); // Exclude the password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};