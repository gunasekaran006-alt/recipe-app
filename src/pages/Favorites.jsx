import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { getRecipes } from '../services/api';
import axios from 'axios';

function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();

  // 1. Fetching all recipes and the user's favorite IDs from the database
  useEffect(() => {
    const fetchFavoritesAndRecipes = async () => {
      try {
        // 1. Fetching all recipes
        const recipeData = await getRecipes();
        const allRecipes = Array.isArray(recipeData) ? recipeData : (recipeData.recipes || recipeData.data || []);
        setRecipes(allRecipes);

        // 2. 🛠️ Fetching the user's latest favorite IDs directly from the database (Backend Profile API)
        const profileRes = await axios.get('http://localhost:8080/api/auth/me', { withCredentials: true });

        if (profileRes.data && profileRes.data.user && profileRes.data.user.favorites) {
          const dbFavorites = profileRes.data.user.favorites.map(String);
          setFavorites(dbFavorites);

          // Updating session storage as well
          const currentUser = JSON.parse(sessionStorage.getItem('user')) || {};
          currentUser.favorites = dbFavorites;
          sessionStorage.setItem('user', JSON.stringify(currentUser));
        }
      } catch (error) {
        console.error("Error fetching favorites data:", error);
      }
    };

    fetchFavoritesAndRecipes();
  }, []);

  // Filtering only the recipes present in the favorites list
  const favoriteRecipes = recipes.filter(recipe =>
    favorites.includes(String(recipe._id))
  );

  // Toggling favorites (Add / Remove)
  const toggleFavorite = async (recipeId) => {
    const targetId = String(recipeId);
    try {
      const response = await axios.put(
        'http://localhost:8080/api/recipes/favorite',
        { recipeId: targetId },
        { withCredentials: true }
      );

      if (response.data.success) {
        const updatedFavorites = response.data.favorites.map(String);
        setFavorites(updatedFavorites);

        // Updating the SessionStorage 
        const savedUser = JSON.parse(sessionStorage.getItem('user'));
        if (savedUser) {
          savedUser.favorites = updatedFavorites;
          sessionStorage.setItem('user', JSON.stringify(savedUser));
        }
        localStorage.setItem('recipe_favorites', JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error("Toggle Favorite Error:", error);
    }
  };

  const handleEditRecipe = (recipe) => {
    setSelectedRecipe(null);
    const event = new CustomEvent("openEditRecipeModal", { detail: recipe });
    window.dispatchEvent(event);
  };

  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      alert("Recipe Deleted!");
      setSelectedRecipe(null);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="container py-5 flex-grow-1">
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
                isFavorite={true}
                onFavoriteToggle={toggleFavorite}
              />
            ))}
          </div>
        )}
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

export default Favorites;