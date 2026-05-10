import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if user is logged in (using localStorage)
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  // If not logged in, redirect them to the Login page automatically
  if (!isAuthenticated) {
    alert("Please login first to access this page!");
    return <Navigate to="/login" replace />;
  }

  // If logged in, let them view the page
  return children;
}

export default ProtectedRoute;