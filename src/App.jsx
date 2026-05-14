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
import AddRecipeModal from './components/AddRecipeModal'; 
import { getRecipes, createRecipe } from './services/api'; 

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleOpenAddModal = () => {
      setEditRecipe(null);
      setShowAddModal(true);
    };

    const handleOpenEditModal = (e) => {
      setEditRecipe(e.detail);
      setShowAddModal(true);
    };

    window.addEventListener("openAddRecipeModal", handleOpenAddModal);
    window.addEventListener("openEditRecipeModal", handleOpenEditModal);

    return () => {
      window.removeEventListener("openAddRecipeModal", handleOpenAddModal);
      window.removeEventListener("openEditRecipeModal", handleOpenEditModal);
    };
  }, []);

  const handleSaveRecipe = async (recipeData) => {
    // Prevent multiple clicks
    if (isSaving) return; 
    setIsSaving(true);
    setShowAddModal(false); 

    if (editRecipe) {
      alert("Recipe Updated Successfully!");
    } else {
      try {
        // Remove 'id' if it exists in the form data so the DB can generate its own random ID
        const { id, ...cleanData } = recipeData;

        const finalRecipe = { ...cleanData };

        // Smart Category Image Logic
        if (!finalRecipe.image || finalRecipe.image.includes("random") || finalRecipe.image === "") {
          const category = (finalRecipe.category || "").toLowerCase();
          if (category.includes("veg") && !category.includes("non")) {
            finalRecipe.image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop"; 
          } else if (category.includes("non")) {
            finalRecipe.image = "https://images.unsplash.com/photo-1606728035253-49e190477c8e?q=80&w=600&auto=format&fit=crop"; 
          } else if (category.includes("dessert") || category.includes("sweet")) {
            finalRecipe.image = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop"; 
          } else {
            finalRecipe.image = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop"; 
          }
        }

        // Send data directly to DB, let json-server handle the ID creation
        const savedRecipe = await createRecipe(finalRecipe);
        alert(`New Recipe added successfully with Auto-Generated ID: ${savedRecipe.id}`);

      } catch (error) {
        alert("API Error: Failed to save recipe!");
        console.error(error);
      }
    }
    
    setEditRecipe(null);
    setIsSaving(false);
    window.location.reload(); 
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </div>

      <AddRecipeModal 
        show={showAddModal} 
        onClose={() => { setShowAddModal(false); setEditRecipe(null); }} 
        onAddRecipe={handleSaveRecipe} 
        editRecipe={editRecipe}
      />
    </BrowserRouter>
  );
}

export default App;