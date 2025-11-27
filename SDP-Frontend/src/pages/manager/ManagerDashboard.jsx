import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function ManagerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ rooms: 0, bookings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const rRes = await api.get(`/manager/viewmyrooms/${user.id}`);
            const bRes = await api.get(`/manager/viewbookings/${user.id}`);
            setStats({ rooms: rRes.data.length, bookings: bRes.data.length });
        } catch(e) {}
    };
    if(user) fetchStats();
  }, [user]);

  return (
    <div className="dashboard-container">
      {/* 1. Modern Gradient Banner */}
      <div className="welcome-banner" style={{background: 'linear-gradient(135deg, #0f172a, #334155)'}}> 
        <h1 style={{margin: 0, fontSize: '2.5rem'}}>Hotel Dashboard 🏨</h1>
        <p style={{fontSize: '1.1rem', opacity: 0.9, marginTop: '10px'}}>
          Welcome back, {user.name}. Manage your property and services efficiently.
        </p>
      </div>

      {/* 2. Quick Action Cards */}
      <h2 className="dashboard-heading">Quick Actions</h2>
      <div className="cards-container">
        
        <div className="stat-card">
          <h3>Accommodation</h3>
          <p>{stats.rooms} Rooms</p>
          <Link to="/manage-rooms" className="cta-button">Manage Rooms</Link>
        </div>

        <div className="stat-card">
          <h3>Reservations</h3>
          <p>{stats.bookings} Active</p>
          <Link to="/view-bookings" className="cta-button" style={{backgroundColor: '#10b981'}}>View Bookings</Link>
        </div>

        <div className="stat-card">
          <h3>Dining</h3>
          <p style={{fontSize: '1.5rem', marginTop: '15px'}}>Update Menu</p>
          <Link to="/manage-food" className="cta-button" style={{marginTop: 'auto', backgroundColor: '#f59e0b'}}>Manage Food</Link>
        </div>

        <div className="stat-card">
          <h3>Transport</h3>
          <p style={{fontSize: '1.5rem', marginTop: '15px'}}>Fleet Status</p>
          <Link to="/manage-cabs" className="cta-button" style={{marginTop: 'auto', backgroundColor: '#6366f1'}}>Manage Cabs</Link>
        </div>

      </div>
    </div>
  );
}