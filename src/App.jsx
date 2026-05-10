import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile'; 
import Settings from './pages/Settings'; 
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AddRecipeModal from './components/AddRecipeModal'; // Imported AddRecipeModal here Globally

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);

  useEffect(() => {
    // Listen for global "Add Recipe" event
    const handleOpenAddModal = () => {
      setEditRecipe(null); // Ensure add mode
      setShowAddModal(true);
    };

    // Listen for global "Edit Recipe" event
    const handleOpenEditModal = (e) => {
      setEditRecipe(e.detail); // Get recipe data passed through custom event
      setShowAddModal(true);
    };

    window.addEventListener("openAddRecipeModal", handleOpenAddModal);
    window.addEventListener("openEditRecipeModal", handleOpenEditModal);

    return () => {
      window.removeEventListener("openAddRecipeModal", handleOpenAddModal);
      window.removeEventListener("openEditRecipeModal", handleOpenEditModal);
    };
  }, []);

  const handleSaveRecipe = (recipeData) => {
    // If you are using API/database, you would trigger the save/update call here.
    // Since state is local per page, once saved we can alert success.
    if (editRecipe) {
      alert("Recipe Updated Successfully! (State synchronized)");
    } else {
      alert("New Recipe Created Successfully!");
    }
    setShowAddModal(false);
    setEditRecipe(null);
    
    // Optional: Refresh page to see new recipes from API, or let state handle it.
    window.location.reload(); 
  };

  return (
    <BrowserRouter>
      {/* Layout wrapper to push footer to bottom */}
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
            {/* Redirect any unknown paths to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>

      {/* GLOBAL MODAL: Renders on top of every page dynamically */}
      <AddRecipeModal 
        show={showAddModal} 
        onClose={() => {
          setShowAddModal(false);
          setEditRecipe(null);
        }} 
        onAddRecipe={handleSaveRecipe} 
        editRecipe={editRecipe}
      />
    </BrowserRouter>
  );
}

export default App;