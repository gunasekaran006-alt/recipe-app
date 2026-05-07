import { useState } from 'react';

function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/users');
    const users = await res.json();
    
    // Verifying the user on the server
    const user = users.find(u => u.email === login.email && u.password === login.password);
    
    if (user) {
      alert("Login Success!");
    } else {
      alert("Invalid User!");
    }
  };

  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fdf6f0' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', color: '#444' }}>RecipeShare Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="email" placeholder="Email" style={inputStyle} onChange={(e) => setLogin({...login, email: e.target.value})} required />
          <input type="password" placeholder="Password" style={inputStyle} onChange={(e) => setLogin({...login, password: e.target.value})} required />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>New here? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
}

const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' };
const buttonStyle = { padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#ff6b6b', color: 'white', cursor: 'pointer', fontWeight: 'bold' };
export default Login;