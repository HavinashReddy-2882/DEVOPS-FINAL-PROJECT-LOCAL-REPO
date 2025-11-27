import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function ManageRooms() {
    const [rooms, setRooms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    // Initial state
    const [currentRoom, setCurrentRoom] = useState({ 
        id: null, 
        roomNumber: '', 
        type: '', 
        pricePerNight: '', 
        available: true 
    });
    
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchRooms();
        }
    }, [user]);

    const fetchRooms = async () => {
        try {
            const response = await api.get(`/manager/viewmyrooms/${user.id}`);
            setRooms(response.data);
        } catch (error) {
            console.error("Failed to fetch rooms:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentRoom({ 
            ...currentRoom, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. Prepare data (DO NOT include 'manager' object inside)
        const roomData = {
            id: currentRoom.id,
            roomNumber: currentRoom.roomNumber,
            type: currentRoom.type,
            pricePerNight: parseFloat(currentRoom.pricePerNight), // Ensure number
            available: currentRoom.available // Ensure boolean
        };

        // For Update, backend needs manager ID inside body
        if (isEditing) {
            roomData.manager = { id: user.id };
        }

        console.log("Sending Data:", roomData); 

        try {
            if (isEditing) {
                // Update: ID inside body
                await api.post('/manager/updateroom', roomData);
                alert("Room updated successfully!");
            } else {
                // Add: Manager ID in URL (Crucial Fix)
                await api.post(`/manager/addroom/${user.id}`, roomData);
                alert("Room added successfully!");
            }
            
            // 2. Reset and Refresh
            resetForm();
            fetchRooms();
            
        } catch (error) {
            console.error("Error submitting room:", error);
            alert("Operation failed. Check console for details.");
        }
    };

    const handleEdit = (room) => {
        setIsEditing(true);
        setCurrentRoom(room);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            try {
                await api.delete(`/manager/deleteroom/${id}`);
                alert("Room deleted successfully!");
                fetchRooms();
            } catch (error) {
                alert("Failed to delete room.");
            }
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setCurrentRoom({ id: null, roomNumber: '', type: '', pricePerNight: '', available: true });
    };

    return (
        <div className="management-container">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <h1 style={{margin: 0}}>Manage Hotel Rooms</h1>
                <button onClick={() => { setShowForm(!showForm); if (isEditing) resetForm(); }} className="add-button" style={{margin: 0}}>
                    {showForm && !isEditing ? 'Close Form' : '+ Add New Room'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="add-form">
                    <div className="form-group">
                        <label>Room Number</label>
                        <input type="text" name="roomNumber" value={currentRoom.roomNumber} onChange={handleInputChange} placeholder="e.g. C-101" required />
                    </div>
                    
                    <div className="form-group">
                        <label>Room Type</label>
                        <input type="text" name="type" value={currentRoom.type} onChange={handleInputChange} placeholder="e.g. Deluxe, Suite" required />
                    </div>
                    
                    <div className="form-group">
                        <label>Price Per Night (₹)</label>
                        <input type="number" name="pricePerNight" value={currentRoom.pricePerNight} onChange={handleInputChange} placeholder="e.g. 1500" required />
                    </div>
                    
                    <div className="form-group" style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <label className="checkbox-label" style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', margin: 0}}>
                            <input 
                                type="checkbox" 
                                name="available" 
                                checked={currentRoom.available} 
                                onChange={handleInputChange} 
                                style={{width: '20px', height: '20px'}}
                            />
                            <span style={{fontSize: '1rem', fontWeight: '600'}}>Mark as Available</span>
                        </label>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit-button" style={{marginTop: '24px'}}>
                            {isEditing ? 'Update Room' : 'Add Room'}
                        </button>
                    </div>
                </form>
            )}

            <table className="management-table">
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Type</th>
                        <th>Price/Night</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.id}>
                            <td>{room.roomNumber}</td>
                            <td>{room.type}</td>
                            <td>₹{parseFloat(room.pricePerNight).toFixed(2)}</td>
                            <td>
                                <span style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold',
                                    backgroundColor: room.available ? '#dcfce7' : '#fee2e2',
                                    color: room.available ? '#166534' : '#991b1b'
                                }}>
                                    {room.available ? 'Available' : 'Unavailable'}
                                </span>
                            </td>
                            <td className="action-buttons">
                                <button onClick={() => handleEdit(room)} className="edit-button">Edit</button>
                                <button onClick={() => handleDelete(room.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}