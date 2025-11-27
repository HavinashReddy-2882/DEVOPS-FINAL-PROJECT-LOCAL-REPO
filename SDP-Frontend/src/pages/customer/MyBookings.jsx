import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = async () => {
        try {
            const response = await api.get(`/customer/viewmybookings/${user.id}`);
            setBookings(response.data);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (booking) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            const updatedBooking = { ...booking, status: 'Cancelled' };
            try {
                await api.post('/customer/updatebooking', updatedBooking);
                alert("Booking cancelled successfully.");
                fetchBookings();
            } catch (error) {
                alert("Could not cancel the booking.");
            }
        }
    };

    if (loading) return <div className="dashboard-container"><p>Loading...</p></div>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-heading">My Room Bookings</h1>
            
            {bookings.length > 0 ? (
                <div className="cards-container">
                    {bookings.map(booking => (
                        <div key={booking.id} className="stat-card" 
                             style={{
                                 borderLeft: booking.status === 'Confirmed' ? '5px solid #10b981' : '5px solid #ef4444',
                                 position: 'relative'
                             }}>
                            
                            {/* Header: Hotel Name & ID */}
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                <h3 style={{margin: 0, color: '#4f46e5', fontSize: '1.1rem'}}>
                                    {booking.room?.manager?.hotelName || "Unknown Hotel"}
                                </h3>
                                <span style={{fontSize: '0.85rem', color: '#6b7280', fontWeight: 'bold'}}>
                                    #{booking.id}
                                </span>
                            </div>

                            {/* Body: Room Details */}
                            <p style={{fontSize: '1.5rem', margin: '5px 0', fontWeight: '700', color: '#1f2937'}}>
                                Room {booking.room?.roomNumber}
                            </p>
                            <p style={{fontSize: '0.95rem', color: '#6b7280', marginBottom: '15px'}}>
                                📅 {booking.checkInDate} ➔ {booking.checkOutDate}
                            </p>

                            {/* Footer: Status Badge & Action */}
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto'}}>
                                <span style={{
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    fontSize: '0.85rem',
                                    background: booking.status === 'Confirmed' ? '#dcfce7' : '#fee2e2',
                                    color: booking.status === 'Confirmed' ? '#166534' : '#991b1b'
                                }}>
                                    {booking.status === 'Confirmed' ? '✅ Confirmed' : '❌ Cancelled'}
                                </span>

                                {booking.status !== 'Cancelled' && (
                                    <button 
                                        onClick={() => handleCancelBooking(booking)} 
                                        className="delete-button"
                                        style={{margin: 0, padding: '8px 16px'}}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="stat-card" style={{textAlign: 'center', padding: '40px', color: '#6b7280'}}>
                    <h3>No Bookings Found</h3>
                    <p style={{fontSize: '1rem', margin: '15px 0'}}>You haven't booked any rooms yet.</p>
                </div>
            )}
        </div>
    );
}