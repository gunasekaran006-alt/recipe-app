// const API_URL = 'http://localhost:3000/recipes';
const API_URL = 'http://localhost:8080/api/recipes';


// Fetch all recipes
export const getRecipes = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

// Add a new recipe
export const createRecipe = async (recipe) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
    });
    // return await response.json();
    const data = await response.json();

    // 🆕 If an Error comes from the backend, we create an Error ourselves (Throw)
    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to create recipe");
    }
    return data;
};

// Update an existing recipe (NEWLY ADDED)
export const updateRecipe = async (id, updatedRecipe) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
    });
    // return await response.json();

    const data = await response.json();

    // Same error handling for 🆕 Update 
    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to update recipe");
    }
    return data;
};

// Delete a recipe
export const deleteRecipe = async (id) => {
    // await fetch(`${API_URL}/${id}`, {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error("Failed to delete recipe");
    }
};


// Get Recipe Aggregation Stats
export const getRecipeStats = async () => {
    const response = await fetch(`${API_URL}/stats`);
    return await response.json();
};