import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom'; // Import Link
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({ customers: 0, managers: 0 });
  
  // Chart Data
  const data = [
    { name: 'Customers', value: counts.customers },
    { name: 'Managers', value: counts.managers },
  ];
  const COLORS = ['#6366f1', '#10b981']; // Indigo & Emerald

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [cRes, mRes] = await Promise.all([
                api.get('/admin/customerscount'),
                api.get('/admin/managerscount')
            ]);
            setCounts({ customers: cRes.data, managers: mRes.data });
        } catch(e) { console.error(e); }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* 1. Modern Gradient Banner */}
      <div className="welcome-banner">
        <h1 style={{margin: 0, fontSize: '2.5rem'}}>Welcome, Administrator! 🛡️</h1>
        <p style={{fontSize: '1.1rem', opacity: 0.9, marginTop: '10px'}}>
          Here is your system overview. Manage users and monitor platform growth.
        </p>
      </div>

      {/* 2. Action Cards */}
      <h2 className="dashboard-heading">System Management</h2>
      <div className="cards-container">
        
        <div className="stat-card">
          <h3>Managers</h3>
          <p>{counts.managers}</p>
          <span style={{color: '#6b7280', fontSize: '0.9rem'}}>Registered Hotel Managers</span>
          <Link to="/managers" className="cta-button" style={{marginTop: 'auto'}}>Manage Managers</Link>
        </div>

        <div className="stat-card">
          <h3>Customers</h3>
          <p>{counts.customers}</p>
          <span style={{color: '#6b7280', fontSize: '0.9rem'}}>Active Users</span>
          <Link to="/customers" className="cta-button" style={{backgroundColor: '#10b981', marginTop: 'auto'}}>View Customers</Link>
        </div>

        <div className="stat-card" style={{borderLeft: '4px solid #f59e0b'}}>
          <h3>System Health</h3>
          <p style={{color: '#f59e0b'}}>Good</p>
          <span style={{color: '#6b7280', fontSize: '0.9rem'}}>All services operational</span>
        </div>

      </div>

      {/* 3. Chart Section */}
      <div className="chart-section" style={{marginTop: '40px'}}>
        <h3 style={{marginBottom: '20px', color: '#374151'}}>User Distribution</h3>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value" label>
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}