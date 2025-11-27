import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function Profile() {
    const { user, login } = useAuth(); 
    const [formData, setFormData] = useState({ ...user, password: '' }); // Initialize password as empty
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Reset form data when user loads, ensuring password field is blank visually
        setFormData({ ...user, password: '' });
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await api.post('/customer/profile/update', formData);
            
            // Update context but keep the role
            login({ ...response.data, role: user.role }); 
            
            setMessage("Profile updated successfully!");
            // Clear password field after successful update
            setFormData(prev => ({ ...prev, password: '' }));
        } catch (error) {
            setMessage("Failed to update profile.");
            console.error(error);
        }
    };

    return (
        <div className="management-container" style={{maxWidth: '600px', margin: '0 auto'}}>
            <h1 style={{textAlign: 'center', marginBottom: '30px'}}>My Profile</h1>
            
            {message && (
                <div style={{
                    padding: '15px', 
                    background: message.includes('Success') ? '#dcfce7' : '#fee2e2', 
                    color: message.includes('Success') ? '#166534' : '#991b1b', 
                    borderRadius: '8px', 
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={formData.username} disabled style={{background: '#f3f4f6', cursor: 'not-allowed'}} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={formData.email} disabled style={{background: '#f3f4f6', cursor: 'not-allowed'}} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                </div>

                <div style={{marginTop: '30px', borderTop: '1px solid #e5e7eb', paddingTop: '20px'}}>
                    <h3 style={{fontSize: '1.1rem', marginBottom: '15px', color: '#4f46e5'}}>Change Password</h3>
                    <div className="form-group">
                        <label>New Password (leave blank to keep current)</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="Enter new password" 
                        />
                    </div>
                </div>

                <button type="submit" className="submit-button" style={{marginTop: '30px'}}>Save Changes</button>
            </form>
        </div>
    );
}