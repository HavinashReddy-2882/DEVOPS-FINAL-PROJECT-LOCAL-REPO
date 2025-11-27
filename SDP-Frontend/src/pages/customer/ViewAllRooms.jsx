import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ViewAllRooms() {
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllRooms();
    }, []);

    const fetchAllRooms = async () => {
        try {
            const response = await api.get('/customer/rooms');
            setRooms(response.data);
        } catch (error) {
            console.error("Could not fetch rooms", error);
        }
    };

    const handleBookNowClick = (room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        if (!checkInDate || !checkOutDate) {
            alert("Please select both check-in and check-out dates.");
            return;
        }

        const bookingData = {
            customer: { id: user.id },
            room: { id: selectedRoom.id },
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            status: 'Confirmed'
        };

        try {
            await api.post('/customer/bookroom', bookingData);
            alert(`Room #${selectedRoom.roomNumber} booked successfully!`);
            setIsModalOpen(false);
            setSelectedRoom(null);
            navigate('/my-bookings'); // Navigate to my bookings page
        } catch (error) {
            alert("Failed to book room. Please try again.");
            console.error("Booking error:", error);
        }
    };

    return (
        <div>
            <h1>Available Rooms for Booking</h1>
            <div className="room-cards-container">
                {rooms.length > 0 ? (
                    rooms.map(room => (
                        <div key={room.id} className="room-card">
                            <h3>{room.type} Room - #{room.roomNumber}</h3>
                            <p><strong>Hotel:</strong> {room.manager.hotelName}</p>
                            <p className="room-price">${parseFloat(room.pricePerNight).toFixed(2)} / night</p>
                            <button onClick={() => handleBookNowClick(room)} className="book-now-button">Book Now</button>
                        </div>
                    ))
                ) : (
                    <p>No available rooms found at the moment.</p>
                )}
            </div>

            {isModalOpen && selectedRoom && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Book Room #{selectedRoom.roomNumber}</h2>
                        <p><strong>Hotel:</strong> {selectedRoom.manager.hotelName}</p>
                        <p><strong>Type:</strong> {selectedRoom.type}</p>
                        <form onSubmit={handleConfirmBooking}>
                            <div className="form-group">
                                <label>Check-in Date:</label>
                                <input type="date" onChange={(e) => setCheckInDate(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Check-out Date:</label>
                                <input type="date" onChange={(e) => setCheckOutDate(e.target.value)} required />
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="submit-button">Confirm Booking</button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="cancel-edit-button">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}