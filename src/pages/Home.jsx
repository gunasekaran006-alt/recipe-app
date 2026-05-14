import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import HeroSection from '../components/HeroSection';
import RecipeDetailModal from '../components/RecipeDetailModal';
// FIXED: Imported deleteRecipe from api.js
import { getRecipes, deleteRecipe } from '../services/api';

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState(null);
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
            setRecipes(data.reverse());
        });
    }, []);

    const filteredRecipes = recipes.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase())
    );

    // FIXED: Made function async to call the database DELETE API
    const handleDeleteRecipe = async (recipeId) => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            try {
                // 1. Delete permanently from db.json
                await deleteRecipe(recipeId);
                
                // 2. Remove from React local state so UI updates instantly
                const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
                setRecipes(updatedRecipes);
                setSelectedRecipe(null); // Close the modal
                
                alert("Recipe Deleted Successfully from Database!");
            } catch (error) {
                alert("Failed to delete recipe from database!");
                console.error(error);
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
        <div className="bg-light min-vh-100 d-flex flex-column">
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
                                            key={recipe.id}
                                            recipe={recipe}
                                            setSelectedRecipe={setSelectedRecipe}
                                            isFavorite={favorites.includes(String(recipe.id))}
                                            onFavoriteToggle={toggleFavorite}
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
                                                key={recipe.id}
                                                recipe={recipe}
                                                setSelectedRecipe={setSelectedRecipe}
                                                isFavorite={favorites.includes(String(recipe.id))}
                                                onFavoriteToggle={toggleFavorite}
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
                                                key={recipe.id}
                                                recipe={recipe}
                                                setSelectedRecipe={setSelectedRecipe}
                                                isFavorite={favorites.includes(String(recipe.id))}
                                                onFavoriteToggle={toggleFavorite}
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
                                                key={recipe.id}
                                                recipe={recipe}
                                                setSelectedRecipe={setSelectedRecipe}
                                                isFavorite={favorites.includes(String(recipe.id))}
                                                onFavoriteToggle={toggleFavorite}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

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
        </div>
    );
}

export default Home;