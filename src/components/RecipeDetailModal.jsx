import React from 'react';

function RecipeDetailModal({ selectedRecipe, onClose, onEdit, onDelete }) {
  if (!selectedRecipe) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: '1050' }}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '25px', overflow: 'hidden', maxHeight: '92vh' }}>
          {/* Close Button overlaying the layout */}
          <div className="modal-header border-0 pb-0 position-absolute end-0 top-0" style={{ zIndex: '10' }}>
            <button className="btn-close bg-white rounded-circle p-2 m-2 shadow-sm" onClick={onClose}></button>
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
                      onClick={() => onEdit(selectedRecipe)}
                    >
                      ✏️ Edit Recipe
                    </button>
                    <button 
                      className="btn btn-danger flex-grow-1 rounded-pill fw-bold py-2 btn-sm"
                      onClick={() => onDelete(selectedRecipe.id)}
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
  );
}

export default RecipeDetailModal;