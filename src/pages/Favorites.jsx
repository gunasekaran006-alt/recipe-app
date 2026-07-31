import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { getRecipes } from '../services/api';
import API from '../services/api'; // 👈 1. Import API instead of axios

function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();

  useEffect(() => {
    const fetchFavoritesAndRecipes = async () => {
      try {
        const recipeData = await getRecipes();
        const allRecipes = Array.isArray(recipeData) ? recipeData : (recipeData.recipes || recipeData.data || []);
        setRecipes(allRecipes);

        // 🛠️ 2. Use API instance (No localhost hardcoding)
        const profileRes = await API.get('/auth/me');

        if (profileRes.user && profileRes.user.favorites) {
          const dbFavorites = profileRes.user.favorites.map(String);
          setFavorites(dbFavorites);

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

  const favoriteRecipes = recipes.filter(recipe =>
    favorites.includes(String(recipe._id))
  );

  const toggleFavorite = async (recipeId) => {
    const targetId = String(recipeId);
    try {
      // 🛠️ 3. Use API instance for put request
      const response = await API.put('/recipes/favorite', { recipeId: targetId });

      if (response.success) {
        const updatedFavorites = response.favorites.map(String);
        setFavorites(updatedFavorites);

        const savedUser = JSON.parse(sessionStorage.getItem('user'));
        if (savedUser) {
          savedUser.favorites = updatedFavorites;
          sessionStorage.setItem('user', JSON.stringify(savedUser));
        }
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