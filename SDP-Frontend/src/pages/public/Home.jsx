import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Experience Luxury <br /> Like Never Before</h1>
        <p>
          Discover world-class amenities, fine dining, and premium cab services. 
          Your perfect stay awaits at HotelHub.
        </p>
        <Link to="/login" className="nav-btn-primary" style={{fontSize: '1.2rem', padding: '1rem 2.5rem'}}>
          Book Your Stay
        </Link>
      </div>
    </div>
  );
}