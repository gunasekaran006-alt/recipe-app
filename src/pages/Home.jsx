import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Full View

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  // Voice Search Logic
  const handleVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
    };
  };

  const filteredRecipes = recipes.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <div className="container py-4">
        {/* Search Bar & Voice Search */}
        <div className="input-group mb-4 shadow-sm">
          <input 
            type="text" 
            className="form-control form-control-lg" 
            placeholder="Search recipes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleVoiceSearch}>
             🎤 Voice Search
          </button>
        </div>

        {/* Recipe Grid */}
        <div className="row">
          {filteredRecipes.map(recipe => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <div className="card h-100 shadow-sm border-0" style={{borderRadius: '15px'}}>
                <img src={recipe.image} className="card-img-top" style={{height: '200px', objectFit: 'cover', borderRadius: '15px 15px 0 0'}} alt={recipe.name} />
                <div className="card-body">
                  <span className="badge bg-success mb-2">{recipe.category}</span>
                  <h5 className="card-title fw-bold">{recipe.name}</h5>
                  <button className="btn btn-outline-primary w-100 mt-2" onClick={() => setSelectedRecipe(recipe)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full View (Modal) */}
        {selectedRecipe && (
          <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0" style={{borderRadius: '20px'}}>
                <div className="modal-header border-0">
                  <h4 className="fw-bold">{selectedRecipe.name}</h4>
                  <button className="btn-close" onClick={() => setSelectedRecipe(null)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row">
                    <div className="col-md-5">
                      <img src={selectedRecipe.image} className="img-fluid rounded" alt={selectedRecipe.name} />
                    </div>
                    <div className="col-md-7">
                      <h5 className="text-primary fw-bold">Ingredients:</h5>
                      <ul>
                        {selectedRecipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
                      </ul>
                      <h5 className="text-primary fw-bold mt-3">Instructions:</h5>
                      <p>{selectedRecipe.instructions}</p>
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