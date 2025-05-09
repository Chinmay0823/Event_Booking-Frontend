import React, { useState, useEffect } from 'react';
import API from '../../services/api/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  // Fetch user data and bookings from API (you can modify this based on user authentication)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get('/user/data'); // Change this to your API endpoint to get user info
        setUserData(response.data);
        const bookingsResponse = await API.get('/events/bookings'); // Fetch bookings for the user
        setBookings(bookingsResponse.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userData && (
        <div>
          <h3>Welcome, {userData.username}!</h3>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h3>Your Bookings</h3>
        {bookings.length > 0 ? (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.bookingId}>
                <h4>{booking.eventTitle}</h4>
                <p><strong>Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {booking.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no bookings yet.</p>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Manage Your Events</h3>
        <Link to="/create-event" style={{ padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          Create Event
        </Link>
        <br />
        <Link to="/events" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', textDecoration: 'none', marginTop: '10px' }}>
          View All Events
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
