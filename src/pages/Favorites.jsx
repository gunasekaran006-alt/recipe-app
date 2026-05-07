import Navbar from '../components/Navbar';

function Favorites() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5 text-center">
        <h2>Your Favorite Recipes</h2>
        <p className="text-muted">No favorites added yet. (Review 3 Coming Soon!)</p>
      </div>
    </div>
  );
}
export default Favorites;