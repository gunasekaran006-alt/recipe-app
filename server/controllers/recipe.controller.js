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

// 1. GET API - Retrive all recipes
exports.getRecipes = (req, res) => {
    // If there are no recipes
    if (recipeModel.length === 0) {
        return res.json({ message: "No Recipes Added Yet 🍽️", data: [] });
    }

    // // If there are recipes, we will send them as-is to React.
    //     res.json(recipeModel);

    res.status(200).json(recipeModel);
};

// 2. POST API - Create a new recipe
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

    // res.json({ message: "Recipe Added Successfully! ✨", recipe: newRecipe });
    res.status(201).json({ message: "Recipe Added Successfully! ✨", data: newRecipe });

};

// 3. PUT API - Update a recipe
exports.updateRecipe = (req, res) => {
    const id = req.params.id; // We extract the ID from the URL.
    const { name, category, image, ingredients, instructions, time, servings } = req.body;

    // We find the recipe with that ID.
    const recipe = recipeModel.find(data => data.id === id);

    if (!recipe) {
        return res.status(404).json({ message: "Recipe Not Found! ❌" });
    }

    // Update logic (if there is new data, use it; otherwise, keep the old data)
    recipe.name = name || recipe.name;
    recipe.category = category || recipe.category;
    recipe.image = image || recipe.image;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.time = time || recipe.time;
    recipe.servings = servings || recipe.servings;


    // res.json({ message: `Recipe updated successfully ✏️` });

    res.status(200).json({ message: "Recipe Updated Successfully! ✏️", data: recipe });
};


// 4. DELETE API - Remove a recipe
exports.deleteRecipe = (req, res) => {
    const id = req.params.id;

// We find the index of that recipe.
    const recipeIndex = recipeModel.findIndex(data => data.id === id);

    if (recipeIndex === -1) {
        return res.status(404).json({ message: "Recipe Not Found! ❌" });
    }

// We cut that recipe out of the array (Splice)
    recipeModel.splice(recipeIndex, 1);


    // res.json({ message: `Recipe deleted successfully 🗑️` });
    res.status(200).json({ message: "Recipe Deleted Successfully! 🗑️" });
};