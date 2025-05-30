import React, { useEffect, useState } from 'react';
import API from '../../services/api/api';
import EventCard from './EventCard';
import './EventList.css'; 

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async (page) => {
    try {
      setLoading(true);
      const response = await API.get(`/events?page=${page}&limit=10`);
      setEvents(response.data.events);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  return (
    <div className="event-list-container">
      <h2>Available Events</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading && <p style={{ textAlign: 'center' }}>Loading events...</p>}
      <div className="event-cards">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
  
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default EventList;
