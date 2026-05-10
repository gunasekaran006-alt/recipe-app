import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import AddRecipeModal from '../components/AddRecipeModal';
import { getRecipes } from '../services/api';

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editRecipe, setEditRecipe] = useState(null); // State to store recipe being edited
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

        // Listen for the custom event emitted by Navbar to open the modal
        const handleOpenModal = () => {
            setEditRecipe(null); // Ensure we are in "Add Mode" when opened from navbar
            setShowAddModal(true);
        };

        window.addEventListener("openAddRecipeModal", handleOpenModal);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("openAddRecipeModal", handleOpenModal);
        };
    }, []);

    // Filter recipes based on search input and category selection
    const filteredRecipes = recipes.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase())
    );

    // Handles both Add and Update actions dynamically
    const handleAddNewRecipe = (recipeData) => {
        if (editRecipe) {
            // EDIT MODE: Update existing recipe in state
            const updatedRecipes = recipes.map(recipe => 
                recipe.id === recipeData.id ? recipeData : recipe
            );
            setRecipes(updatedRecipes);
            setEditRecipe(null);
            alert("Recipe Updated Successfully!");
        } else {
            // ADD MODE: Push new recipe to state
            setRecipes([recipeData, ...recipes]);
            alert("New Recipe Added Successfully!");
        }
        setShowAddModal(false);
    };

    // DELETE FUNCTION: Delete recipe from local state
    const handleDeleteRecipe = (recipeId) => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
            setRecipes(updatedRecipes);
            setSelectedRecipe(null);
            alert("Recipe Deleted Successfully!");
        }
    };

    // EDIT FUNCTION: Prepares form in Edit Mode and triggers modal
    const handleEditRecipe = (recipe) => {
        setEditRecipe(recipe); // Store active recipe to edit
        setSelectedRecipe(null); // Close active view modal
        setShowAddModal(true); // Open form modal
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Navbar />

            <div className="flex-grow-1">
                {/* Hero Section with Integrated Search & Filters */}
                <div className="text-center pt-5 pb-4 bg-white mb-4 shadow-sm" style={{ borderRadius: '0 0 50px 50px' }}>
                    
                    {/* Title & Search Bar inside Container (W: 800px) */}
                    <div className="container" style={{ maxWidth: '800px' }}>
                        <h1 className="fw-bold text-primary display-4">Discover Delicious Recipes</h1>
                        <p className="text-muted fs-5 mb-4">Find the best recipes for your favorite dishes</p>

                        {/* Search Bar */}
                        <div className="mb-4 px-3">
                            <SearchBar search={search} setSearch={setSearch} />
                        </div>
                    </div>

                    {/* FIXED: Smooth Horizontal Scroll Container for Categories with Custom Visible Scrollbar */}
                    <div className="w-100 mb-4 px-3">
                        <div 
                            className="d-flex align-items-center justify-content-start justify-content-md-center gap-2 overflow-x-auto custom-scrollbar" 
                            style={{ 
                                whiteSpace: 'nowrap', 
                                WebkitOverflowScrolling: 'touch', // Smooth momentum scrolling for iOS Devices
                                paddingBottom: '12px' // Gives breathing room for the custom scrollbar
                            }}
                        >
                            {/* Custom CSS to style the scrollbar beautifully on Laptop/Desktop */}
                            <style>{`
                                .custom-scrollbar::-webkit-scrollbar {
                                    height: 5px; /* Height of the horizontal scrollbar */
                                }
                                .custom-scrollbar::-webkit-scrollbar-track {
                                    background: #f1f1f1; /* Color of the scrollbar track */
                                    border-radius: 10px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb {
                                    background: #0d6efd; /* Theme Primary color for the scroll thumb */
                                    border-radius: 10px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                    background: #0b5ed7; /* Darker blue on hover */
                                }
                            `}</style>

                            {['All', 'Veg', 'Non-Veg', 'Italian', 'South Indian', 'Chinese', 'Dessert', 'Fast Food'].map(cat => (
                                <button
                                    key={cat}
                                    className={`btn btn-sm rounded-pill px-4 fw-semibold shadow-sm ${search === cat || (cat === 'All' && search === "") ? 'btn-primary' : 'btn-outline-primary bg-white text-dark'}`}
                                    style={{ flexShrink: 0 }} // Keeps buttons from squishing or resizing
                                    onClick={() => cat === 'All' ? setSearch("") : setSearch(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats Panel */}
                    <div className="row justify-content-center mt-3 g-3 px-3 border-top pt-3 mx-auto" style={{ maxWidth: '900px' }}>
                        {[{ label: 'Recipes', val: '1.2K+' }, { label: 'Active Cooks', val: '5K+' }, { label: 'Reviews', val: '10K+' }].map((item, i) => (
                            <div className="col-md-2 col-4 border-end" key={i}>
                                <h4 className="fw-bold text-primary mb-0">{item.val}</h4>
                                <small className="text-muted fw-semibold">{item.label}</small>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container py-2">
                    {/* Featured Section */}
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

                    {/* Trending Section */}
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
                        <button className="btn btn-light rounded-pill px-5 fw-bold text-primary" onClick={() => setShowAddModal(true)}>Get Started</button>
                    </div>
                </div>
            </div>

            {/* Selected Recipe Modal */}
            {selectedRecipe && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: '1050' }}>
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '25px', overflow: 'hidden', maxHeight: '92vh' }}>
                            {/* Close Button overlaying the layout */}
                            <div className="modal-header border-0 pb-0 position-absolute end-0 top-0" style={{ zIndex: '10' }}>
                                <button className="btn-close bg-white rounded-circle p-2 m-2 shadow-sm" onClick={() => setSelectedRecipe(null)}></button>
                            </div>
                            
                            <div className="modal-body p-0">
                                <div className="row g-0 align-items-stretch">
                                    
                                    {/* Left Side: Recipe Image Container */}
                                    <div className="col-lg-7 d-flex">
                                        <img 
                                            src={selectedRecipe.image} 
                                            alt={selectedRecipe.name}
                                            className="w-100" 
                                            style={{ 
                                                objectFit: 'cover', 
                                                objectPosition: 'center', 
                                                minHeight: '450px' 
                                            }} 
                                        />
                                    </div>
                                    
                                    {/* Right Side: Recipe Details with Smooth Internal Scroll */}
                                    <div 
                                        className="col-lg-5 p-4 p-md-5 bg-white d-flex flex-column justify-content-between" 
                                        style={{ 
                                            maxHeight: '92vh', 
                                            overflowY: 'auto',
                                            scrollbarWidth: 'thin'
                                        }}
                                    >
                                        <div>
                                            {/* Category Tag */}
                                            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3 fs-8 fw-bold text-uppercase tracking-wider">
                                                🏷️ {selectedRecipe.category}
                                            </span>
                                            
                                            {/* Recipe Name */}
                                            <h2 className="fw-extrabold text-dark mb-2 fs-2 lh-sm">{selectedRecipe.name}</h2>
                                            
                                            {/* Author and Reviews */}
                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <span className="text-muted small">By <strong className="text-dark">{selectedRecipe.author || 'Chef'}</strong></span>
                                                <span className="text-muted">•</span>
                                                <span className="text-warning small">⭐ {selectedRecipe.rating ? selectedRecipe.rating + '.0' : '0.0'} ({selectedRecipe.reviews || 0} reviews)</span>
                                            </div>

                                            {/* Short Description */}
                                            <p className="text-secondary small mb-4 lh-base">{selectedRecipe.description}</p>

                                            {/* Cook Time & Servings Balanced Cards */}
                                            <div className="row g-2 mb-4">
                                                <div className="col-6">
                                                    <div className="bg-light p-3 rounded-3 border border-light-subtle text-center">
                                                        <span className="d-block text-muted small fw-semibold">⏱️ Cook Time</span>
                                                        <span className="text-dark fw-bold">{selectedRecipe.time || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="bg-light p-3 rounded-3 border border-light-subtle text-center">
                                                        <span className="d-block text-muted small fw-semibold">👥 Servings</span>
                                                        <span className="text-dark fw-bold">{selectedRecipe.servings || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Nutrition Facts Section */}
                                            <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                                                🍏 Nutrition Facts <small className="text-muted fw-normal">(Per Serving)</small>
                                            </h6>
                                            <div className="row g-2 mb-4">
                                                <div className="col-3">
                                                    <div className="p-2 rounded-3 text-center" style={{ backgroundColor: '#fff5f5', border: '1px solid #ffe3e3' }}>
                                                        <small className="text-danger d-block fw-bold" style={{ fontSize: '10px' }}>CALORIES</small>
                                                        <strong className="text-danger" style={{ fontSize: '13px' }}>{selectedRecipe.nutrition ? selectedRecipe.nutrition.calories : '280 kcal'}</strong>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="p-2 rounded-3 text-center" style={{ backgroundColor: '#f0fdf4', border: '1px solid #dcfce7' }}>
                                                        <small className="text-success d-block fw-bold" style={{ fontSize: '10px' }}>PROTEIN</small>
                                                        <strong className="text-success" style={{ fontSize: '13px' }}>{selectedRecipe.nutrition ? selectedRecipe.nutrition.protein : '12g'}</strong>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="p-2 rounded-3 text-center" style={{ backgroundColor: '#fefce8', border: '1px solid #fef08a' }}>
                                                        <small className="text-warning-dark d-block fw-bold" style={{ fontSize: '10px', color: '#856404' }}>CARBS</small>
                                                        <strong style={{ fontSize: '13px', color: '#856404' }}>{selectedRecipe.nutrition ? selectedRecipe.nutrition.carbs : '35g'}</strong>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="p-2 rounded-3 text-center" style={{ backgroundColor: '#f0f9ff', border: '1px solid #e0f2fe' }}>
                                                        <small className="text-info d-block fw-bold" style={{ fontSize: '10px' }}>FAT</small>
                                                        <strong className="text-info" style={{ fontSize: '13px' }}>{selectedRecipe.nutrition ? selectedRecipe.nutrition.fat : '8g'}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Ingredients Section */}
                                            <h6 className="fw-bold text-dark mb-3">🛒 Ingredients:</h6>
                                            <ul className="list-unstyled mb-4">
                                                {selectedRecipe.ingredients && Array.isArray(selectedRecipe.ingredients) ? (
                                                    selectedRecipe.ingredients.map((ing, i) => (
                                                        <li key={i} className="d-flex align-items-center gap-2 mb-2 text-secondary small">
                                                            <span className="text-success fw-bold">✔️</span> {ing}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-muted small">No ingredients listed.</li>
                                                )}
                                            </ul>

                                            {/* Instructions Box */}
                                            <h6 className="fw-bold text-dark mb-3">🍳 Step-by-Step Instructions:</h6>
                                            <div className="bg-light p-3 rounded-3 border-start border-primary border-4 mb-4">
                                                <p className="text-secondary small lh-relaxed mb-0" style={{ whiteSpace: 'pre-line' }}>
                                                    {selectedRecipe.instructions}
                                                </p>
                                            </div>

                                            {/* Edit & Delete Action Buttons */}
                                            <div className="d-flex gap-2 pt-3 border-top mt-4">
                                                <button 
                                                    className="btn btn-outline-secondary flex-grow-1 rounded-pill fw-bold py-2 btn-sm"
                                                    onClick={() => handleEditRecipe(selectedRecipe)}
                                                >
                                                    ✏️ Edit Recipe
                                                </button>
                                                <button 
                                                    className="btn btn-danger flex-grow-1 rounded-pill fw-bold py-2 btn-sm"
                                                    onClick={() => handleDeleteRecipe(selectedRecipe.id)}
                                                >
                                                    🗑️ Delete Recipe
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Render Add Recipe Modal */}
            <AddRecipeModal 
                show={showAddModal} 
                onClose={() => {
                    setShowAddModal(false);
                    setEditRecipe(null);
                }} 
                onAddRecipe={handleAddNewRecipe} 
                editRecipe={editRecipe}
            />
        </div>
    );
}

export default Home;