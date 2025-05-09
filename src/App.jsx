import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/HomePage'; 
import EventList from './component/eventList/EventList';
import CreateEvent from './component/eventList/CreateEvent';
import Dashboard from './pages/dashboard/Dashboard'; 
import BookingHistory from './component/bookingHistory/BookingHistory';
import BookingEvent from './component/bookingHistory/BookingEvent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/events" element={<EventList />} />  
        <Route path="/create-event" element={<CreateEvent />} />  
        <Route path="/dashboard" element={<Dashboard />} />  
        <Route path="/booking-history" element={<BookingHistory />} /> 
        <Route path="/booking/:bookingId" element={<BookingEvent />} />  
      </Routes>
    </Router>
  );
};

export default App;
