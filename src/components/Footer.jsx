function Footer() {
  return (
    <footer className="bg-white pt-5 pb-3 shadow-lg mt-5 border-top">
      <div className="container">
        <div className="row">
          
          {/* Brand Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-primary">RecipeShare</h5>
            <p className="text-muted">Share your culinary creations with food lovers around the world.</p>
          </div>

          {/* Explore Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Explore</h6>
            <ul className="list-unstyled text-muted">
              <li>Home</li>
              <li>Browse Recipes</li>
              <li>My Favorites</li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Company</h6>
            <ul className="list-unstyled text-muted">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Follow Us with Official Brand Icons */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Follow Us</h6>
            <div className="d-flex gap-3 fs-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-primary" title="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-danger" title="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-dark" title="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-danger" title="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-primary" title="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>

            {/* Tech Stack Branding */}
            <div className="mt-3 text-muted small fw-semibold">
              ⚡ Built with <span className="text-primary">MERN Stack & Gemini AI</span>
            </div>
          </div>

        </div>
        
        <hr />
        
        {/* Copyright */}
        <p className="text-center text-muted small mb-0">© 2026 RecipeShare. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;