import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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

    // ==========================================

    try {
      const res = await fetch('http://localhost:3000/users');
      const users = await res.json();
      
      const user = users.find(u => u.email === login.email && u.password === login.password);
      
      if (user) {
        toast.success(`Welcome back, ${user.name || 'Chef'}! 👩‍🍳`); 
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate('/home');
      } else {
        toast.error("Invalid email or password! ❌");
      }
    } catch (error) {
      toast.error("Server error. Please ensure json-server is running.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">RecipeShare Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control form-control-lg" placeholder="example@mail.com" onChange={(e) => setLogin({...login, email: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control form-control-lg" placeholder="••••••••" autoComplete="current-password" onChange={(e) => setLogin({...login, password: e.target.value})} required />
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