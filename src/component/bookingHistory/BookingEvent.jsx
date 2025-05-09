import React, { useState } from 'react';
import API from '../../services/api/api';
import { useNavigate } from 'react-router-dom';

const BookEvent = ({ eventId }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      const response = await API.post('/events/book', { eventId });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/');  
      }, 1500); 
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.response?.data?.message || 'Failed to book event');
    }
  };

  return (
    <div>
      <button onClick={handleBooking} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
        Book Event
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BookEvent;
