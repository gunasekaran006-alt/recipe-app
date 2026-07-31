import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // 🆕 Dynamic API URL usage for Production & Local development
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    // 🛡️ Check HttpOnly Cookie securely via backend API
    fetch(`${API_BASE}/auth/me`, {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/reset-password';

  if (isAuthenticated === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 🛑 Silent redirect without annoying toast alert when landing on protected pages unauthenticated
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;