// STAGE : 1
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


// STAGE:2
// const recipeModel = require("../models/recipe.model");

// // 1. GET API - Retrive all recipes
// exports.getRecipes = (req, res) => {
//     // If there are no recipes
//     if (recipeModel.length === 0) {
//         return res.json({ message: "No Recipes Added Yet 🍽️", data: [] });
//     }

//     // // If there are recipes, we will send them as-is to React.
//     //     res.json(recipeModel);

//     res.status(200).json(recipeModel);
// };

// // 2. POST API - Create a new recipe
// exports.createRecipe = (req, res) => {
//     // We receive all the data coming from React via req.body.
//     const { name, category, image, ingredients, instructions, time, servings } = req.body;

//     // New recipe object
//     const newRecipe = {
//         id: Date.now().toString(), // ID (Unique ID)
//         name,
//         category,
//         image,
//         ingredients,
//         instructions,
//         time,
//         servings
//     };

//     // Adding to the temporary database
//     recipeModel.push(newRecipe);

//     // res.json({ message: "Recipe Added Successfully! ✨", recipe: newRecipe });
//     res.status(201).json({ message: "Recipe Added Successfully! ✨", data: newRecipe });

// };

// // 3. PUT API - Update a recipe
// exports.updateRecipe = (req, res) => {
//     const id = req.params.id; // We extract the ID from the URL.
//     const { name, category, image, ingredients, instructions, time, servings } = req.body;

//     // We find the recipe with that ID.
//     const recipe = recipeModel.find(data => data.id === id);

//     if (!recipe) {
//         return res.status(404).json({ message: "Recipe Not Found! ❌" });
//     }

//     // Update logic (if there is new data, use it; otherwise, keep the old data)
//     recipe.name = name || recipe.name;
//     recipe.category = category || recipe.category;
//     recipe.image = image || recipe.image;
//     recipe.ingredients = ingredients || recipe.ingredients;
//     recipe.instructions = instructions || recipe.instructions;
//     recipe.time = time || recipe.time;
//     recipe.servings = servings || recipe.servings;


//     // res.json({ message: `Recipe updated successfully ✏️` });

//     res.status(200).json({ message: "Recipe Updated Successfully! ✏️", data: recipe });
// };


// // 4. DELETE API - Remove a recipe
// exports.deleteRecipe = (req, res) => {
//     const id = req.params.id;

// // We find the index of that recipe.
//     const recipeIndex = recipeModel.findIndex(data => data.id === id);

//     if (recipeIndex === -1) {
//         return res.status(404).json({ message: "Recipe Not Found! ❌" });
//     }

// // We cut that recipe out of the array (Splice)
//     recipeModel.splice(recipeIndex, 1);


//     // res.json({ message: `Recipe deleted successfully 🗑️` });
//     res.status(200).json({ message: "Recipe Deleted Successfully! 🗑️" });
// };




// STAGE:3
const User = require("../models/user.model");
const Recipe = require("../models/recipe.model");

// 🆕 Title Case Helper Function (Magic that capitalizes the first letter of every word!)
const toTitleCase = (str) => {
    if (!str) return "";
    return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
};

// 1. GET API - Read all recipes from MongoDB
exports.getRecipes = async (req, res) => {
    try {
        // Mongoose Command: db.recipes.find()
        const recipes = await Recipe.find();

        // if (recipes.length === 0) {
        //     return res.status(200).json({ message: "No Recipes Found 🍽️", data: [] });
        // }
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. POST API - Create a new recipe in MongoDB
exports.createRecipe = async (req, res) => {
    try {

        console.log("UserID from middleware:", req.userId);

        // 🆕 We are also extracting the new fields from req.body
        let { name, category, image, ingredients, instructions, time, servings, description, difficulty, author, rating, reviews, nutrition } = req.body;

        // 🆕 Regardless of how the user types it, we convert it to Title Case
        name = toTitleCase(name);

        // Mongoose Command: db.recipes.insertOne()
        const newRecipe = new Recipe({
            // name,
            name: toTitleCase(name),
            category,
            image,
            ingredients,
            instructions,
            time,
            servings,
            rating: rating || 0,
            reviews: reviews || 0,
            difficulty,
            author,
            description,
            // nutrition: req.body.nutrition,
            nutrition,
            user: req.userId
        });

        await newRecipe.save(); // Saving to the database
        res.status(201).json({ message: "Recipe Added Successfully! ✨", data: newRecipe });
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ message: "Error saving recipe", error: error.message });
    }
};

