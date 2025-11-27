import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function ViewBookings() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const fetchBookings = async () => {
                try {
                    const response = await api.get(`/manager/viewbookings/${user.id}`);
                    setBookings(response.data);
                } catch (error) {
                    console.error("Failed to fetch bookings:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchBookings();
        }
    }, []); // 👈 The dependency array is now empty to always fetch fresh data

    if (isLoading) {
        return <div className="management-container"><h1>Loading bookings...</h1></div>;
    }

    return (
        <div className="management-container">
            <h1>Customer Bookings</h1>
            {bookings.length > 0 ? (
                <table className="management-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Customer Name</th>
                            <th>Room Number</th>
                            <th>Check-in Date</th>
                            <th>Check-out Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.customer.name}</td>
                                <td>{booking.room.roomNumber}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>There are no bookings for your hotel's rooms yet.</p>
            )}
        </div>
    );
}