import React from 'react';
import BookEvent from '../bookingHistory/BookingEvent';

const EventCard = ({ event }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Price:</strong> ${event.price}</p>
      
      <BookEvent eventId={event._id} />  {/* Include the BookEvent component */}
    </div>
  );
};

export default EventCard;
