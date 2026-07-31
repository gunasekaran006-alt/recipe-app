import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { toast } from 'react-toastify';
import API from '../services/api'; // 👈 1. Import API

const MyRecipes = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState();

    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchMyRecipes = async () => {
            try {
                // 🛠️ 2. Use API instance
                const response = await API.get('/recipes/my-recipes');

                const recipeData = Array.isArray(response)
                    ? response
                    : (response.recipes || response.data || []);

                setMyRecipes(recipeData);
            } catch (error) {
                console.error("Error fetching my recipes", error);
                setMyRecipes([]);
            }
        };
        fetchMyRecipes();
    }, []);

    const handleDeleteClick = (recipeId) => {
        setRecipeToDelete(recipeId);
        setShowConfirmModal(true);
    };

    const confirmAndExecuteDelete = async () => {
        if (recipeToDelete) {
            try {
                // 🛠️ 3. Use API instance for delete
                await API.delete(`/recipes/${recipeToDelete}`);
                setMyRecipes(myRecipes.filter(r => r._id !== recipeToDelete));
                toast.success("Recipe deleted successfully! 🗑️");
            } catch (error) {
                toast.error("Failed to delete recipe");
            } finally {
                setShowConfirmModal(false);
                setRecipeToDelete(null);
            }
        }
    };

    const handleEditRecipe = (recipe) => {
        setSelectedRecipe(undefined);
        const event = new CustomEvent("openEditRecipeModal", { detail: recipe });
        window.dispatchEvent(event);
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column position-relative">
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
                                onDelete={handleDeleteClick} // 🛠️ Connected to confirmation modal
                                onEdit={handleEditRecipe}     // 🛠️ Edit enabled for My Recipes
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
                onDelete={handleDeleteClick}
            />

            {/* 🛠️ Confirmation Modal Popup */}
            {showConfirmModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 shadow-lg">
                            <div className="modal-body p-4 text-center">
                                <div className="display-4 text-danger mb-3">⚠️</div>
                                <h4 className="fw-bold text-dark">Are you sure?</h4>
                                <p className="text-muted">Do you really want to delete this recipe?</p>
                                <div className="d-flex justify-content-center gap-3 mt-4">
                                    <button className="btn btn-light px-4 fw-bold border" onClick={() => setShowConfirmModal(false)}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-danger px-4 fw-bold shadow-sm" onClick={confirmAndExecuteDelete}>
                                        Yes, Delete It
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyRecipes;