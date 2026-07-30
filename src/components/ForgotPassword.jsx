import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 🆕 Dynamic API URL usage
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

            const response = await axios.post(`${API_BASE}/auth/forgot-password`, { email });

            toast.success(response.data.message || "OTP sent to your email! ✉️");

            setTimeout(() => {
                navigate('/reset-password');
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
                <h3 className="text-center mb-4 fw-bold text-primary">Forgot Password?</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Your Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="example@gmail.com"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-2 shadow-sm"
                        disabled={loading}
                    >
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;