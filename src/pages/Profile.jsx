import React from 'react';
import Navbar from '../components/Navbar';

function Profile() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="container py-5 flex-grow-1 text-center">
        <div className="card mx-auto p-4 shadow-sm border-0" style={{ maxWidth: '500px', borderRadius: '20px' }}>
          <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '30px' }}>
            👤
          </div>
          <h3 className="fw-bold text-dark">My Account</h3>
          <p className="text-muted">Welcome to your profile page!</p>
          <hr />
          <div className="text-start px-3">
            <p><strong>Name:</strong> Guna</p>
            <p><strong>Email:</strong> gunasekaran006@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;