import { useState } from 'react';

function Signup() {
  const [data, setData] = useState({ name: '', email: '', password: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) alert("Signup Success!");
  };

 // src/pages/Signup.jsx
return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
      <h2 className="text-center mb-4 fw-bold text-success">Create Account</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" placeholder="John Doe" onChange={(e) => setData({ ...data, name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input type="email" className="form-control" placeholder="name@example.com" onChange={(e) => setData({ ...data, email: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Min 6 characters" onChange={(e) => setData({ ...data, password: e.target.value })} required />
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

