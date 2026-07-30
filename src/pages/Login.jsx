import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");

    // ==========================================
    // 🛡️ JAVASCRIPT FORM VALIDATION LOGIC
    // ==========================================

    // 1. Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(login.email)) {
      toast.warning("Please enter a valid email format! 📧");
      return;
    }

    // 2. Password Length Validation
    if (login.password.length < 6) {
      toast.warning("Password cannot be less than 6 characters! 🔒");
      return;
    }



    try {
      // 🆕 Dynamic API URL usage for Production & Local development
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: login.email, password: login.password }),
        credentials: 'include' // 👈 This is necessary to receive the cookie!
      });

      const data = await response.json();

      if (response.ok && data.user) {
        toast.success(`Welcome back, ${data.user.name || 'Chef'}! 👩‍🍳`);
        
        sessionStorage.setItem("user", JSON.stringify(data.user));

        navigate('/home');
      } else {
        toast.error(data.message || "Invalid email or password! ❌");
      }
    } catch (error) {
      toast.error("Server error. Please ensure Node.js backend is running.");
    }
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">RecipeShare Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            
            <input type="email" className="form-control form-control-lg" placeholder="example@mail.com" autoComplete="username" onChange={(e) => setLogin({ ...login, email: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control form-control-lg" placeholder="••••••••" autoComplete="current-password" onChange={(e) => setLogin({ ...login, password: e.target.value })} required />
          </div>

          {/* 🆕 Forgot Password Link (Correct placement inside the form UI) */}
          <div className="text-end mb-3">
            <a href="/forgot-password" style={{ textDecoration: 'none', color: '#007bff' }}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 shadow-sm mt-2">Login Now</button>
        </form>
        <div className="text-center mt-4">
          <span className="text-muted">Don't have an account? </span>
          <a href="/signup" className="text-decoration-none fw-bold">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;