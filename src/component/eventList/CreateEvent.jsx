import React, { useState } from 'react';
import API from '../../services/api/api';
import { useNavigate } from 'react-router-dom'; // Use useNavigate hook

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    price: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await API.post('/events/create', formData);
      setMessage(response.data.message);
      setFormData({ title: '', description: '', date: '', price: '' });
    } catch (err) {
      console.error('Create event error:', err);
      setError(err.response?.data?.message || 'Failed to create event');
    }
  };

  const handleCreateEvent = () => {
    navigate('/events'); 
  };

  return (
    <div>
      <h2>Create New Event</h2>
      <button 
        onClick={handleCreateEvent} 
        style={{ padding: '10px', margin: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
        Back to Event List
      </button>
      
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        /><br />

        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
        /><br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        /><br />

        <input
          type="number"
          name="price"
          placeholder="Price (optional)"
          value={formData.price}
          onChange={handleChange}
        /><br />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
