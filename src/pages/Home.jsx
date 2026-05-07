import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { getRecipes } from '../services/api';

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        getRecipes().then(data => setRecipes(data));
    }, []);

    const filteredRecipes = recipes.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-light min-vh-100">
            <Navbar />

            {/* Hero Section */}
            <div className="text-center py-5 bg-white mb-4 shadow-sm" style={{ borderRadius: '0 0 50px 50px' }}>
                <h1 className="fw-bold text-primary display-4">Discover Delicious Recipes</h1>
                <p className="text-muted fs-5">Find the best recipes for your favorite dishes</p>
            </div>

            <div className="container py-2">
                {/* Modern SearchBar Component */}
                <SearchBar search={search} setSearch={setSearch} />

                {/* Category Filters */}
                <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
                    {['All', 'Veg', 'Non-Veg', 'Italian', 'South Indian', 'Chinese', 'Dessert'].map(cat => (
                        <button
                            key={cat}
                            className={`btn btn-sm rounded-pill px-3 ${search === cat || (cat === 'All' && search === "") ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => cat === 'All' ? setSearch("") : setSearch(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Recipe Grid using RecipeCard component */}
                <div className="row">
                    {filteredRecipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} setSelectedRecipe={setSelectedRecipe} />
                    ))}
                </div>

                {/* Full Details Modal Window */}
                {selectedRecipe && (
                    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content border-0" style={{ borderRadius: '25px' }}>
                                <div className="modal-header border-0 pb-0">
                                    <button className="btn-close shadow-none" onClick={() => setSelectedRecipe(null)}></button>
                                </div>
                                <div className="modal-body p-4 pt-0">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <img src={selectedRecipe.image} className="img-fluid shadow-sm" style={{ borderRadius: '15px', width: '100%' }} alt={selectedRecipe.name} />
                                        </div>
                                        <div className="col-md-7">
                                            <h2 className="fw-bold text-primary mb-3">{selectedRecipe.name}</h2>
                                            <h5 className="fw-bold mb-2">🥗 Ingredients:</h5>
                                            <ul className="text-muted">
                                                {selectedRecipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
                                            </ul>
                                            <h5 className="fw-bold mt-4 mb-2">👨‍🍳 Cooking Instructions:</h5>
                                            <p className="text-muted bg-light p-3 rounded" style={{ borderLeft: '5px solid #0d6efd' }}>
                                                {selectedRecipe.instructions}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;