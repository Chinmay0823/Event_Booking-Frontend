import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className={`navbar ${isActive ? 'active' : ''}`}>
      <Link to="/" className="logo">Event Booking</Link>

      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/create-event">Create Event</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/booking-history">Booking History</Link>
        <Link to="/login" className="cta-button">Logout</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`mobile-menu ${isActive ? 'show' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/events" onClick={toggleMenu}>Events</Link>
        <Link to="/create-event" onClick={toggleMenu}>Create Event</Link>
        <Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link>
        <Link to="/booking-history" onClick={toggleMenu}>Booking History</Link>
        <Link to="/booking/:bookingId" onClick={toggleMenu}>Book Event</Link>
        <Link to="/login" onClick={toggleMenu} className="cta-button">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
