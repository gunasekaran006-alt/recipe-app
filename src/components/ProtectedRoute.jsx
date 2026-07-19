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



// step:2
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) { 
// Check if 'token' exists in sessionStorage 
const token = sessionStorage.getItem("token"); 

// Revert to login page if no token 
if (!token) { 
alert("Please login first to access this page!"); 
return <Navigate to="/login" replace />; 
} 

// If the token is present, display the page 
return children;
}

export default ProtectedRoute;