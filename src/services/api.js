// const API_URL = 'http://localhost:3000/recipes';
const API_URL = 'http://localhost:8080/api/recipes';


// Fetch all recipes
export const getRecipes = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

// Add a new recipe - The token must be sent when making the API call from AddRecipeModal.jsx.
export const createRecipe = async (recipe, token) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
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
export const updateRecipe = async (id, updatedRecipe, token) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify(updatedRecipe),
    });
    // return await response.json();

    const data = await response.json();

    // Same error handling for 🆕 Update 
    if (!response.ok) {
        if (response.status === 401) throw new Error("Invalid Token");
        // throw new Error(data.error || data.message || "Failed to update recipe");
        throw new Error(data.message || "Failed to process");
    }
    return data;
};

// Delete a recipe
// export const deleteRecipe = async (id) => {
//     // await fetch(`${API_URL}/${id}`, {
//     const response = await fetch(`${API_URL}/${id}`, {
//         method: 'DELETE',
export const deleteRecipe = async (id, token) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` // 🆕 Token should be added here
        }
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