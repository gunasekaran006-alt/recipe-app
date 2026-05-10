import React from 'react';
import Navbar from '../components/Navbar';

function Settings() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="container py-5 flex-grow-1 text-center">
        <div className="card mx-auto p-4 shadow-sm border-0" style={{ maxWidth: '500px', borderRadius: '20px' }}>
          <div className="bg-secondary-subtle text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '30px' }}>
            ⚙️
          </div>
          <h3 className="fw-bold text-dark">Settings</h3>
          <p className="text-muted">Manage your application preferences.</p>
          <hr />
          <div className="form-check form-switch text-start d-inline-block">
            <input className="form-check-input" type="checkbox" id="notificationSwitch" defaultChecked />
            <label className="form-check-label ms-2" htmlFor="notificationSwitch">Enable Email Notifications</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;