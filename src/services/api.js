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
    return await response.json();
};

// Update an existing recipe (NEWLY ADDED)
export const updateRecipe = async (id, updatedRecipe) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
    });
    return await response.json();
};

// Delete a recipe
export const deleteRecipe = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};