import React from 'react';
import SearchBar from './SearchBar';

function HeroSection({ search, setSearch }) {
  return (
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

      {/* Category Filters in a Single Line with Touch/Horizontal Scroll */}
      <div className="w-100 mb-4 px-3">
        <div 
          className="d-flex align-items-center justify-content-start justify-content-md-center gap-2 overflow-x-auto custom-scrollbar" 
          style={{ 
            whiteSpace: 'nowrap', 
            WebkitOverflowScrolling: 'touch', 
            paddingBottom: '12px' 
          }}
        >
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              height: 5px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #0d6efd;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #0b5ed7;
            }
          `}</style>

          {['All', 'Veg', 'Non-Veg', 'Italian', 'South Indian', 'Chinese', 'Dessert', 'Fast Food'].map(cat => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill px-4 fw-semibold shadow-sm ${search === cat || (cat === 'All' && search === "") ? 'btn-primary' : 'btn-outline-primary bg-white text-dark'}`}
              style={{ flexShrink: 0 }}
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
  );
}

export default HeroSection;