import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Universal Smart Login Endpoint
      const response = await api.post('/admin/login', formData);
      
      if (response.data) {
        const { role, userData } = response.data;
        const userWithRole = { ...userData, role: role };
        login(userWithRole);

        // Smart Redirect based on role
        if (role === 'ADMIN') navigate('/'); 
        else if (role === 'MANAGER') navigate('/'); 
        else if (role === 'CUSTOMER') navigate('/'); 
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="hero-container"> 
      <div className="glass-login-container">
        <h2>Welcome Back</h2>
        <p className="sub-text">Please enter your details to sign in.</p>
        
        {error && <div style={{color: '#ef4444', background: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center', fontSize:'0.9rem'}}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleInputChange} 
              required 
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleInputChange} 
              required 
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="submit-button">Sign In</button>
        </form>
        
        <p style={{marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#4b5563'}}>
            Don't have an account? <Link to="/register" style={{color: '#4f46e5', fontWeight: '600', textDecoration: 'none'}}>Register Here</Link>
        </p>
      </div>
    </div>
  );
}