import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AddRecipeModal({ show, onClose, onAddRecipe, editRecipe }) {
  // 💡 Form is completely empty by default
  const emptyFormState = {
    name: "",
    category: "Veg",
    image: "", 
    ingredients: "",
    instructions: "",
    time: "",
    servings: "",
    rating: 5,
    reviews: 1,
    difficulty: "Medium",
    author: "",
    description: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: ""
  };

  const [newRecipe, setNewRecipe] = useState(emptyFormState);
  const [isAILoading, setIsAILoading] = useState(false);

  useEffect(() => {
    if (editRecipe) {
      setNewRecipe({
        ...editRecipe,
        ingredients: editRecipe.ingredients ? editRecipe.ingredients.join(', ') : "",
        calories: editRecipe.nutrition?.calories || "",
        protein: editRecipe.nutrition?.protein || "",
        carbs: editRecipe.nutrition?.carbs || "",
        fat: editRecipe.nutrition?.fat || ""
      });
    } else {
      setNewRecipe(emptyFormState);
    }
  }, [editRecipe, show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  // 🪄 Gemini AI Magic Fill + Dynamic Real-time Image Logic
  const handleMagicFill = async () => {
    if (!newRecipe.name.trim()) {
      toast.warning("Please enter a Recipe Name first! (e.g., Mutton Biryani)");
      return;
    }

    setIsAILoading(true);
    // Clear the image immediately so the user sees the loading state
    setNewRecipe(prev => ({ ...prev, image: "" })); 

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
      
      if (!API_KEY || API_KEY === "your_google_gemini_api_key_here") {
        toast.error("⚠️ Missing Gemini API Key! Please check your .env file.");
        setIsAILoading(false);
        return; 
      }

      toast.info("AI is cooking up the details & image... 🪄");
      
      // 💡 THE ULTIMATE FIX: Correct model (gemini-2.5-flash) is added back!
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

      const promptText = `
        I am building a recipe sharing application. Provide realistic recipe details for a dish named "${newRecipe.name}".
        Return ONLY a valid JSON object with the exact structure below. Do not include any markdown tags like \`\`\`json.
        {
          "category": "Veg, Non-Veg, Dessert, Italian, South Indian, Chinese, or Fast Food",
          "description": "A catchy, delicious 2-line description of the dish",
          "time": "e.g., 30 mins",
          "servings": "e.g., 2 Servings",
          "difficulty": "Easy, Medium, or Hard",
          "ingredients": "Comma-separated list of 5-7 main ingredients",
          "instructions": "Brief step-by-step cooking instructions in 3 simple sentences.",
          "calories": "e.g. 350 kcal",
          "protein": "e.g. 15g",
          "carbs": "e.g. 45g",
          "fat": "e.g. 12g"
        }
      `;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch from Gemini API`);
      }

      const data = await response.json();
      let text = data.candidates[0].content.parts[0].text;
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const aiData = JSON.parse(text);

      // 💡 DYNAMIC IMAGE based on typed food name
      const dynamicImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(newRecipe.name + " delicious dish food photography close up high resolution")}?width=600&height=400&nologo=true`;

      setNewRecipe(prev => ({
        ...prev,
        category: aiData.category || "Veg",
        description: aiData.description || "",
        time: aiData.time || "",
        servings: aiData.servings || "",
        difficulty: aiData.difficulty || "Medium",
        ingredients: aiData.ingredients || "",
        instructions: aiData.instructions || "",
        calories: aiData.calories || "",
        protein: aiData.protein || "",
        carbs: aiData.carbs || "",
        fat: aiData.fat || "",
        image: dynamicImageUrl // ✨ Generated AI Image
      }));

      toast.success("✨ Magic Fill & Image Ready!");
    } catch (error) {
      console.error("Gemini AI Error:", error);
      toast.error("AI couldn't generate details. Please check your API key or network.");
    } finally {
      setIsAILoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ingredientsArray = newRecipe.ingredients
      .split(',')
      .map(ing => ing.trim())
      .filter(ing => ing !== "");

    const recipeToAdd = {
      ...newRecipe,
      id: editRecipe ? editRecipe.id : String(Date.now()), 
      ingredients: ingredientsArray,
      nutrition: {
        calories: newRecipe.calories || "N/A",
        protein: newRecipe.protein || "N/A",
        carbs: newRecipe.carbs || "N/A",
        fat: newRecipe.fat || "N/A"
      }
    };

    onAddRecipe(recipeToAdd); 
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
                  <div className="d-flex gap-2">
                    <input type="text" name="name" className="form-control rounded-3" placeholder="e.g. Mutton Biryani" required value={newRecipe.name} onChange={handleInputChange} />
                    <button 
                      type="button" 
                      className="btn btn-warning btn-sm rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center px-3" 
                      onClick={handleMagicFill} 
                      disabled={isAILoading}
                      style={{ minWidth: '100px' }}
                    >
                      {isAILoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : '🪄 AI Fill'}
                    </button>
                  </div>
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
                <input type="text" name="ingredients" className="form-control rounded-3" placeholder="e.g. Rice, Mutton, Spices" required value={newRecipe.ingredients} onChange={handleInputChange} />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Instructions</label>
                <textarea name="instructions" className="form-control rounded-3" rows="3" placeholder="Step 1: Marinate meat... Step 2: Cook rice..." required value={newRecipe.instructions} onChange={handleInputChange}></textarea>
              </div>

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

              {/* 🖼️ NEW: Image Preview Section */}
              <div className="mb-4 p-3 rounded-3 border bg-light text-center">
                <label className="form-label d-block small fw-bold text-dark mb-3">
                  Recipe Image Preview
                </label>
                
                {newRecipe.image ? (
                  <img 
                    src={newRecipe.image} 
                    alt="Food Preview" 
                    className="rounded-3 shadow-sm img-thumbnail"
                    style={{ maxHeight: '250px', width: '100%', objectFit: 'cover', transition: '0.3s ease-in-out' }}
                    onError={() => setNewRecipe(prev => ({ ...prev, image: "" }))}
                  />
                ) : isAILoading ? (
                  <div className="py-5 text-muted">
                    <div className="spinner-border text-warning mb-2" role="status"></div>
                    <div className="small fw-semibold">Generating beautiful image...</div>
                  </div>
                ) : (
                  <div className="py-5 text-muted bg-white rounded-3 border border-dashed">
                    <span className="display-4 opacity-25">🖼️</span>
                    <div className="small mt-2 fw-semibold">Image will appear here after AI Fill</div>
                  </div>
                )}
                
                <input 
                  type="text" 
                  name="image" 
                  className="form-control form-control-sm mt-3 rounded-pill text-center opacity-50" 
                  placeholder="Or paste custom image URL here" 
                  value={newRecipe.image} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="text-end mt-4">
                <button type="button" className="btn btn-outline-secondary rounded-pill px-4 me-2" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-pill px-4 shadow-sm">
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