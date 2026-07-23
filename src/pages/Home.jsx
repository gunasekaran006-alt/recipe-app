import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import HeroSection from '../components/HeroSection';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { getRecipes, deleteRecipe } from '../services/api';
import { toast } from 'react-toastify';

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('recipe_favorites');
        return saved ? JSON.parse(saved).map(String) : [];
    });

    const toggleFavorite = (recipeId) => {
        const targetId = String(recipeId);
        let updatedFavorites;
        if (favorites.includes(targetId)) {
            updatedFavorites = favorites.filter(id => id !== targetId);
        } else {
            updatedFavorites = [...favorites, targetId];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('recipe_favorites', JSON.stringify(updatedFavorites));
    };

    useEffect(() => {
        getRecipes().then(data => {
            if (data && Array.isArray(data)) {
                setRecipes(data.reverse());
            } else if (data && data.data && Array.isArray(data.data)) {
                setRecipes(data.data.reverse());
            } else {
                setRecipes([]);
            }
        }).catch(err => console.error("API Error:", err));
    }, []);

    const filteredRecipes = recipes.filter(recipe => {
        const recipeName = recipe?.name?.toLowerCase() || "";
        const recipeCategory = recipe?.category?.toLowerCase() || "";
        const currentSearch = search?.toLowerCase() || "";

        const appCategories = ["veg", "non-veg", "italian", "south indian", "chinese", "dessert", "fast food"];

        if (appCategories.includes(currentSearch)) {
            return recipeCategory === currentSearch;
        }

        return recipeName.includes(currentSearch) || recipeCategory.includes(currentSearch);
    });

    const handleDeleteRecipe = (recipeId) => {
        setRecipeToDelete(recipeId);
        setShowConfirmModal(true);
    };

    const confirmAndExecuteDelete = async () => {
        if (recipeToDelete) {
            try {
                await deleteRecipe(recipeToDelete);
                const updatedRecipes = recipes.filter(r => r._id !== String(recipeToDelete));
                setRecipes(updatedRecipes);
                toast.success("Recipe deleted successfully! 🗑️");
            } catch (error) {
                toast.error("Failed to delete recipe. Maybe you are not logged in!");
                console.error("Delete Error:", error);
            } finally {
                setShowConfirmModal(false);
                setRecipeToDelete(null);
            }
        }
    };

    const handleEditRecipe = (recipe) => {
        setSelectedRecipe(null);
        const event = new CustomEvent("openEditRecipeModal", { detail: recipe });
        window.dispatchEvent(event);
    };

    const isSearching = search !== "" && search !== "All";

    const trendingRecipes = [...recipes]
        .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
        .slice(0, 3);

    return (
        <div className="bg-light min-vh-100 d-flex flex-column position-relative">
            <Navbar />

            <div className="flex-grow-1">
                <HeroSection search={search} setSearch={setSearch} />

                <div className="container py-4">
                    {isSearching ? (
                        <div className="mb-5">
                            <div className="d-flex justify-content-between align-items-center border-start border-primary border-4 ps-3 mb-4">
                                <h3 className="fw-bold text-dark mb-0">{search} Recipes</h3>
                                <span className="badge bg-primary rounded-pill px-3 py-2 fs-6">
                                    {filteredRecipes.length} Found
                                </span>
                            </div>

                            {filteredRecipes.length === 0 ? (
                                <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                                    <span className="display-1">🍽️</span>
                                    <h4 className="fw-bold mt-3 text-dark">No Recipes Found</h4>
                                    <p className="text-muted">Try searching for a different name.</p>
                                </div>
                            ) : (
                                <div className="row">
                                    {filteredRecipes.map(recipe => (
                                        <RecipeCard
                                            key={recipe._id}
                                            recipe={recipe}
                                            setSelectedRecipe={setSelectedRecipe}
                                            isFavorite={favorites.includes(String(recipe._id))}
                                            onFavoriteToggle={toggleFavorite}
                                            onDelete={handleDeleteRecipe}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {recipes.length > 0 && (
                                <div className="mb-5">
                                    <h3 className="fw-bold text-dark border-start border-success border-4 ps-3 mb-4">
                                        🆕 New Arrivals
                                    </h3>
                                    <div className="row">
                                        {recipes.slice(0, 3).map(recipe => (
                                            <RecipeCard
                                                key={recipe._id}
                                                recipe={recipe}
                                                setSelectedRecipe={setSelectedRecipe}
                                                isFavorite={favorites.includes(String(recipe._id))}
                                                onFavoriteToggle={toggleFavorite}
                                                onDelete={handleDeleteRecipe}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {trendingRecipes.length > 0 && (
                                <div className="mb-5">
                                    <h3 className="fw-bold text-dark border-start border-warning border-4 ps-3 mb-4">
                                        🔥 Trending Recipes
                                    </h3>
                                    <div className="row">
                                        {trendingRecipes.map(recipe => (
                                            <RecipeCard
                                                key={recipe._id}
                                                recipe={recipe}
                                                setSelectedRecipe={setSelectedRecipe}
                                                isFavorite={favorites.includes(String(recipe._id))}
                                                onFavoriteToggle={toggleFavorite}
                                                onDelete={handleDeleteRecipe}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {recipes.length > 0 && (
                                <div className="mb-5 border-top pt-5">
                                    <div className="d-flex justify-content-between align-items-center border-start border-primary border-4 ps-3 mb-4">
                                        <h3 className="fw-bold text-dark mb-0">🍽️ Explore All Recipes</h3>
                                        <span className="badge bg-secondary rounded-pill px-3 py-2 fs-6">
                                            {recipes.length} Total
                                        </span>
                                    </div>
                                    <div className="row">
                                        {recipes.map(recipe => (
                                            <RecipeCard
                                                key={recipe._id}
                                                recipe={recipe}
                                                setSelectedRecipe={setSelectedRecipe}
                                                isFavorite={favorites.includes(String(recipe._id))}
                                                onFavoriteToggle={toggleFavorite}
                                                onDelete={handleDeleteRecipe}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 🆕 Get Started Call-to-Action Banner */}
                    <div className="p-5 bg-primary text-white text-center rounded-4 shadow-lg my-5">
                        <h2 className="fw-bold mb-3">Ready to Share Your Own Recipe?</h2>
                        <p className="mb-4 opacity-75">Upload your dishes and inspire food lovers across the world.</p>
                        <button
                            className="btn btn-light rounded-pill px-5 fw-bold text-primary"
                            onClick={() => {
                                const event = new CustomEvent("openAddRecipeModal");
                                window.dispatchEvent(event);
                            }}
                        >
                            Get Started
                        </button>
                    </div>

                </div>
            </div>

            <RecipeDetailModal
                selectedRecipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
            />

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
}

export default Home;