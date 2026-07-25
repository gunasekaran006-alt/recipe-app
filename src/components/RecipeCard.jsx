import React, { useState } from 'react';

function RecipeCard({ recipe, setSelectedRecipe, isFavorite, onFavoriteToggle, onDelete, onEdit }) {
  const [isLoading, setIsLoading] = useState(false);

  // 1. Get the logged-in user's ID
  const currentUser = JSON.parse(sessionStorage.getItem('user'));
  const currentUserId = currentUser ? currentUser._id : null;

  // 🛠️ Crucial: Check if the recipe creator and the logged-in user are the same
  // Note: In the DB, recipe.createdBy could be an object or a string, so converting it to a string is safer. 
  const creatorId = recipe.user?._id || recipe.user || recipe.createdBy?._id || recipe.createdBy;
  const isOwner = creatorId && currentUserId && String(creatorId) === String(currentUserId);


  const handleDelete = async () => {
    setIsLoading(true);
    await onDelete(recipe._id);
    setIsLoading(false);
  };

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
        {/* Recipe Image, Favorite Button & Difficulty Badge */}
        <div className="position-relative">
          <img src={recipe.image} className="card-img-top" style={{ height: '220px', objectFit: 'cover' }} alt={recipe.name} />

          <div className="position-absolute top-0 end-0 m-3 d-flex gap-2" style={{ zIndex: '10' }}>
            <button
              className="btn btn-sm btn-light rounded-circle shadow-sm opacity-90 d-flex align-items-center justify-content-center"
              style={{ width: '35px', height: '35px', border: 'none' }}
              onClick={(e) => {
                e.stopPropagation();
                const activeId = recipe._id || recipe.id;
                if (activeId) {
                  onFavoriteToggle(activeId);
                } else {
                  console.error("Recipe ID is missing!", recipe);
                }
              }}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>

            {recipe.difficulty && (
              <span className="badge bg-white text-dark shadow-sm rounded-pill px-3 py-2 small fw-semibold opacity-90 d-flex align-items-center">
                {recipe.difficulty}
              </span>
            )}
          </div>
        </div>

        <div className="card-body p-3 d-flex flex-column justify-content-between">
          <div>
            {/* Category Tag */}
            <span className="text-primary fw-bold small text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
              {recipe.category}
            </span>

            {/* Recipe Name */}
            <h5 className="card-title fw-bold my-1 text-dark" style={{ fontSize: '1.2rem' }}>{recipe.name}</h5>

            {/* Recipe Description */}
            <p className="card-text text-muted small mb-3 text-truncate-2" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {recipe.description}
            </p>

            {/* Time & Servings */}
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

            <div className="small">
              {renderStars(recipe.rating)}
              <span className="text-muted ms-1" style={{ fontSize: '12px' }}>
                {recipe.rating ? `${recipe.rating}.0` : '0.0'} ({recipe.reviews || 0})
              </span>
            </div>
          </div>

          {/* 🛠️ Action Buttons */}
          <div className="mt-3">
            <button className="btn btn-primary w-100 rounded-pill fw-bold" onClick={() => setSelectedRecipe(recipe)}>
              View Details
            </button>

            {/* Edit/Delete buttons are shown only on the 'My Recipes' page or if the user is the owner */}
            {isOwner && onEdit && onDelete && (
              <div className="d-flex gap-2 mt-2">
                <button className="btn btn-outline-primary btn-sm w-50 rounded-pill fw-bold" onClick={() => onEdit(recipe)}>
                  Edit ✏️
                </button>
                <button
                  className="btn btn-outline-danger btn-sm w-50 rounded-pill fw-bold"
                  disabled={isLoading}
                  onClick={handleDelete}
                >
                  {isLoading ? "Deleting..." : "Delete 🗑️"}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default RecipeCard;