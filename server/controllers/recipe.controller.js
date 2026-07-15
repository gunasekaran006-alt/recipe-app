// Recipe API logics

// 1. (Get All Recipes)
exports.getRecipes = (req, res) => {
    res.json({ message: "All Recipes fetched successfully 🍽️" });
};

// 2. (Create Recipe)
exports.createRecipe = (req, res) => {
    res.json({ message: "New Recipe Added successfully ✨" });
};

// 3. (Update Recipe)
exports.updateRecipe = (req, res) => {
    res.json({ message: `Recipe updated successfully ✏️` });
};

// 4. (Delete Recipe)
exports.deleteRecipe = (req, res) => {
    res.json({ message: `Recipe deleted successfully 🗑️` });
};