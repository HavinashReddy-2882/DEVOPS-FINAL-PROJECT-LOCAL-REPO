import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import NotFound from '../pages/public/NotFound';

export default function MainNavbar() {
  return (
    <div>
      <nav className="public-navbar">
        <div className="public-logo">
          <h3>🏨 HotelHub</h3>
        </div>
        <ul className="public-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register" className="nav-btn-primary">Register Now</Link></li>
        </ul>
      </nav>

      {/* Public Routes Wrapper */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}