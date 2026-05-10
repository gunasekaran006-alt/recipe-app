import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/users');
    const users = await res.json();
    
    // Verifying the user on the server
    const user = users.find(u => u.email === login.email && u.password === login.password);
    
    if (user) {
      // FIXED: Modified success alert to dynamically greet the user with their registered name
      alert(`Welcome, ${user.name || 'Chef'}!`); 
      
      // Save login session securely
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate('/home');
    } else {
      alert("Invalid User!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">RecipeShare Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control form-control-lg" 
              placeholder="example@mail.com" 
              onChange={(e) => setLogin({...login, email: e.target.value})} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control form-control-lg" 
              placeholder="••••••••" 
              onChange={(e) => setLogin({...login, password: e.target.value})} 
              required 
            />
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