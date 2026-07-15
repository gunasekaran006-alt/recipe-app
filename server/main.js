// Import essential modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // To allow cross-origin requests from React

// Basic Route for Testing
app.get('/', (req, res) => {
    res.send("RecipeShare Backend API is running perfectly! 🚀");
});


// 🔗 We are linking our Recipe Routes here!
const recipeRoutes = require("./routes/recipe.routes");
app.use("/api", recipeRoutes); // /api will appear before every URL

app.get('/', (req, res) => {
    res.send("RecipeShare Backend API is running perfectly! 🚀");
});


// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
});