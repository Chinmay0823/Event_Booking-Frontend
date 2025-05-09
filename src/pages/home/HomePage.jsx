import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the Event Booking System</h1>
      <p>Discover, Book, and Manage your events</p>
      
      <div style={{ marginTop: '30px' }}>
        <Link to="/events" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          View Events
        </Link>
      </div>
      
      <div style={{ marginTop: '10px' }}>
        <Link to="/create-event" style={{ padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          Create Event
        </Link>
      </div>

      <div style={{ marginTop: '10px' }}>
        <Link to="/dashboard" style={{ padding: '10px 20px', backgroundColor: '#f39c12', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
