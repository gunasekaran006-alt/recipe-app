const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // 1. Extract the token from the header

    // Idea:1
    // const token = req.header("Authorization")?.split(" ")[1];
    // if (!token) return res.status(401).json({ message: "Access Denied" });

    // Idea:2
    const authHeader = req.header("Authorization");
    // console.log("Headers received:", req.headers); // 🆕 Checking this will reveal whether the token is being received.
    if (!authHeader) return res.status(401).json({ message: "No Token" });

    // 🆕 Extracting the token here (from 'Bearer')
    const token = authHeader.split(" ")[1];

    try {
        console.log("Checking Token:", token);
        // 2. Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified Payload:", verified);
        req.userId = verified.id; // Add user ID to the request
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};