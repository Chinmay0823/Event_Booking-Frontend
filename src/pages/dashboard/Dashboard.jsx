import React, { useState, useEffect } from 'react';
import API from '../../services/api/api';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get('/user/data');
        setUserData(response.data);
        const bookingsResponse = await API.get('/events/bookings');
        setBookings(bookingsResponse.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userData && (
        <div className="dashboard-user-info">
          <h3>Welcome, {userData.username}!</h3>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
        </div>
      )}

      <div className="dashboard-bookings">
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

      <div className="dashboard-actions">
        <Link to="/create-event">Create Event</Link>
        <Link to="/events">View All Events</Link>
      </div>
    </div>
  );
};

export default Dashboard;
