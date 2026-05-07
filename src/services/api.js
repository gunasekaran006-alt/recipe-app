const API_URL = 'http://localhost:3000/recipes';

export const getRecipes = async () => {
    const res = await fetch(API_URL);
    return await res.json();
};