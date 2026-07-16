
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

// 1. User Registration (Signup) - MongoDB approach
exports.registerApi = async (req, res) => {
    try {
        const { name, email, password } = req.body;

// 🆕 Mongoose Query: We check if the email already exists using db.users.findOne()
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User account already exists! ⚠️" });
        }

// 🆕 Mongoose Command: Creating a new user document
        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save(); // We are saving it to the MongoDB database!
        
        res.status(201).json({ message: "User Registration Successful! 🎉", user: newUser });
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
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password! ❌" });
        }

        res.status(200).json({ message: "Welcome back!", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error during login", error: error.message });
    }
};