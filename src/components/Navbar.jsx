import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Project Logo */}
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
              {/* FIXED: Changed to="/home" to to="/favorites" */}
              <Link className="nav-link fw-semibold px-3 d-flex align-items-center gap-2" to="/favorites">
                ❤️ Favorites
              </Link>
            </li>
            
            {/* Profile Dropdown with Icon */}
            <li className="nav-item dropdown">
              <a 
                className="nav-link fw-semibold px-3 dropdown-toggle d-flex align-items-center gap-2" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                👤 Profile
              </a>
              <ul className="dropdown-menu shadow border-0 mt-2" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item py-2" to="/profile">My Account</Link></li>
                <li><Link className="dropdown-item py-2" to="/settings">Settings</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item py-2 text-danger fw-bold" onClick={handleLogout}>Logout</button></li>
              </ul>
            </li>
          </ul>

          {/* Action Button */}
          <div className="d-flex align-items-center">
            <Link to="/add-recipe" className="btn btn-primary rounded-pill px-4 btn-sm fw-bold shadow-sm d-flex align-items-center gap-2">
              <span>➕</span> Add Recipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;