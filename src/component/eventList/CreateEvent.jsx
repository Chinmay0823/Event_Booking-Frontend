import React, { useState } from 'react';
import API from '../../services/api/api';
  import './CreateEvent.css'; 

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    price: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

 

  return (
    <div className="create-event-container">
  <h2>Create New Event</h2>

 

  {message && <p className="message">{message}</p>}
  {error && <p className="error">{error}</p>}

  <form onSubmit={handleSubmit}>
    <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
    <textarea name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} required />
    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
    <input type="number" name="price" placeholder="Price (optional)" value={formData.price} onChange={handleChange} />
    <button type="submit">Create Event</button>
  </form>
</div>

  );
};

export default CreateEvent;
