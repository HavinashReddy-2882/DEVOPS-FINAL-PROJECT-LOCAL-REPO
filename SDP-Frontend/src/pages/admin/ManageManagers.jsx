import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // 👈 Updated import

export default function ManageManagers() {
    const [managers, setManagers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newManager, setNewManager] = useState({
        name: "", username: "", password: "", hotelName: "", email: "", contact: "", address: ""
    });

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = async () => {
        const response = await api.get('/admin/viewallmanagers'); // 👈 Updated
        setManagers(response.data);
    };

    const handleAddManager = async (e) => {
        e.preventDefault();
        await api.post('/admin/addmanager', newManager); // 👈 Updated
        alert("Manager added successfully!");
        fetchManagers();
        setShowAddForm(false);
        setNewManager({ name: "", username: "", password: "", hotelName: "", email: "", contact: "", address: "" });
    };

    const handleDeleteManager = async (id) => {
        if (window.confirm("Are you sure?")) {
            await api.delete(`/admin/deletemanager/${id}`); // 👈 Updated
            alert("Manager deleted successfully!");
            fetchManagers();
        }
    };
    
    // ... rest of the component is the same ...
    const handleInputChange = (e) => {
        setNewManager({ ...newManager, [e.target.name]: e.target.value });
    };

    return (
        <div className="management-container">
            <h1>Manage Hotel Managers</h1>
            <button onClick={() => setShowAddForm(!showAddForm)} className="add-button">
                {showAddForm ? 'Cancel' : 'Add New Manager'}
            </button>

            {showAddForm && (
                <form onSubmit={handleAddManager} className="add-form">
                    <input type="text" name="name" value={newManager.name} onChange={handleInputChange} placeholder="Full Name" required />
                    <input type="text" name="username" value={newManager.username} onChange={handleInputChange} placeholder="Username" required />
                    <input type="password" name="password" value={newManager.password} onChange={handleInputChange} placeholder="Password" required />
                    <input type="text" name="hotelName" value={newManager.hotelName} onChange={handleInputChange} placeholder="Hotel Name" required />
                    <input type="email" name="email" value={newManager.email} onChange={handleInputChange} placeholder="Email" required />
                    <input type="text" name="contact" value={newManager.contact} onChange={handleInputChange} placeholder="Contact" required />
                    <input type="text" name="address" value={newManager.address} onChange={handleInputChange} placeholder="Address" required />
                    <button type="submit">Submit</button>
                </form>
            )}

            <table className="management-table">
                <thead>
                    <tr>
                        <th>ID</th><th>Name</th><th>Username</th><th>Hotel</th><th>Email</th><th>Contact</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map(manager => (
                        <tr key={manager.id}>
                            <td>{manager.id}</td>
                            <td>{manager.name}</td>
                            <td>{manager.username}</td>
                            <td>{manager.hotelName}</td>
                            <td>{manager.email}</td>
                            <td>{manager.contact}</td>
                            <td><button onClick={() => handleDeleteManager(manager.id)} className="delete-button">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}