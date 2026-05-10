import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile'; // FIXED: Added Profile import
import Settings from './pages/Settings'; // FIXED: Added Settings import
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      {/* Layout wrapper to push footer to bottom */}
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            
            {/* FIXED: Added routes for Profile and Settings */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Redirect any unknown paths to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        
        {/* Footer is placed outside Routes to show on every page */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;