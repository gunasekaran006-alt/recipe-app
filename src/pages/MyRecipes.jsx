import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // 👈 1. Import Navbar
import RecipeCard from '../components/RecipeCard';
import RecipeDetailModal from '../components/RecipeDetailModal'; // 👈 2. Import the Modal
import { toast } from 'react-toastify';

const MyRecipes = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(); // 👈 The perfect method you found 

    useEffect(() => {
        const fetchMyRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/recipes/my-recipes', { withCredentials: true });

                const recipeData = Array.isArray(response.data)
                    ? response.data
                    : (response.data.recipes || response.data.data || []);

                setMyRecipes(recipeData);
            } catch (error) {
                console.error("Error fetching my recipes", error);
                setMyRecipes([]);
            }
        };
        fetchMyRecipes();
    }, []);

    const handleDelete = async (recipeId) => {
        try {
            await axios.delete(`http://localhost:8080/api/recipes/${recipeId}`, { withCredentials: true });
            setMyRecipes(myRecipes.filter(r => r._id !== recipeId));
            toast.success("Recipe deleted successfully! 🗑️");
        } catch (error) {
            toast.error("Failed to delete recipe");
        }
    };

    const handleEditRecipe = (recipe) => {
        setSelectedRecipe(undefined);
        const event = new CustomEvent("openEditRecipeModal", { detail: recipe });
        window.dispatchEvent(event);
    };

    return (
        // 🛠️ FIX: Giving min-vh-100 and flex-column like other pages 
        <div className="bg-light min-vh-100 d-flex flex-column">
            {/* 👈 3. Navbar must be linked here */}
            <Navbar />

            <div className="container py-5 flex-grow-1">
                <h2 className="fw-bold text-dark border-start border-primary border-4 ps-3 mb-4">
                    🍽️ My Recipes
                </h2>
                <div className="row g-4">
                    {Array.isArray(myRecipes) && myRecipes.length > 0 ? (
                        myRecipes.map(recipe => (
                            <RecipeCard
                                key={recipe._id}
                                recipe={recipe}
                                setSelectedRecipe={setSelectedRecipe}
                                onDelete={handleDelete}
                                isFavorite={false}
                            />
                        ))
                    ) : (
                        <div className="text-center py-5 bg-white rounded-4 shadow-sm my-4">
                            <span className="fs-1">🍽️</span>
                            <h4 className="fw-bold text-muted mt-3">No Recipes Added By You Yet</h4>
                            <p className="text-secondary small">Start sharing your delicious recipes with the world!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Reusable Detail Modal */}
            <RecipeDetailModal
                selectedRecipe={selectedRecipe}
                onClose={() => setSelectedRecipe(undefined)}
                onEdit={handleEditRecipe}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default MyRecipes;