import React from 'react';
import Navbar from '../components/Navbar';

function Settings() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="container py-5 flex-grow-1 text-center">
        <div className="card mx-auto p-4 shadow-sm border-0" style={{ maxWidth: '500px', borderRadius: '20px' }}>
          
          {/* Settings Gear Icon */}
          <div 
            className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center fw-bold mx-auto mb-3" 
            style={{ width: '80px', height: '80px', fontSize: '35px' }}
          >
            ⚙️
          </div>

          <h3 className="fw-bold text-dark">Settings</h3>
          <p className="text-muted">Manage your app preferences</p>
          <hr />

          {/* Simple Settings Options */}
          <div className="text-start px-3">
            <div className="form-check form-switch mb-3">
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
              <label className="form-check-label fw-semibold" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
            </div>
            <div className="form-check form-switch mb-3">
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" defaultChecked />
              <label className="form-check-label fw-semibold" htmlFor="flexSwitchCheckChecked">Email Notifications</label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;