const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");

// http://localhost:8080/api/recipes
router.get("/recipes", recipeController.getRecipes);
router.post("/recipes", recipeController.createRecipe);

// Its ID (:id) is required to modify or delete a specific recipe.
router.put("/recipes/:id", recipeController.updateRecipe);
router.delete("/recipes/:id", recipeController.deleteRecipe);

module.exports = router;