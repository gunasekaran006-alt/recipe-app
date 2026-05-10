import React, { useState, useEffect } from 'react';

function AddRecipeModal({ show, onClose, onAddRecipe, editRecipe }) {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    category: "Veg",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=500", // Default image
    ingredients: "",
    instructions: "",
    time: "30 mins",
    servings: "2 Servings",
    rating: 5,
    reviews: 1,
    difficulty: "Medium",
    author: "Chef Guna",
    description: "",
    calories: "280 kcal",
    protein: "12g",
    carbs: "35g",
    fat: "8g"
  });

  // Effect to load existing recipe details when in Edit Mode
  useEffect(() => {
    if (editRecipe) {
      setNewRecipe({
        ...editRecipe,
        ingredients: editRecipe.ingredients ? editRecipe.ingredients.join(', ') : "",
        calories: editRecipe.nutrition ? editRecipe.nutrition.calories : "280 kcal",
        protein: editRecipe.nutrition ? editRecipe.nutrition.protein : "12g",
        carbs: editRecipe.nutrition ? editRecipe.nutrition.carbs : "35g",
        fat: editRecipe.nutrition ? editRecipe.nutrition.fat : "8g"
      });
    } else {
      // Reset to default empty form when in Add Mode
      setNewRecipe({
        name: "",
        category: "Veg",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=500",
        ingredients: "",
        instructions: "",
        time: "30 mins",
        servings: "2 Servings",
        rating: 5,
        reviews: 1,
        difficulty: "Medium",
        author: "Chef Guna",
        description: "",
        calories: "280 kcal",
        protein: "12g",
        carbs: "35g",
        fat: "8g"
      });
    }
  }, [editRecipe, show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ingredientsArray = newRecipe.ingredients
      .split(',')
      .map(ing => ing.trim())
      .filter(ing => ing !== "");

    const recipeToAdd = {
      ...newRecipe,
      id: editRecipe ? editRecipe.id : String(Date.now()), // Keeps the same ID if editing
      ingredients: ingredientsArray,
      nutrition: {
        calories: newRecipe.calories || "N/A",
        protein: newRecipe.protein || "N/A",
        carbs: newRecipe.carbs || "N/A",
        fat: newRecipe.fat || "N/A"
      }
    };

    onAddRecipe(recipeToAdd); // Sends data back to Home.jsx
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: '1060' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
          <div className="modal-header border-0 pb-0">
            <h4 className="fw-bold text-primary mb-0">
              {editRecipe ? "Edit Recipe" : "Create New Recipe"}
            </h4>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Recipe Name</label>
                  <input type="text" name="name" className="form-control rounded-3" placeholder="e.g. Garlic Butter Shrimp" required value={newRecipe.name} onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Category</label>
                  <select name="category" className="form-select rounded-3" value={newRecipe.category} onChange={handleInputChange}>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Italian">Italian</option>
                    <option value="South Indian">South Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Fast Food">Fast Food</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Cook Time</label>
                  <input type="text" name="time" className="form-control rounded-3" placeholder="e.g. 25 mins" value={newRecipe.time} onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Servings</label>
                  <input type="text" name="servings" className="form-control rounded-3" placeholder="e.g. 2 Servings" value={newRecipe.servings} onChange={handleInputChange} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Brief Description</label>
                <textarea name="description" className="form-control rounded-3" rows="2" placeholder="Describe your delicious recipe..." required value={newRecipe.description} onChange={handleInputChange}></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Ingredients (comma-separated)</label>
                <input type="text" name="ingredients" className="form-control rounded-3" placeholder="Shrimp, Garlic, Butter, Parsley" required value={newRecipe.ingredients} onChange={handleInputChange} />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Instructions</label>
                <textarea name="instructions" className="form-control rounded-3" rows="3" placeholder="Step 1: Melt butter... Step 2: Add garlic..." required value={newRecipe.instructions} onChange={handleInputChange}></textarea>
              </div>

              {/* Nutritional Info Form Fields */}
              <h5 className="fw-bold text-dark mt-4 mb-3 border-bottom pb-2">Nutritional Information</h5>
              <div className="row mb-3 g-2">
                <div className="col-3">
                  <label className="form-label small fw-semibold">Calories</label>
                  <input type="text" name="calories" className="form-control rounded-3 form-control-sm" placeholder="e.g. 350 kcal" value={newRecipe.calories} onChange={handleInputChange} />
                </div>
                <div className="col-3">
                  <label className="form-label small fw-semibold">Protein</label>
                  <input type="text" name="protein" className="form-control rounded-3 form-control-sm" placeholder="e.g. 15g" value={newRecipe.protein} onChange={handleInputChange} />
                </div>
                <div className="col-3">
                  <label className="form-label small fw-semibold">Carbs</label>
                  <input type="text" name="carbs" className="form-control rounded-3 form-control-sm" placeholder="e.g. 45g" value={newRecipe.carbs} onChange={handleInputChange} />
                </div>
                <div className="col-3">
                  <label className="form-label small fw-semibold">Fat</label>
                  <input type="text" name="fat" className="form-control rounded-3 form-control-sm" placeholder="e.g. 12g" value={newRecipe.fat} onChange={handleInputChange} />
                </div>
              </div>

              <div className="text-end mt-4">
                <button type="button" className="btn btn-outline-secondary rounded-pill px-4 me-2" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-pill px-4">
                  {editRecipe ? "Update Recipe" : "Add Recipe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeModal;