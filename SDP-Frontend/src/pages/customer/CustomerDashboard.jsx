import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      {/* 1. Beautiful Gradient Banner */}
      <div className="welcome-banner">
        <h1 style={{margin: 0, fontSize: '2.5rem'}}>Welcome back, {user.name}! 👋</h1>
        <p style={{opacity: 0.9, fontSize: '1.1rem', marginTop: '10px'}}>
          Ready for your next adventure? Find and book the perfect room for your stay.
        </p>
      </div>

      {/* 2. Action Cards */}
      <h2 className="dashboard-heading">Explore Services</h2>
      <div className="cards-container">
          
          <div className="stat-card">
              <h3>Luxury Stays</h3>
              <p style={{fontSize: '1.5rem', fontWeight: '500'}}>Find the best rooms.</p>
              <Link to="/rooms" className="cta-button">Browse Rooms</Link>
          </div>

          <div className="stat-card">
              <h3>Dining</h3>
              <p style={{fontSize: '1.5rem', fontWeight: '500'}}>Order delicious food.</p>
              <Link to="/dining" className="cta-button" style={{backgroundColor: '#f59e0b'}}>View Menu</Link>
          </div>

          <div className="stat-card">
              <h3>Cab Service</h3>
              <p style={{fontSize: '1.5rem', fontWeight: '500'}}>Travel comfortably.</p>
              <Link to="/cabs" className="cta-button" style={{backgroundColor: '#10b981'}}>Book a Cab</Link>
          </div>

      </div>
    </div>
  );
}