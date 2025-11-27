import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import ViewAllRooms from '../pages/customer/ViewAllRooms';
import ViewDining from '../pages/customer/ViewDining';
import ViewCabs from '../pages/customer/ViewCabs';
import MyBookings from '../pages/customer/MyBookings';
import Profile from '../pages/customer/Profile';

export default function CustomerNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="app-container">
      <div className="vertical-navbar">
        <div className="sidebar-header">
          <h3>HotelHub</h3>
          <p>Hello, {user.name}</p>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/rooms">Book Room</Link></li>
            <li><Link to="/dining">Dining Menu</Link></li>
            <li><Link to="/cabs">Cab Services</Link></li>
            <li><Link to="/my-bookings">My Bookings</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </ul>
        </nav>
      </div>
      <div className="content-area">
        <Routes>
          <Route path="/" element={<CustomerDashboard />} />
          <Route path="/rooms" element={<ViewAllRooms />} />
          <Route path="/dining" element={<ViewDining />} />
          <Route path="/cabs" element={<ViewCabs />} />
          
          {/* 👇 FIXED: Changed path from "/bookings" to "/my-bookings" to match the Link */}
          <Route path="/my-bookings" element={<MyBookings />} />
          
          <Route path="/profile" element={<Profile />} />
          
          {/* Catch-all to prevent white screens on bad URLs */}
          <Route path="*" element={<CustomerDashboard />} />
        </Routes>
      </div>
    </div>
  );
}