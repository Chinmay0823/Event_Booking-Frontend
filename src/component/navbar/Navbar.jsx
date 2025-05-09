import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Optional CSS for styling

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">BookingEvent</Link>
      </div>
      <ul className="navbar-links">
        {isLoggedIn ? (
          <>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/create-event">Create Event</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/booking-history">Booking History</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
