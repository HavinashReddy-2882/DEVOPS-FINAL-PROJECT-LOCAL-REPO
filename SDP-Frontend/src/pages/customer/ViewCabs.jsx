import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function ViewCabs() {
    const [cabs, setCabs] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            // 1. Fetch Available Cabs
            const cabRes = await api.get('/customer/viewcabs');
            setCabs(cabRes.data);

            // 2. Fetch My Previous Requests
            const myRes = await api.get(`/customer/mycabbookings/${user.id}`);
            setMyRequests(myRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleBookCab = async (cab) => {
        const confirmBooking = window.confirm(`Request ${cab.carModel} with driver ${cab.driverName}?`);
        
        if (confirmBooking) {
            try {
                await api.post('/customer/bookcab', {
                    customer: { id: user.id },
                    cab: { id: cab.id }
                });
                alert("Request Sent! Waiting for Manager approval.");
                fetchData(); 
            } catch (error) {
                console.error("Booking failed", error);
                alert("Failed to book cab.");
            }
        }
    };

    // Helper to get colors based on status
    const getStatusStyle = (status) => {
        switch (status) {
            case 'ON_THE_WAY':
                return { border: '#10b981', bg: '#dcfce7', text: '#166534', label: '🚕 ON THE WAY' };
            case 'COMPLETED':
                return { border: '#6b7280', bg: '#f3f4f6', text: '#374151', label: '✅ TRIP COMPLETED' };
            default: // PENDING
                return { border: '#f59e0b', bg: '#fef3c7', text: '#92400e', label: '⏳ PENDING APPROVAL' };
        }
    };

    return (
        <div className="dashboard-container">
            {/* --- SECTION 1: MY REQUESTS --- */}
            {myRequests.length > 0 && (
                <div style={{marginBottom: '40px'}}>
                    <h2 className="dashboard-heading">My Cab Status</h2>
                    <div className="cards-container">
                        {myRequests.map(req => {
                            const style = getStatusStyle(req.status);
                            return (
                                <div key={req.id} className="stat-card" style={{borderLeft: `5px solid ${style.border}`}}>
                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <h3>{req.cab.carModel}</h3>
                                        <span style={{fontSize:'0.8rem', fontWeight:'bold', color:'#6b7280'}}>#{req.id}</span>
                                    </div>
                                    <p style={{fontSize: '1.2rem', margin: '10px 0'}}>
                                        Driver: {req.cab.driverName} ({req.cab.cabType})
                                    </p>
                                    {/* Status Badge */}
                                    <div style={{
                                        marginTop: 'auto', 
                                        padding: '10px', 
                                        textAlign: 'center', 
                                        background: style.bg,
                                        color: style.text,
                                        borderRadius: '8px', 
                                        fontWeight: 'bold'
                                    }}>
                                        {style.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* --- SECTION 2: AVAILABLE CABS --- */}
            <h2 className="dashboard-heading">Available Services</h2>
            <div className="cards-container">
                {cabs.length > 0 ? (
                    cabs.map(cab => (
                        <div key={cab.id} className="room-card">
                            <h3>{cab.carModel}</h3>
                            <p style={{fontSize: '1rem', color: '#6b7280'}}>Type: {cab.cabType}</p>
                            <p style={{fontSize: '1rem', color: '#6b7280'}}>Driver: {cab.driverName}</p>
                            <p className="room-price">₹{cab.pricePerKm} / km</p>
                            <button onClick={() => handleBookCab(cab)} className="book-now-button">Request Cab</button>
                        </div>
                    ))
                ) : (
                    <p style={{color: '#6b7280'}}>No cabs available at the moment.</p>
                )}
            </div>
        </div>
    );
}