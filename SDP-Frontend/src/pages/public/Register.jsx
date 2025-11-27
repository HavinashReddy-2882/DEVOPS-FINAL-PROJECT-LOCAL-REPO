import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

export default function Register() {
    const [formData, setFormData] = useState({ name: '', username: '', password: '', dob: '', gender: '', email: '', contact: '', address: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/customer/register', formData);
            alert("Registration successful! Please log in.");
            navigate('/login');
        } catch (err) {
            setError("Registration failed. Username or email may already exist.");
        }
    };

    return (
        <div className="hero-container">
            <div className="glass-login-container" style={{maxWidth: '600px'}}>
                <h2>Create Account</h2>
                <p className="sub-text">Join HotelHub for premium services.</p>
                
                {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Contact</label>
                            <input name="contact" value={formData.contact} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input name="address" value={formData.address} onChange={handleChange} required />
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Register Now</button>
                </form>
                <p style={{textAlign:'center', marginTop:'15px'}}>Already have an account? <Link to="/login" style={{color:'#4f46e5', fontWeight:'bold', textDecoration:'none'}}>Login</Link></p>
            </div>
        </div>
    );
}