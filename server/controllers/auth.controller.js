const userModel = require("../models/user.model");

// 1. User Registration (Signup)
exports.registerApi = (req, res) => {
// Since the React app sends it as 'name', we receive it exactly as is.
    const { name, email, password } = req.body;

    const userExists = userModel.find(data => data.email === email);

    if(userExists){
        return res.status(400).json({ message: "User account already exists! ⚠️" });
    }

    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
    };
    
    userModel.push(newUser);
    res.status(201).json({ message: "User Registration Successful! 🎉", user: newUser });
}

// 2. User Login (SignIn)
exports.loginApi = (req, res) => {
    const { email, password } = req.body;

// We are checking if both the email and password match.
    const user = userModel.find(data => data.email === email && data.password === password);

    if(!user){
        return res.status(401).json({ message: "Invalid Email or Password! ❌" });
    }

// We are also sending user data to the React app (to be stored in the session).
    res.status(200).json({ message: "Welcome back!", user });
};