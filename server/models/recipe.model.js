// // An array to temporarily store recipes
// let recipes = [];

// module.exports = recipes;



const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        // Validation Rule!
        enum: ["Veg", "Non-Veg", "Italian", "South Indian", "Chinese", "Dessert", "Fast Food"]
    },
    image: { type: String },
    ingredients: { type: [String], required: true }, // Array of strings
    instructions: { type: String, required: true },
    time: { type: String },
    servings: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);