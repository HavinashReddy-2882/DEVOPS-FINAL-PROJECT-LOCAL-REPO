import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function ManageFood() {
    const [foodItems, setFoodItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    
    const [newItem, setNewItem] = useState({ 
        name: '', 
        category: '', 
        price: '', 
        type: 'Veg' 
    });
    
    const { user } = useAuth();

    useEffect(() => { 
        if (user) fetchFood(); 
    }, [user]);

    const fetchFood = async () => {
        try {
            const res = await api.get(`/manager/viewfood/${user.id}`);
            setFoodItems(res.data);
        } catch (error) {
            console.error("Error fetching food:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/manager/addfood', { 
                ...newItem, 
                manager: { id: user.id } 
            });
            alert("Food Item Added Successfully!");
            setNewItem({ name: '', category: '', price: '', type: 'Veg' });
            setShowForm(false); // Close form after adding
            fetchFood();
        } catch (error) {
            alert("Failed to add food item.");
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Delete this item?")) {
            await api.delete(`/manager/deletefood/${id}`);
            fetchFood();
        }
    };

    return (
        <div className="management-container">
            {/* Header Section */}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <h1 style={{margin: 0}}>Manage Food Menu</h1>
                <button 
                    onClick={() => setShowForm(!showForm)} 
                    className="add-button" 
                    style={{margin: 0, backgroundColor: showForm ? '#ef4444' : '#10b981'}}
                >
                    {showForm ? 'Close Form' : '+ Add New Item'}
                </button>
            </div>

            {/* Add Food Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="add-form">
                    <div className="form-group">
                        <label>Item Name</label>
                        <input 
                            placeholder="e.g. Chicken Biryani" 
                            value={newItem.name} 
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input 
                            placeholder="e.g. Starter, Main Course, Dessert" 
                            value={newItem.category} 
                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input 
                            placeholder="e.g. 250" 
                            type="number" 
                            value={newItem.price} 
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Type</label>
                        <select 
                            value={newItem.type} 
                            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                        >
                            <option value="Veg">Veg</option>
                            <option value="Non-Veg">Non-Veg</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit-button" style={{marginTop: '24px'}}>
                            Add to Menu
                        </button>
                    </div>
                </form>
            )}

            {/* Food Table */}
            <table className="management-table">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems.map(item => (
                        <tr key={item.id}>
                            <td style={{fontWeight: 'bold'}}>{item.name}</td>
                            <td>{item.category}</td>
                            <td>
                                <span style={{
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold',
                                    background: item.type === 'Veg' ? '#dcfce7' : '#fee2e2',
                                    color: item.type === 'Veg' ? '#166534' : '#991b1b'
                                }}>
                                    {item.type}
                                </span>
                            </td>
                            <td>₹{item.price}</td>
                            <td>
                                <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}