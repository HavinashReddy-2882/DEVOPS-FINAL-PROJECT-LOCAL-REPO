import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ManagerDashboard from '../pages/manager/ManagerDashboard';
import ManageRooms from '../pages/manager/ManageRooms';
import ViewBookings from '../pages/manager/ViewBookings';
import ManageFood from '../pages/manager/ManageFood';
import ManageCabs from '../pages/manager/ManageCabs';
import CabRequests from '../pages/manager/CabRequests'; // 👈 Import new page

export default function ManagerNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <div className="vertical-navbar">
        <div className="sidebar-header">
          <h3>HotelHub</h3>
          <p>Manager Panel</p>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/food">Food Menu</Link></li>
            <li><Link to="/cabs">Manage Fleet</Link></li> {/* Rename for clarity */}
            <li><Link to="/cab-requests">Cab Requests</Link></li> {/* 👈 New Link */}
            <li><Link to="/bookings">Room Bookings</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </ul>
        </nav>
      </div>
      <div className="content-area">
        <Routes>
          <Route path="/" element={<ManagerDashboard />} />
          <Route path="/rooms" element={<ManageRooms />} />
          <Route path="/food" element={<ManageFood />} />
          <Route path="/cabs" element={<ManageCabs />} />
          <Route path="/cab-requests" element={<CabRequests />} /> {/* 👈 New Route */}
          <Route path="/bookings" element={<ViewBookings />} />
        </Routes>
      </div>
    </div>
  );
}