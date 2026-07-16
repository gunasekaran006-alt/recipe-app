import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // ==========================================
    // 🛡️ JAVASCRIPT FORM VALIDATION LOGIC
    // ==========================================

    // 1. Name Validation (Must be at least 3 characters)
    if (data.name.trim().length < 3) {
      toast.warning("Name must be at least 3 characters long! ⚠️");
      return; // Stop execution here
    }

    // 2. Email Validation (Must be a proper email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.warning("Please enter a valid email address! 📧");
      return;
    }

    // 3. Password Validation (Must be at least 6 characters)
    if (data.password.length < 6) {
      toast.warning("Password must be at least 6 characters long! 🔒");
      return;
    }

    // ==========================================

    try {
      // const response = await fetch('http://localhost:3000/users', {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Account created successfully in MongoDB! 🎉");
        navigate('/login');
      } else {
        // toast.error("Failed to create account.");
        toast.error(result.message || "Failed to create account.");
      }
    } catch (error) {
      // toast.error("Server error. Please ensure json-server is running.");
      toast.error("Server error. Please ensure Node.js backend is running.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 fw-bold text-success">Create Account</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            {/* <input type="text" className="form-control" placeholder="John Doe" onChange={(e) => setData({ ...data, name: e.target.value })} required /> */}
            <input type="text" className="form-control" placeholder="John Doe" autoComplete="name" onChange={(e) => setData({ ...data, name: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            {/* <input type="email" className="form-control" placeholder="name@example.com" onChange={(e) => setData({ ...data, email: e.target.value })} required /> */}
            <input type="email" className="form-control" placeholder="name@example.com" autoComplete="username" onChange={(e) => setData({ ...data, email: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            {/* <input type="password" name="password" className="form-control" placeholder="Min 6 characters" autoComplete="new-password" onChange={(e) => setData({ ...data, password: e.target.value })} required /> */}
            <input type="password" className="form-control" placeholder="Min 6 characters" autoComplete="new-password" onChange={(e) => setData({ ...data, password: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-success btn-lg w-100 shadow-sm mt-2">Register</button>
        </form>
        <div className="text-center mt-4">
          <span className="text-muted">Already have an account? </span>
          <a href="/login" className="text-decoration-none fw-bold">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;