// 3. PUT API - Update an existing recipe in MongoDB
exports.updateRecipe = async (req, res) => {
    try {
        const id = req.params.id;

        // 1. Check if the recipe belongs to the user
        const recipe = await Recipe.findOne({ _id: id, user: req.userId });

        // 2. If the recipe does not exist (i.e., the user is not the owner)
        if (!recipe) {
            return res.status(401).json({ message: "Unauthorized: You don't own this recipe" });
        }

        // 🆕 We also convert the name to Title Case during updates
        // 3. We will update this once ownership is confirmed.
        if (req.body.name) {
            req.body.name = toTitleCase(req.body.name);
        }

        // Mongoose Command: db.recipes.updateOne()
        // Providing `{ new: true }` returns the updated data.
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }); // new: true Returns the newly updated data.

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe Not Found! ❌" });
        }

        res.status(200).json({ message: "Recipe Updated Successfully! ✏️", data: updatedRecipe });
    } catch (error) {
        res.status(500).json({ message: "Error updating recipe", error: error.message });
    }
};

// 4. DELETE API - Remove a recipe from MongoDB
// // stage:1 ( // There is no ownership check here!)
// exports.deleteRecipe = async (req, res) => {
//     try {
//         const id = req.params.id;

//         // Mongoose Command: db.recipes.deleteOne()
//         const deletedRecipe = await Recipe.findByIdAndDelete(id);

//         if (!deletedRecipe) {
//             return res.status(404).json({ message: "Recipe Not Found! ❌" });
//         }

//         res.status(200).json({ message: "Recipe Deleted Successfully! 🗑️" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting recipe", error: error.message });
//     }
// };
// stage:2 // ownership checked here!
// 4. DELETE API - Remove a recipe from MongoDB
exports.deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found!" });
        }

        // 🛠️ Replaced 'recipe.createdBy' with 'recipe.user' 
        if (String(recipe.user) !== String(req.userId)) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own recipes! ❌" });
        }

        await Recipe.findByIdAndDelete(recipeId);
        res.status(200).json({ message: "Recipe deleted successfully! 🗑️" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// 5. GET API - Get Recipe Statistics using Aggregation
exports.getRecipeStats = async (req, res) => {
    try {
        const stats = await Recipe.aggregate([
            {
                // 1. Grouping recipes by Category and counting them
                $group: {
                    _id: "$category",
                    totalRecipes: { $sum: 1 },
                    averageRating: { $avg: "$rating" } // Bonus: Average rating of that category
                }
            },
            {
                // 2. Sorting the output (highest recipes first)
                $sort: { totalRecipes: -1 }
            }
        ]);

        res.status(200).json({ message: "Recipe Stats Fetched! 📊", data: stats });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stats", error: error.message });
    }
};






exports.toggleFavorite = async (req, res) => {
    try {
        const userId = req.userId;
        const { recipeId } = req.body;

        if (!recipeId) {
            return res.status(400).json({ message: "Recipe ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create if not favorites 
        if (!user.favorites) {
            user.favorites = [];
        }

        // Convert to string and check if it already exists 
        const exists = user.favorites.some(id => id && id.toString() === recipeId.toString());

        let updatedFavorites;
        if (exists) {
            // deletion 
            updatedFavorites = user.favorites.filter(id => id && id.toString() !== recipeId.toString());
        } else {
            // Adding 
            updatedFavorites = [...user.favorites, recipeId];
        }

        // Safely update and save 
        user.favorites = updatedFavorites;
        await user.save();

        res.status(200).json({
            success: true,
            favorites: user.favorites,
            message: exists ? "Removed from favorites" : "Added to favorites"
        });
    } catch (error) {
        console.error("Toggle Favorite Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// 6. GET API - Get logged-in user's recipes
exports.getMyRecipes = async (req, res) => {
    try {
        const userId = req.userId;
        const recipes = await Recipe.find({ user: userId });
        res.status(200).json(recipes);
    } catch (error) {
        console.error("Error fetching user recipes:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};