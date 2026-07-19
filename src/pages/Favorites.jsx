import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { getRecipes } from '../services/api';

function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // type:1
  // const [favorites, setFavorites] = useState(() => {
  //   const saved = sessionStorage.getItem('recipe_favorites');
  //   return saved ? JSON.parse(saved).map(String) : [];
  // });

  // type: 2
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('recipe_favorites');
    return saved ? JSON.parse(saved).map(String) : [];
  });

  useEffect(() => {
    getRecipes().then(data => setRecipes(data));
  }, []);

  // Filter only the recipes that are in the favorites list
  // const favoriteRecipes = recipes.filter(r => favorites.includes(String(r.id)));
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(String(recipe._id)));

  // Toggle favorite: Removes the recipe from the list immediately in Favorites Page
  const toggleFavorite = (recipeId) => {
    const targetId = String(recipeId);
    const updatedFavorites = favorites.filter(id => id !== targetId);
    setFavorites(updatedFavorites);

    // sessionStorage.setItem('recipe_favorites', JSON.stringify(updatedFavorites));
    localStorage.setItem('recipe_favorites', JSON.stringify(updatedFavorites));
  };

  // Dispatch custom event to App.jsx to handle Editing globally
  const handleEditRecipe = (recipe) => {
    setSelectedRecipe(null); // Close view modal
    const event = new CustomEvent("openEditRecipeModal", { detail: recipe });
    window.dispatchEvent(event);
  };

  // Simple local delete simulation or instructions
  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      alert("Recipe Deleted! (Please refresh Home page to see updated list)");
      setSelectedRecipe(null);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="container py-5 flex-grow-1">
        {/* Section Title */}
        <h2 className="fw-bold text-dark border-start border-primary border-4 ps-3 mb-4">
          ❤️ My Favorite Recipes
        </h2>

        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm my-4">
            <span className="fs-1">🍽️</span>
            <h4 className="fw-bold text-muted mt-3">No favorites added yet!</h4>
            <p className="text-secondary small">Go to Home and click the heart icon on your favorite dishes.</p>
          </div>
        ) : (
          <div className="row g-4">
            {favoriteRecipes.map(recipe => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                setSelectedRecipe={setSelectedRecipe}
                isFavorite={true} // It is always true in Favorites page
                onFavoriteToggle={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reusable Detail Modal */}
      <RecipeDetailModal
        selectedRecipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onEdit={handleEditRecipe}
        onDelete={handleDeleteRecipe}
      />
    </div>
  );
}

export default Favorites;