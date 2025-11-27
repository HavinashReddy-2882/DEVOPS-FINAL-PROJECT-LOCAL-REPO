import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function ManageCabs() {
    const [cabs, setCabs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    
    const [newCab, setNewCab] = useState({ 
        carModel: '', 
        cabType: '4-Seater', 
        driverName: '', 
        pricePerKm: '', 
        available: true 
    });
    
    const { user } = useAuth();

    useEffect(() => { 
        if (user) fetchCabs(); 
    }, [user]);

    const fetchCabs = async () => {
        try {
            const res = await api.get(`/manager/viewcabs/${user.id}`);
            setCabs(res.data);
        } catch (error) {
            console.error("Error fetching cabs", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/manager/addcab', { 
                ...newCab, 
                manager: { id: user.id } 
            });
            alert("Cab Added Successfully!");
            setNewCab({ carModel: '', cabType: '4-Seater', driverName: '', pricePerKm: '', available: true });
            setShowForm(false);
            fetchCabs();
        } catch (error) {
            alert("Failed to add cab.");
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Remove this cab from fleet?")) {
            await api.delete(`/manager/deletecab/${id}`);
            fetchCabs();
        }
    };

    return (
        <div className="management-container">
            {/* Header Section */}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <h1 style={{margin: 0}}>Manage Fleet</h1>
                <button 
                    onClick={() => setShowForm(!showForm)} 
                    className="add-button" 
                    style={{margin: 0, backgroundColor: showForm ? '#ef4444' : '#10b981'}}
                >
                    {showForm ? 'Close Form' : '+ Add New Cab'}
                </button>
            </div>

            {/* Add Cab Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="add-form">
                    <div className="form-group">
                        <label>Car Model</label>
                        <input 
                            placeholder="e.g. Toyota Innova" 
                            value={newCab.carModel} 
                            onChange={(e) => setNewCab({ ...newCab, carModel: e.target.value })} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Driver Name</label>
                        <input 
                            placeholder="e.g. Rajesh Kumar" 
                            value={newCab.driverName} 
                            onChange={(e) => setNewCab({ ...newCab, driverName: e.target.value })} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Price Per KM (₹)</label>
                        <input 
                            placeholder="e.g. 15" 
                            type="number" 
                            value={newCab.pricePerKm} 
                            onChange={(e) => setNewCab({ ...newCab, pricePerKm: e.target.value })} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Seating Capacity</label>
                        <select 
                            value={newCab.cabType} 
                            onChange={(e) => setNewCab({ ...newCab, cabType: e.target.value })}
                        >
                            <option value="3-Seater">3-Seater</option>
                            <option value="4-Seater">4-Seater</option>
                            <option value="5-Seater">5-Seater</option>
                            <option value="7-Seater">7-Seater</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit-button" style={{marginTop: '24px'}}>
                            Add Vehicle
                        </button>
                    </div>
                </form>
            )}

            {/* Cab Table */}
            <table className="management-table">
                <thead>
                    <tr>
                        <th>Car Model</th>
                        <th>Type</th>
                        <th>Driver</th>
                        <th>Price/KM</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cabs.map(cab => (
                        <tr key={cab.id}>
                            <td style={{fontWeight: 'bold'}}>{cab.carModel}</td>
                            <td>
                                <span style={{
                                    padding: '4px 10px',
                                    borderRadius: '10px',
                                    background: '#e0e7ff',
                                    color: '#4338ca',
                                    fontWeight: 'bold',
                                    fontSize: '0.85rem'
                                }}>
                                    {cab.cabType}
                                </span>
                            </td>
                            <td>{cab.driverName}</td>
                            <td>₹{cab.pricePerKm}</td>
                            <td>
                                <button onClick={() => handleDelete(cab.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}