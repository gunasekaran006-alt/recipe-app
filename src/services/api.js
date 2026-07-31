import axios from 'axios';

// 🟢 Dynamic Base URL for both Localhost and Production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true // 👈 Crucial for HttpOnly Cookies
});

// Generic Fetch Helper using Axios to avoid repetitive code
const apiRequest = async (endpoint, method = 'GET', data = null) => {
    try {
        const response = await API({
            url: endpoint,
            method: method,
            data: data
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            sessionStorage.removeItem("user");
            window.location.href = '/login';
        }
        throw new Error(error.response?.data?.message || "Something went wrong!");
    }
};

// API Functions
export const getRecipes = async () => await apiRequest('/recipes');
export const createRecipe = async (recipe) => await apiRequest('/recipes', 'POST', recipe);
export const updateRecipe = async (id, updatedRecipe) => await apiRequest(`/recipes/${id}`, 'PUT', updatedRecipe);
export const deleteRecipe = async (id) => await apiRequest(`/recipes/${id}`, 'DELETE');
export const getRecipeStats = async () => await apiRequest('/recipes/stats');

export default API;