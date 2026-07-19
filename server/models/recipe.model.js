// // An array to temporarily store recipes
// let recipes = [];

// module.exports = recipes;



const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    // name: { type: String, required: true },

    // 🆕 `index: true` has been added to speed up the search.
    name: { type: String, required: true, index: true },
    category: {
        type: String,
        index: true, // 🆕 Indexing to speed up category filtering
        
        // Validation Rule!
        enum: ["Veg", "Non-Veg", "Italian", "South Indian", "Chinese", "Dessert", "Fast Food"],
        required: true
    },
    image: { type: String },
    ingredients: { type: [String], required: true }, // Array of strings
    instructions: { type: String, required: true },
    time: { type: String },
    servings: { type: String },
    rating: { type: Number, default: 0 }, // Starts with 0 when newly added.
    reviews: { type: Number, default: 0 },
    difficulty: { type: String },
    author: { type: String },
    description: { type: String },

    // (Nutrition Facts)
    nutrition: {
        calories: { type: String },
        protein: { type: String },
        carbs: { type: String },
        fat: { type: String }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);