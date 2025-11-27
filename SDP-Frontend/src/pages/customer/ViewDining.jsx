import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function ViewDining() {
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/customer/viewfoodmenu');
                setFoodItems(res.data);
            } catch(e) { console.error(e); }
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-heading">Hotel Dining Menu</h1>
            <div className="cards-container">
                {foodItems.map(item => (
                    <div key={item.id} className="stat-card" style={{borderLeft: item.type === 'Veg' ? '4px solid #10b981' : '4px solid #ef4444'}}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <h3 style={{color: '#111827', fontSize: '1.2rem'}}>{item.name}</h3>
                            <span style={{
                                background: item.type === 'Veg' ? '#dcfce7' : '#fee2e2',
                                color: item.type === 'Veg' ? '#166534' : '#991b1b',
                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
                            }}>{item.type}</span>
                        </div>
                        <p style={{fontSize: '1rem', color: '#6b7280', margin: '10px 0'}}>
                            Category: {item.category} <br/>
                            <small>Served by: {item.manager.hotelName}</small>
                        </p>
                        <div style={{marginTop: 'auto', fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5'}}>
                            ₹{item.price}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}