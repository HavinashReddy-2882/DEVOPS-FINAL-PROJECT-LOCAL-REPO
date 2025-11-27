import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function CabRequests() {
    const [requests, setRequests] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await api.get(`/manager/cabrequests/${user.id}`);
            setRequests(res.data);
        } catch (error) {
            console.error("Error fetching requests", error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.get(`/manager/updatecabstatus/${id}/${status}`);
            alert(`Request marked as ${status}`);
            fetchRequests(); // Refresh list
        } catch (error) {
            alert("Failed to update status");
        }
    };

    return (
        <div className="management-container">
            <h1 style={{marginBottom: '20px'}}>Cab Service Requests</h1>
            
            {requests.length === 0 ? (
                <p>No active cab requests.</p>
            ) : (
                <table className="management-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Customer Name</th>
                            <th>Car Model</th>
                            <th>Driver</th>
                            <th>Current Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req.id}>
                                <td>#{req.id}</td>
                                <td>{req.customer.name}</td>
                                <td>{req.cab.carModel} ({req.cab.cabType})</td>
                                <td>{req.cab.driverName}</td>
                                <td>
                                    <span style={{
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        background: req.status === 'PENDING' ? '#fef3c7' : '#dcfce7',
                                        color: req.status === 'PENDING' ? '#92400e' : '#166534',
                                        fontWeight: 'bold',
                                        fontSize: '0.85rem'
                                    }}>
                                        {req.status}
                                    </span>
                                </td>
                                <td>
                                    {req.status === 'PENDING' ? (
                                        <button 
                                            onClick={() => updateStatus(req.id, 'ON_THE_WAY')} 
                                            className="add-button" 
                                            style={{margin:0, background: '#10b981', padding: '8px 15px'}}
                                        >
                                            Accept & Allot
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => updateStatus(req.id, 'COMPLETED')} 
                                            className="edit-button" 
                                            style={{margin:0, background: '#3b82f6', padding: '8px 15px'}}
                                        >
                                            Mark Completed
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}