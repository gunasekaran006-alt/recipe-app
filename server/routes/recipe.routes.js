const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/stats", recipeController.getRecipeStats);
// http://localhost:8080/api/recipes
router.get("/", recipeController.getRecipes);

//(Note: This is not required for the getRecipes route, because everyone needs to be able to view recipes.)
// Add, Update, and Delete operations only: add authMiddleware
router.post("/", authMiddleware, recipeController.createRecipe);
// Its ID (:id) is required to modify or delete a specific recipe.
router.put("/:id", authMiddleware, recipeController.updateRecipe);
router.delete("/:id", authMiddleware, recipeController.deleteRecipe);

module.exports = router;