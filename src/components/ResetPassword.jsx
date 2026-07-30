import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ResetPassword = () => { 
  const [email, setEmail] = useState(''); 
  const [otp, setOtp] = useState(''); 
  const [newPassword, setNewPassword] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleReset = async (e) => { 
    e.preventDefault(); 
    setLoading(true); 

    try { 
      // 🆕 Dynamic API URL usage
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

      const response = await axios.post(`${API_BASE}/auth/reset-password`, { 
        email, 
        otp, 
        newPassword 
      }); 

      toast.success(response.data.message || "Password changed successfully! 🔓"); 

      setTimeout(() => { 
        navigate('/login'); 
      }, 2000); 

    } catch (err) { 
      toast.error(err.response?.data?.message || 'Something went wrong. Try again.'); 
    } finally { 
      setLoading(false); 
    } 
  }; 

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <h3 className="text-center mb-4 fw-bold text-success">Change Password</h3>
        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@gmail.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter 6-digit OTP"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="New Password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 py-2 shadow-sm"
            disabled={loading}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;