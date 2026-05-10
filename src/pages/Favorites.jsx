import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../services/api';

function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load recipes and favorites from localStorage on component mount
  useEffect(() => {
    getRecipes().then(data => setRecipes(data));
    
    const saved = localStorage.getItem('recipe_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved).map(String));
      } catch (e) {
        setFavorites([]);
      }
    }
  }, []);

  // Filter recipes that are in the favorites list
  const favoriteRecipes = recipes.filter(recipe => 
    favorites.includes(String(recipe.id))
  );

  // Toggle favorite to remove items directly from this page
  const toggleFavorite = (recipeId) => {
    const targetId = String(recipeId);
    const updatedFavorites = favorites.filter(id => id !== targetId);
    setFavorites(updatedFavorites);
    localStorage.setItem('recipe_favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="container py-5 flex-grow-1">
        <h2 className="fw-bold text-dark border-start border-primary border-4 ps-3 mb-4">
          Your Favorite Recipes
        </h2>
        
        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm">
            <span className="display-1">❤️</span>
            <h4 className="fw-bold mt-3 text-dark">No favorites added yet.</h4>
            <p className="text-muted">Explore home page and click heart icon to save recipes.</p>
          </div>
        ) : (
          <div className="row">
            {favoriteRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                setSelectedRecipe={() => {}} 
                isFavorite={true}
                onFavoriteToggle={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;