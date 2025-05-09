import React from 'react';
import BookEvent from '../bookingHistory/BookingEvent';
import './EventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3 className="event-title">{event.title}</h3>
      <p className="event-description">{event.description}</p>
      <p className="event-detail">
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="event-detail">
        <strong>Price:</strong> ${event.price}
      </p>

      <div className="event-action">
        <BookEvent eventId={event._id} />
      </div>
    </div>
  );
};

export default EventCard;
