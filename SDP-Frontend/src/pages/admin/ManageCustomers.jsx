import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // 👈 Updated import

export default function ManageCustomers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const response = await api.get('/admin/viewallcustomers'); // 👈 Updated
        setCustomers(response.data);
    };

    const handleDeleteCustomer = async (id) => {
        if (window.confirm("Are you sure?")) {
            await api.delete(`/admin/deletecustomer/${id}`); // 👈 Updated
            alert("Customer deleted successfully!");
            fetchCustomers();
        }
    };

    return (
        <div className="management-container">
            <h1>Manage Customers</h1>
            <table className="management-table">
                <thead>
                    <tr>
                        <th>ID</th><th>Name</th><th>Username</th><th>Email</th><th>Contact</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.username}</td>
                            <td>{customer.email}</td>
                            <td>{customer.contact}</td>
                            <td><button onClick={() => handleDeleteCustomer(customer.id)} className="delete-button">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}