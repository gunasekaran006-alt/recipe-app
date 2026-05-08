import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer'; 
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
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Navbar />

            <div className="flex-grow-1">
                {/* Hero Section */}
                <div className="text-center py-5 bg-white mb-4 shadow-sm" style={{ borderRadius: '0 0 50px 50px' }}>
                    <h1 className="fw-bold text-primary display-4">Delicious Recipes</h1>
                    <p className="text-muted">Find unique tastes from our expert chefs.</p>
                </div>

                <div className="container">
                    <div className="mb-5">
                        <SearchBar search={search} setSearch={setSearch} />
                    </div>

                    {/* Filter Section */}
                    <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
                        {['All', 'Veg', 'Non-Veg', 'South Indian', 'Italian'].map(cat => (
                            <button
                                key={cat}
                                className={`btn btn-sm rounded-pill px-4 fw-bold ${search === cat || (cat === 'All' && search === "") ? 'btn-primary' : 'btn-outline-primary bg-white'}`}
                                onClick={() => cat === 'All' ? setSearch("") : setSearch(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="row">
                        {filteredRecipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} setSelectedRecipe={setSelectedRecipe} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer added only here to avoid duplication */}
            <Footer />

            {/* Modal remains the same */}
            {selectedRecipe && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0" style={{ borderRadius: '20px' }}>
                            <div className="modal-header border-0">
                                <button className="btn-close" onClick={() => setSelectedRecipe(null)}></button>
                            </div>
                            <div className="modal-body p-4 pt-0">
                                <div className="row">
                                    <div className="col-md-5">
                                        <img src={selectedRecipe.image} className="img-fluid rounded" alt={selectedRecipe.name} />
                                    </div>
                                    <div className="col-md-7">
                                        <h2 className="fw-bold text-primary">{selectedRecipe.name}</h2>
                                        <p className="text-muted">Cook Time: {selectedRecipe.time || '25 mins'}</p>
                                        <h5 className="fw-bold">Ingredients:</h5>
                                        <ul className="text-muted small">
                                            {selectedRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                                        </ul>
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