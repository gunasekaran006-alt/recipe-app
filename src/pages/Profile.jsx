import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function Profile() {
  const [user, setUser] = useState({ name: 'Guna', email: 'gunasekaran006@gmail.com' });

  useEffect(() => {
    // Get logged-in user details dynamically from sessionStorage
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="container py-5 flex-grow-1 text-center">
        <div className="card mx-auto p-4 shadow-sm border-0" style={{ maxWidth: '500px', borderRadius: '20px' }}>
          
          {/* Avatar with the first letter of user's name */}
          <div 
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold mx-auto mb-3" 
            style={{ width: '80px', height: '80px', fontSize: '30px' }}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
          </div>

          <h3 className="fw-bold text-dark">My Account</h3>
          <p className="text-muted">Welcome to your profile page!</p>
          <hr />

          {/* User Details displayed dynamically */}
          <div className="text-start px-3">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;