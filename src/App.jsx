import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyRecipes from './pages/MyRecipes';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AddRecipeModal from './components/AddRecipeModal';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';


// Make sure updateRecipe is imported here
// import { getRecipes, createRecipe, updateRecipe } from './services/api';
import { getRecipes, createRecipe as addRecipeApi, updateRecipe as updateRecipeApi } from './services/api';







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
    // const storedUser = JSON.parse(sessionStorage.getItem('user'));
    // const userName = sessionStorage.getItem("userName");
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    // 🆕 Block if there is no token
    if (!storedUser || !storedUser.email) {
      toast.error("Session expired! Please login again.");
      window.location.href = '/login';
      return;
    }

    if (isSaving) return;
    setIsSaving(true);
    // setShowAddModal(false); // 🆕 The modal should be closed only after success; therefore, we are avoiding it here.

    try {
      // const { id, ...cleanData } = recipeData;
      // 1. We extract the old id that is no longer needed and take only the remaining data (cleanData).
      let { id, _id, ...cleanData } = recipeData;



      // // Generate our own custom ID to ensure it stays at the top of the object
      // const customId = "rec_" + Math.random().toString(36).substr(2, 9);

      // // Place 'id' as the FIRST property in the final object
      // const finalRecipe = {
      //   id: editRecipe ? editRecipe.id : customId,
      //   ...cleanData
      // };

      // 2. Get the name of the logged in user from the Session (Author Fix) 
      // const storedUser = JSON.parse(sessionStorage.getItem('user'));
      // const authorName = storedUser ? storedUser.name : "Unknown Chef";

      // 3. The complete Data Object to send to the backend 
      let finalRecipe = {
        ...cleanData,
        // author: authorName, // 🆕 Login name! 
        // author: storedUser ? storedUser.name : "Unknown Chef",};
        // author: storedUser?.name || "Unknown Chef"
        // author: sessionStorage.getItem("userName") || "Chef"
        author: storedUser?.name || storedUser?.email?.split('@')[0] || "Chef"
      };

      // 3 .Smart Category Image Logic
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

      // 4. API Calls
      if (editRecipe) {
        // UPDATE LOGIC (we use editRecipe._id instead of id)        
        // await updateRecipe(editRecipe.id, finalRecipe);
        // await updateRecipe(editRecipe._id, finalRecipe);
        await updateRecipeApi(editRecipe._id, finalRecipe);
        toast.success("Recipe Updated Successfully! ✏️");
      } else {
        // CREATE LOGIC (Since it is a new recipe, _id is not required; MongoDB will generate it automatically)        await createRecipe(finalRecipe);
        // await createRecipe(finalRecipe);
        await addRecipeApi(finalRecipe);
        toast.success("Recipe added perfectly! ✨");
      }

      // 🆕 The modal should be closed only after success.
      setShowAddModal(false);
      setEditRecipe(null);
      // Dispatching an event to re-fetch only the home page data
      window.dispatchEvent(new CustomEvent("recipeSavedSuccessfully"));

    } catch (error) {
      console.error("Save Error Details:", error);
      // toast.error("Failed to save recipe! Please try again.");      
      // If a token error occurs, display it separately.
      // toast.error(error.message || "Failed to save recipe!");
      // toast.error(error.message === "Invalid Token" ? "Session expired! Please login again." : error.message);
      if (error.message.includes("Token") || error.message.includes("401")) {
        toast.error("Session expired! Please login again.");
        // sessionStorage.clear();

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        // navigate('/login');
        window.location.href = '/login';
      } else {
        toast.error("Error: " + error.message);
      }
    } finally {
      // setEditRecipe(null);
      // setIsSaving(false);
      setIsSaving(false);
      // setEditRecipe(null);
    }
  };

  return (
    <BrowserRouter>
      {/* Global Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        theme="colored"
      />

      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Routes>
            {/* <Route path="/" element={<Navigate to="/login" />} /> */}
            {/* <Route path="/" element={sessionStorage.getItem("user") ? <Navigate to="/home" /> : <Login />} /> */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/my-recipes" element={<ProtectedRoute><MyRecipes /></ProtectedRoute>} />
          </Routes>
        </div>
        <Footer />
      </div>

      <AddRecipeModal
        show={showAddModal}
        onClose={() => { setShowAddModal(false); setEditRecipe(null); }}
        editRecipe={editRecipe}
      />
    </BrowserRouter>
  );
}

export default App;