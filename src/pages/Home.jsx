import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { getRecipes } from '../services/api';

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [favorites, setFavorites] = useState([]);

    // Toggle recipe in and out of favorites list
    const toggleFavorite = (recipeId) => {
        if (favorites.includes(recipeId)) {
            setFavorites(favorites.filter(id => id !== recipeId));
        } else {
            setFavorites([...favorites, recipeId]);
        }
    };

    useEffect(() => {
        getRecipes().then(data => setRecipes(data));
    }, []);

    // Filter recipes based on search input and category selection
    const filteredRecipes = recipes.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Navbar />

            <div className="flex-grow-1">
                {/* Hero Section */}
                <div className="text-center py-5 bg-white mb-4 shadow-sm" style={{ borderRadius: '0 0 50px 50px' }}>
                    <h1 className="fw-bold text-primary display-4">Discover Delicious Recipes</h1>
                    <p className="text-muted fs-5">Find the best recipes for your favorite dishes</p>

                    {/* Stats Panel */}
                    <div className="row justify-content-center mt-4 g-3 px-3">
                        {[{ label: 'Recipes', val: '1.2K+' }, { label: 'Active Cooks', val: '5K+' }, { label: 'Reviews', val: '10K+' }].map((item, i) => (
                            <div className="col-md-2 col-4 border-end" key={i}>
                                <h4 className="fw-bold text-primary mb-0">{item.val}</h4>
                                <small className="text-muted fw-semibold">{item.label}</small>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container py-2">
                    {/* 1. Search Bar */}
                    <div className="mb-4">
                        <SearchBar search={search} setSearch={setSearch} />
                    </div>

                    {/* 2. Category Filters */}
                    <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
                        {['All', 'Veg', 'Non-Veg', 'Italian', 'South Indian', 'Chinese', 'Dessert', 'Fast Food'].map(cat => (
                            <button
                                key={cat}
                                className={`btn btn-sm rounded-pill px-4 fw-semibold shadow-sm ${search === cat || (cat === 'All' && search === "") ? 'btn-primary' : 'btn-outline-primary bg-white text-dark'}`}
                                onClick={() => cat === 'All' ? setSearch("") : setSearch(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* 3. Featured Section */}
                    <div className="my-5">
                        <h3 className="fw-bold text-dark border-start border-primary border-4 ps-3 mb-4">Featured Recipes</h3>
                        <div className="row">
                            {filteredRecipes.slice(0, 3).map(recipe => (
                                <RecipeCard 
                                    key={recipe.id} 
                                    recipe={recipe} 
                                    setSelectedRecipe={setSelectedRecipe}
                                    isFavorite={favorites.includes(recipe.id)}
                                    onFavoriteToggle={toggleFavorite}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 4. Trending Section */}
                    <div className="my-5">
                        <h3 className="fw-bold text-dark border-start border-primary border-4 ps-3 mb-4">Trending Recipes</h3>
                        <div className="row">
                            {filteredRecipes.slice(3, 6).map(recipe => (
                                <RecipeCard 
                                    key={recipe.id} 
                                    recipe={recipe} 
                                    setSelectedRecipe={setSelectedRecipe}
                                    isFavorite={favorites.includes(recipe.id)}
                                    onFavoriteToggle={toggleFavorite}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 5. Promotional Banner */}
                    <div className="p-5 bg-primary text-white text-center rounded-4 shadow-lg my-5">
                        <h2 className="fw-bold mb-3">Ready to Share Your Own Recipe?</h2>
                        <p className="mb-4 opacity-75">Upload your dishes and inspire food lovers across the world.</p>
                        <button className="btn btn-light rounded-pill px-5 fw-bold text-primary">Get Started</button>
                    </div>
                </div>
            </div>

            {/* Selected Recipe Modal */}
            {selectedRecipe && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: '1050' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0" style={{ borderRadius: '25px' }}>
                            <div className="modal-header border-0 pb-0">
                                <button className="btn-close shadow-none" onClick={() => setSelectedRecipe(null)}></button>
                            </div>
                            <div className="modal-body p-4 pt-0">
                                <div className="row">
                                    <div className="col-md-5">
                                        <img src={selectedRecipe.image} className="img-fluid shadow-sm" style={{ borderRadius: '15px', width: '100%', height: '280px', objectFit: 'cover' }} alt={selectedRecipe.name} />
                                    </div>
                                    <div className="col-md-7">
                                        <h2 className="fw-bold text-primary mb-3">{selectedRecipe.name}</h2>
                                        <div className="d-flex gap-3 mb-3 text-muted small fw-bold">
                                            <span>⏱️ {selectedRecipe.time || 'N/A'}</span>
                                            <span>👥 {selectedRecipe.servings || 'N/A'}</span>
                                            <span>⭐ {selectedRecipe.rating ? `${selectedRecipe.rating}.0` : '0.0'} ({selectedRecipe.reviews || 0} reviews)</span>
                                        </div>
                                        <h5 className="fw-bold mb-2">Ingredients:</h5>
                                        <ul className="text-muted small">
                                            {selectedRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                                        </ul>
                                        <h5 className="fw-bold mt-4 mb-2">Instructions:</h5>
                                        <p className="text-muted small bg-light p-3 rounded">{selectedRecipe.instructions}</p>
                                    </div>
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