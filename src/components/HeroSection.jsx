
// // STAGE:1
// import React from 'react';
// import SearchBar from './SearchBar';

// function HeroSection({ search, setSearch }) {
//   return (
//     <div 
//       className="text-center shadow-sm d-flex flex-column justify-content-between" 
//       style={{ 
//         borderRadius: '0 0 50px 50px', 
//         minHeight: 'calc(100vh - 75px)',
//         // 💡 THE MAGIC FIX: Beautiful food background with a soft white overlay
//         backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.95)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         paddingTop: '60px',
//         paddingBottom: '40px'
//       }}
//     >

//       {/* Spacer to push content slightly down from the very top */}
//       <div></div>

//       <div className="w-100">
//         {/* Title & Search Bar inside Container (W: 800px) */}
//         <div className="container w-100" style={{ maxWidth: '800px' }}>
//           <h1 className="fw-extrabold text-primary display-3 mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.05)'}}>
//             Discover Delicious Recipes
//           </h1>
//           <p className="text-dark fs-5 mb-5 fw-medium opacity-75">
//             Find the best recipes for your favorite dishes instantly
//           </p>

//           {/* Search Bar with increased bottom margin for breathing space */}
//           <div className="mb-5 px-3">
//             <SearchBar search={search} setSearch={setSearch} />
//           </div>
//         </div>

//         {/* Category Filters in a Single Line with Touch/Horizontal Scroll */}
//         <div className="w-100 mb-5 px-3">
//           <div 
//             className="d-flex align-items-center justify-content-start justify-content-md-center gap-3 overflow-x-auto custom-scrollbar" 
//             style={{ 
//               whiteSpace: 'nowrap', 
//               WebkitOverflowScrolling: 'touch', 
//               paddingBottom: '15px' 
//             }}
//           >
//             <style>{`
//               .custom-scrollbar::-webkit-scrollbar {
//                 height: 6px;
//               }
//               .custom-scrollbar::-webkit-scrollbar-track {
//                 background: rgba(0,0,0,0.05);
//                 border-radius: 10px;
//               }
//               .custom-scrollbar::-webkit-scrollbar-thumb {
//                 background: #0d6efd;
//                 border-radius: 10px;
//               }
//               .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//                 background: #0b5ed7;
//               }
//             `}</style>

//             {['All', 'Veg', 'Non-Veg', 'Italian', 'South Indian', 'Chinese', 'Dessert', 'Fast Food'].map(cat => (
//               <button
//                 key={cat}
//                 className={`btn rounded-pill px-4 py-2 fw-bold shadow-sm transition-all ${search === cat || (cat === 'All' && search === "") ? 'btn-primary' : 'btn-light text-dark border'}`}
//                 style={{ flexShrink: 0, fontSize: '15px' }}
//                 onClick={() => cat === 'All' ? setSearch("") : setSearch(cat)}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Stats Panel - Pushed to the bottom to create space */}
//       <div className="row justify-content-center mt-auto g-3 px-3 mx-auto w-100" style={{ maxWidth: '900px', borderTop: '2px dashed rgba(0,0,0,0.1)', paddingTop: '30px' }}>
//         {[{ label: 'Recipes', val: '1.2K+' }, { label: 'Active Cooks', val: '5K+' }, { label: 'Reviews', val: '10K+' }].map((item, i) => (
//           <div className="col-md-4 col-4 border-end border-end-last-0" key={i}>
//             <h3 className="fw-extrabold text-primary mb-1">{item.val}</h3>
//             <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '12px', letterSpacing: '1px' }}>{item.label}</span>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

// export default HeroSection;


import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { getRecipeStats } from '../services/api';

function HeroSection({ search, setSearch }) {
  // 🆕 State to store aggregation data
  const [stats, setStats] = useState([]);

  // 🆕 Fetch aggregation data from the backend when the component loads
  useEffect(() => {
    getRecipeStats().then(res => {
      if (res.data) {
        // setStats(res.data.slice(0, 3)); // Display only the first 3 categories
        setStats(res.data); // 🆕 We are setting the entire data
      }
    }).catch(err => console.log(err));
  }, []);
  return (
    <div
      className="text-center shadow-sm d-flex flex-column justify-content-between"
      style={{
        borderRadius: '0 0 50px 50px',
        minHeight: 'calc(100vh - 75px)',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.95)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: '60px',
        paddingBottom: '40px'
      }}
    >

      <div></div>

      <div className="w-100">
        <div className="container w-100" style={{ maxWidth: '800px' }}>
          <h1 className="fw-extrabold text-primary display-3 mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.05)' }}>
            Discover Delicious Recipes
          </h1>
          <p className="text-dark fs-5 mb-5 fw-medium opacity-75">
            Find the best recipes for your favorite dishes instantly
          </p>

          <div className="mb-5 px-3">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
        </div>

        <div className="w-100 mb-5 px-3">
          <div
            className="d-flex align-items-center justify-content-start justify-content-md-center gap-3 overflow-x-auto custom-scrollbar"
            style={{
              whiteSpace: 'nowrap',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: '15px'
            }}
          >
            <style>{` 
.custom-scrollbar::-webkit-scrollbar { height: 6px; } 
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 10px; } 
.custom-scrollbar::-webkit-scrollbar-thumb { background: #0d6efd; border-radius: 10px; } 
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #0b5ed7; } 
`}</style>

            {['All', 'Veg', 'Non-Veg', 'Italian', 'South Indian', 'Chinese', 'Dessert', 'Fast Food'].map(cat => (
              <button
                key={cat}
                className={`btn rounded-pill px-4 py-2 fw-bold shadow-sm transition-all ${search === cat || (cat === 'All' && search === "") ? 'btn-primary' : 'btn-light text-dark border'}`}
                style={{ flexShrink: 0, fontSize: '15px' }}
                onClick={() => cat === 'All' ? setSearch("") : setSearch(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🆕 Aggregation Stats Panel - Actual MongoDB data is displayed here
      <div className="row justify-content-center mt-auto g-3 px-3 mx-auto w-100" style={{ maxWidth: '900px', borderTop: '2px dashed rgba(0,0,0,0.1)', paddingTop: '30px' }}>
        {stats.length > 0 ? (
          stats.map((item, i) => (
            <div className="col-md-4 col-4 border-end border-end-last-0" key={i}>
              <h3 className="fw-extrabold text-primary mb-1">{item.totalRecipes} <small className="fs-6 text-muted">Dishes</small></h3>
              <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '12px', letterSpacing: '1px' }}>
                🔥 {item._id}
              </span>
            </div>
          ))
        ) : (
          <div className="text-muted small">Loading Recipe Stats...</div>
        )}
      </div> */}


      {/* 🆕 Aggregation Stats Panel - All data is displayed */}
      <div
        className="d-flex flex-wrap justify-content-center mt-auto px-3 mx-auto w-100"
        style={{ maxWidth: '1000px', borderTop: '2px dashed rgba(0,0,0,0.1)', paddingTop: '30px' }}
      >
        {stats.length > 0 ? (
          stats.map((item, i) => (
            <div className="px-4 mb-3 border-end" key={i} style={{ minWidth: '120px' }}>
              <h3 className="fw-extrabold text-primary mb-1">
                {item.totalRecipes} <small className="fs-6 text-muted">Dishes</small>
              </h3>
              <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '12px', letterSpacing: '1px' }}>
                🔥 {item._id}
              </span>
            </div>
          ))
        ) : (
          <div className="text-muted small">Loading Recipe Stats...</div>
        )}
      </div>

    </div>
  );
}

export default HeroSection;
