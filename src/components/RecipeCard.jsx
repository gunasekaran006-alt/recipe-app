function RecipeCard({ recipe, setSelectedRecipe }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div 
        className="card h-100 shadow-sm border-0" 
        style={{ 
          borderRadius: '15px', 
          transition: 'transform 0.3s ease',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <img src={recipe.image} className="card-img-top" style={{height: '220px', objectFit: 'cover'}} alt={recipe.name} />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">{recipe.category}</span>
          </div>
          <h5 className="card-title fw-bold">{recipe.name}</h5>
          <button className="btn btn-primary w-100 mt-3 shadow-sm" onClick={() => setSelectedRecipe(recipe)}>
            View Full Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;