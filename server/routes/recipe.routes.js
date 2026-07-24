const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");
const authMiddleware = require("../middleware/auth.middleware");

// 1. Stats and special routes
router.get("/stats", recipeController.getRecipeStats);
router.get("/my-recipes", authMiddleware, recipeController.getMyRecipes);
router.put("/favorite", authMiddleware, recipeController.toggleFavorite);

// 2. Standard GET and POST routes
router.get("/", recipeController.getRecipes);
router.post("/", authMiddleware, recipeController.createRecipe);

// 3. Dynamic routes (:id) - Always keep at the bottom
router.put("/:id", authMiddleware, recipeController.updateRecipe);
router.delete("/:id", authMiddleware, recipeController.deleteRecipe);

module.exports = router;