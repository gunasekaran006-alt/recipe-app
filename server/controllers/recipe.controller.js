// // Recipe API logics

// // 1. (Get All Recipes)
// exports.getRecipes = (req, res) => {
//     res.json({ message: "All Recipes fetched successfully 🍽️" });
// };

// // 2. (Create Recipe)
// exports.createRecipe = (req, res) => {
//     res.json({ message: "New Recipe Added successfully ✨" });
// };

// // 3. (Update Recipe)
// exports.updateRecipe = (req, res) => {
//     res.json({ message: `Recipe updated successfully ✏️` });
// };

// // 4. (Delete Recipe)
// exports.deleteRecipe = (req, res) => {
//     res.json({ message: `Recipe deleted successfully 🗑️` });
// };



const recipeModel = require("../models/recipe.model");

// 1. Get all recipes (GET)
exports.getRecipes = (req, res) => {
// If there are no recipes
    if (recipeModel.length === 0) {
        return res.json({ message: "No Recipes Added Yet 🍽️", data: [] });
    }
    
// If there are recipes, we will send them as-is to React.
    res.json(recipeModel);
};

// 2. To create a new recipe (POST)
exports.createRecipe = (req, res) => {
// We receive all the data coming from React via req.body.
    const { name, category, image, ingredients, instructions, time, servings } = req.body;

// New recipe object
    const newRecipe = {
        id: Date.now().toString(), // ID (Unique ID)
        name,
        category,
        image,
        ingredients,
        instructions,
        time,
        servings
    };

// Adding to the temporary database
    recipeModel.push(newRecipe);

    res.json({ message: "Recipe Added Successfully! ✨", recipe: newRecipe });
};

// (We will fully implement the Update and Delete logic once the database is ready)
exports.updateRecipe = (req, res) => {
    res.json({ message: `Recipe updated successfully ✏️` });
};

exports.deleteRecipe = (req, res) => {
    res.json({ message: `Recipe deleted successfully 🗑️` });
};