import React from 'react';

function RecipeCard({ recipe, setSelectedRecipe }) {
  // Logic to show stars based on the actual rating from data
  const renderStars = (rating) => {
    const stars = [];
    const starValue = rating || 5; 
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.round(starValue) ? "text-warning" : "text-muted"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 shadow-sm border-0 bg-white" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        {/* Recipe Image & Difficulty Badge */}
        <div className="position-relative">
          <img src={recipe.image} className="card-img-top" style={{ height: '220px', objectFit: 'cover' }} alt={recipe.name} />
          <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
            <span className="badge bg-white text-dark shadow-sm rounded-pill opacity-90 px-3 py-2 small fw-normal">
              {recipe.difficulty || 'Medium'}
            </span>
          </div>
        </div>
        
        <div className="card-body p-3">
          {/* Category Tag in Orange as per sample */}
          <span className="text-uppercase fw-bold" style={{ color: '#E67E22', fontSize: '11px', letterSpacing: '1px' }}>
            {recipe.category}
          </span>
          
          <h5 className="card-title fw-bold my-1 text-dark" style={{ fontSize: '1.2rem' }}>{recipe.name}</h5>
          
          <p className="card-text text-muted small mb-3" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {recipe.description || 'A delicious and authentic dish prepared with fresh ingredients.'}
          </p>

          {/* Time and Servings - Distinct per recipe */}
          <div className="d-flex gap-4 text-muted mb-3 pb-2" style={{ fontSize: '13px' }}>
            <span><i className="bi bi-clock me-1"></i> 🕒 {recipe.time || '25 min'}</span>
            <span><i className="bi bi-people me-1"></i> 👥 {recipe.servings || '4 servings'}</span>
          </div>

          {/* Author and Rating Count - Bottom Section */}
          <div className="d-flex justify-content-between align-items-center pt-3 border-top">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center fw-bold text-primary" style={{ width: '30px', height: '30px', fontSize: '12px', border: '1px solid #eee' }}>
                {recipe.author ? recipe.author[0] : 'C'}
              </div>
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>{recipe.author || 'Chef'}</span>
            </div>
            <div className="small">
              {renderStars(recipe.rating)}
              <span className="text-muted ms-1" style={{ fontSize: '12px' }}>({recipe.reviews || '100'})</span>
            </div>
          </div>

          <button className="btn btn-primary w-100 mt-3 rounded-pill fw-bold py-2 shadow-sm" onClick={() => setSelectedRecipe(recipe)}>
            View Recipe Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;