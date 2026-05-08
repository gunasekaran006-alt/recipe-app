function Footer() {
  return (
    <footer className="bg-white pt-5 pb-3 shadow-lg mt-5 border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-primary">RecipeShare</h5>
            <p className="text-muted">Share your culinary creations with food lovers around the world.</p>
          </div>
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Explore</h6>
            <ul className="list-unstyled text-muted">
              <li>Home</li>
              <li>Browse Recipes</li>
              <li>My Favorites</li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Company</h6>
            <ul className="list-unstyled text-muted">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Follow Us</h6>
            <div className="d-flex gap-3 fs-4 text-primary">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-youtube"></i>
            </div>
          </div>
        </div>
        <hr />
        <p className="text-center text-muted small">© 2026 RecipeShare. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;