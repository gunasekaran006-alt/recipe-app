import React from 'react';

function RecipeCard({ recipe, setSelectedRecipe }) {
  // Logic to render stars based on recipe.rating dynamically
  const renderStars = (rating) => {
    const stars = [];
    const score = rating || 0; 
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.round(score) ? "text-warning" : "text-muted"} style={{ fontSize: '13px' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div 
        className="card h-100 shadow-sm border-0 bg-white" 
        style={{ borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.2s' }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        {/* Recipe Image & Difficulty Badge on Top Right */}
        <div className="position-relative">
          <img src={recipe.image} className="card-img-top" style={{ height: '220px', objectFit: 'cover' }} alt={recipe.name} />
          {recipe.difficulty && (
            <span className="badge bg-white text-dark shadow-sm rounded-pill position-absolute top-0 end-0 m-3 px-3 py-1.5 fw-semibold fs-7 opacity-90">
              {recipe.difficulty}
            </span>
          )}
        </div>
        
        <div className="card-body p-3 d-flex flex-column justify-content-between">
          <div>
            {/* Category Tag */}
            <span className="text-primary fw-bold small text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
              {recipe.category}
            </span>
            
            {/* Recipe Name */}
            <h5 className="card-title fw-bold my-1 text-dark" style={{ fontSize: '1.2rem' }}>{recipe.name}</h5>
            
            {/* Recipe Description from DB */}
            <p className="card-text text-muted small mb-3 text-truncate-2" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {recipe.description}
            </p>

            {/* Time & Servings - Directly from DB (No random values) */}
            <div className="d-flex gap-4 text-muted mb-3" style={{ fontSize: '13px' }}>
              <span>⏱️ {recipe.time || 'N/A'}</span>
              <span>👥 {recipe.servings || 'N/A'}</span>
            </div>
          </div>

          {/* Author & Ratings - Bottom Row */}
          <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '30px', height: '30px', fontSize: '12px' }}>
                {recipe.author ? recipe.author[0].toUpperCase() : 'C'}
              </div>
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>{recipe.author || 'Anonymous'}</span>
            </div>
            
            {/* Exact rating & reviews count from DB */}
            <div className="small">
              {renderStars(recipe.rating)}
              <span className="text-muted ms-1" style={{ fontSize: '12px' }}>
                {recipe.rating ? `${recipe.rating}.0` : '0.0'} ({recipe.reviews || 0})
              </span>
            </div>
          </div>

          <button className="btn btn-primary w-100 mt-3 rounded-pill fw-bold shadow-sm" onClick={() => setSelectedRecipe(recipe)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;