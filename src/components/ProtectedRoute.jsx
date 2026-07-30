import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const alertShownRef = useRef(false);
  const location = useLocation(); // 🆕 To determine the current page

  useEffect(() => {
    // 🛡️ Check HttpOnly Cookie securely via backend API
    fetch('http://localhost:8080/api/auth/me', {
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

  // 🆕 If we are currently on the login or sign-up page,
  // we can skip showing an immediate alert even if a 401 error occurs. 
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

  if (!isAuthenticated && !isAuthPage) {
    if (!alertShownRef.current) {
      alertShownRef.current = true;
      toast.error("Please login first to access this page!", { toastId: "auth-alert" });
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;