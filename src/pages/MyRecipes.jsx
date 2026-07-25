import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { toast } from 'react-toastify';

const MyRecipes = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState();

    // 🛠️ Confirmation Modal States
    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

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

    // 🛠️ Trigger Confirmation Modal instead of direct delete
    const handleDeleteClick = (recipeId) => {
        setRecipeToDelete(recipeId);
        setShowConfirmModal(true);
    };

    // 🛠️ Actual Delete execution after confirmation
    const confirmAndExecuteDelete = async () => {
        if (recipeToDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/recipes/${recipeToDelete}`, { withCredentials: true });
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