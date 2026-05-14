const API_URL = 'http://localhost:3000/recipes';

export const getRecipes = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const createRecipe = async (recipeData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
  });
  return await response.json();
};

// FIXED: New function to delete recipe permanently from db.json
export const deleteRecipe = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};