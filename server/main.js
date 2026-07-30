// Import essential modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const dns = require("dns");
const cookieParser = require("cookie-parser");
const passwordRoutes = require("./routes/passwordRoutes");

// Initialize Express App
const app = express();


// dns.setServers(["1.1.1.1", "8.8.8.8"]);
if (process.env.NODE_ENV === "development") {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
}


// Import Routes and Middlewares
const recipeRoutes = require("./routes/recipe.routes");
const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require('./middleware/error.middleware');


// 🆕 Bringing in the database connection
const dbConnection = require("./config/dbconnection");
dbConnection(); // Connecting!


// Middlewares configuration
app.use(express.json()); // To parse JSON bodies


const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL // Add this to the .env file after deployment
];


// To allow cross-origin requests from React
app.use(cors({
    origin: function (origin, callback) {
        // Requests from Postman or mobile apps won't have an origin; allow them
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true // 👈 Crucial for accepting cookies
}));
app.use(cookieParser());

// Rate Limiter Configuration
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again after 5 minutes."
});


// Apply rate limiter to all API routes ( but not applicable in local test)
if (process.env.NODE_ENV === "production") {
    app.use("/api", limiter);
}


// Basic Route for Testing
app.get('/', (req, res) => {
    res.send("RecipeShare Backend API is running perfectly! 🚀");
});


// 🔗 Linking API Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/auth", passwordRoutes);


// ⚠️ Error Middleware (must always be last)
app.use(errorMiddleware);


// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running securely on port ${PORT}`);
});