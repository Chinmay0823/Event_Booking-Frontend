import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Event Booking System</h1>
      <p>Discover, Book, and Manage your events</p>

      <div className="home-buttons">
        <Link to="/events" className="home-btn green">View Events</Link>
        <Link to="/create-event" className="home-btn blue">Create Event</Link>
        <Link to="/dashboard" className="home-btn orange">Dashboard</Link>
        <Link to="/booking-history" className="home-btn purple">Booking History</Link>
      </div>
    </div>
  );
};

export default HomePage;
