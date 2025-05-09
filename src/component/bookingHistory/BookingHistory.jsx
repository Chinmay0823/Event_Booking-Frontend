import React, { useEffect, useState } from 'react';
import API from '../../services/api/api';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [cancelMessage, setCancelMessage] = useState('');
  const [cancelError, setCancelError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/events/bookings?page=${currentPage}&limit=10`);
        setBookings(response.data.bookings);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching booking history:', err);
        setError('Failed to load booking history');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentPage]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await API.put(`/events/cancel/${bookingId}`);
      setCancelMessage(response.data.message);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.bookingId === bookingId ? { ...booking, status: 'Canceled' } : booking
        )
      );
    } catch (err) {
      console.error('Cancel booking error:', err);
      setCancelError('Failed to cancel booking');
    }
  };

  return (
    <div>
      <h2>Your Booking History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cancelMessage && <p style={{ color: 'green' }}>{cancelMessage}</p>}
      {cancelError && <p style={{ color: 'red' }}>{cancelError}</p>}
      {loading && <p>Loading bookings...</p>}
      <div>
        {bookings.length === 0 ? (
          <p>You have no bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking.bookingId} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc' }}>
              <h3>{booking.eventTitle}</h3>
              <p><strong>Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Booked At:</strong> {new Date(booking.bookedAt).toLocaleDateString()}</p>
              {booking.status !== 'Canceled' && (
                <button
                  onClick={() => handleCancelBooking(booking.bookingId)}
                  style={{ padding: '10px', backgroundColor: '#FF5733', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>{` Page ${currentPage} of ${totalPages} `}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingHistory;
