import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {
  return (
    

    <BrowserRouter>
    
    <Routes>
        
<Route path="/" element={<Navigate to="/login" />} />
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />
<Route path="*" element={<Navigate to="/Login"/>} />

    </Routes>
    
    </BrowserRouter>



  );
}

export default App