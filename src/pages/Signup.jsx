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

 return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fdf6f0' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', color: '#444' }}>Create Account</h2>
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Full Name" style={inputStyle} onChange={(e) => setData({ ...data, name: e.target.value })} required />
          <input type="email" placeholder="Email" style={inputStyle} onChange={(e) => setData({ ...data, email: e.target.value })} required />
          <input type="password" placeholder="Password" style={inputStyle} onChange={(e) => setData({ ...data, password: e.target.value })} required />
          <button type="submit" style={{ ...buttonStyle, backgroundColor: '#28a745' }}>Sign Up</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>Have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' };
const buttonStyle = { padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#ff6b6b', color: 'white', cursor: 'pointer', fontWeight: 'bold' };

export default Signup;

