// step:1
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// function ProtectedRoute({ children }) {
//   // Check if user is logged in (using sessionStorage or localStorage)
//   const isAuthenticated = sessionStorage.getItem("isLoggedIn") === "true";

//   // If not logged in, redirect them to the Login page automatically
//   if (!isAuthenticated) {
//     alert("Please login first to access this page!");
//     return <Navigate to="/login" replace />;
//   }

//   // If logged in, let them view the page
//   return children;
// }

// export default ProtectedRoute;



// // step:2
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// function ProtectedRoute({ children }) { 
// // Check if 'token' exists in sessionStorage 
// // const user = sessionStorage.getItem("token"); 

// // Since there is an HttpOnly cookie, we check if 'user' exists in sessionStorage.
// const user = sessionStorage.getItem("user");

// // Revert to login page if no token 
// if (!user) { 
// alert("Please login first to access this page!"); 
// return <Navigate to="/login" replace />; 
// } 

// // If the token is present, display the page 
// return children;
// }

// export default ProtectedRoute;


// Step:3
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = Loading state

  useEffect(() => {
    // 🛡️ Check HttpOnly Cookie securely via backend API
    fetch('http://localhost:8080/api/auth/me', {
      method: 'GET',
      credentials: 'include' // Crucial for sending cookies
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

  if (isAuthenticated === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    alert("Please login first to access this page!");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;