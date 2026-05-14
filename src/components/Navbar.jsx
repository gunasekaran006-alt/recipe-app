import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();
  
  // State to control the custom logout modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Triggered when clicking Logout in dropdown
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Actual logout logic when clicking "Yes, Logout"
  const confirmLogout = () => {
    sessionStorage.clear(); 
    setShowLogoutModal(false);
    toast.info("Logged out successfully! 👋");
    navigate('/login'); 
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary fs-3 d-flex align-items-center gap-2" to="/home">
            <span className="fs-2">🍳</span> RecipeShare
          </Link>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-1">
              <li className="nav-item">
                <Link className="nav-link fw-semibold px-3 d-flex align-items-center gap-2" to="/home">
                  🏠 Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-semibold px-3 d-flex align-items-center gap-2" to="/favorites">
                  ❤️ Favorites
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link fw-semibold px-3 dropdown-toggle d-flex align-items-center gap-2" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  👤 Profile
                </a>
                <ul className="dropdown-menu shadow border-0 mt-2" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item py-2" to="/profile">My Account</Link></li>
                  <li><Link className="dropdown-item py-2" to="/settings">Settings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  {/* Changed from window.confirm to custom modal trigger */}
                  <li><button className="dropdown-item py-2 text-danger fw-bold" onClick={handleLogoutClick}>Logout</button></li>
                </ul>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <button
                onClick={() => {
                  const event = new CustomEvent("openAddRecipeModal");
                  window.dispatchEvent(event);
                }}
                className="btn btn-primary rounded-pill px-4 btn-sm fw-bold shadow-sm d-flex align-items-center gap-2"
              >
                <span>➕</span> Add Recipe
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Custom Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-body p-4 text-center">
                <div className="display-4 mb-3">🚪</div>
                <h4 className="fw-bold text-dark">Leaving so soon?</h4>
                <p className="text-muted">Are you sure you want to logout from RecipeShare?</p>
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button className="btn btn-light px-4 fw-bold border" onClick={() => setShowLogoutModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-warning px-4 fw-bold shadow-sm text-dark" onClick={confirmLogout}>
                    Yes, Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;