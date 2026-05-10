import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import HeroSection from '../components/HeroSection';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { getRecipes } from '../services/api';

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('recipe_favorites');
        return saved ? JSON.parse(saved).map(String) : [];
    });

    // Toggle recipe in and out of favorites list with safe string conversion
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
        getRecipes().then(data => setRecipes(data));
    }, []);

    // Filter recipes based on search input and category selection
    const filteredRecipes = recipes.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase())
    );

    // DELETE FUNCTION: Delete recipe from local state
    const handleDeleteRecipe = (recipeId) => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
            setRecipes(updatedRecipes);
            setSelectedRecipe(null);
            alert("Recipe Deleted Successfully!");
        }
    };

    // EDIT FUNCTION: Prepares form in Edit Mode by dispatching a custom event to App.jsx
    const handleEditRecipe = (recipe) => {
        setSelectedRecipe(null); // Close view modal
        // Dispatch custom event with recipe data to let global App.jsx handle the edit form
        const event = new CustomEvent("openEditRecipeModal", { detail: recipe });
        window.dispatchEvent(event);
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Navbar />

            <div className="flex-grow-1">
                {/* Hero Section */}
                <HeroSection search={search} setSearch={setSearch} />

                <div className="container py-2">
                    {/* Featured Recipes */}
                    <div className="my-5">
                        <h3 className="fw-bold text-dark border-start border-primary border-4 ps-3 mb-4">Featured Recipes</h3>
                        <div className="row">
                            {filteredRecipes.slice(0, 3).map(recipe => (
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

                    {/* Trending Recipes */}
                    <div className="my-5">
                        <h3 className="fw-bold text-dark border-start border-primary border-4 ps-3 mb-4">Trending Recipes</h3>
                        <div className="row">
                            {filteredRecipes.slice(3, 6).map(recipe => (
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

                    {/* Promotional Banner */}
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

            {/* Selected Recipe Modal */}
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