// Import essential modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const dns = require("dns");

// dns.setServers(["1.1.1.1", "8.8.8.8"]);
if (process.env.NODE_ENV === "development") {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

const errorMiddleware = require('./middleware/error.middleware');

// 🆕 Bringing in the database connection
const dbConnection = require("./config/dbconnection");
dbConnection(); // Connecting!


// Initialize Express App
const app = express();


app.use(express.json()); // To parse JSON bodies
app.use(cors()); // To allow cross-origin requests from React

// Rate Limiter Configuration
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again after 5 minutes."
});

// Apply rate limiter to all API routes
app.use("/api", limiter);


// Basic Route for Testing
app.get('/', (req, res) => {
    res.send("RecipeShare Backend API is running perfectly! 🚀");
});


// 🔗 We are linking our Recipe Routes here!
const recipeRoutes = require("./routes/recipe.routes");
const authRoutes = require("./routes/auth.routes");

// Apply to all API routes
app.use("/api", recipeRoutes); // /api will appear before every URL
app.use("/api/auth", authRoutes); // 🆕 Auth Routes Link

app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running securely on port ${PORT}`);
});