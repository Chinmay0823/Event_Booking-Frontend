import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './pages/home/HomePage';
import EventList from './component/eventList/EventList';
import CreateEvent from './component/eventList/CreateEvent';
import Dashboard from './pages/dashboard/Dashboard';
import BookingHistory from './component/bookingHistory/BookingHistory';
import BookingEvent from './component/bookingHistory/BookingEvent';
import Login from './component/login/Login';
import Register from './component/register/Register';
import Navbar from './component/navbar/Navbar';

// Check if token exists
const isAuthenticated = () => !!localStorage.getItem('token');

// Protect private routes
const PrivateRoute = ({ element }) =>
  isAuthenticated() ? element : <Navigate to="/login" replace />;

// Wrapper to show Navbar only when logged in
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/events" element={<PrivateRoute element={<EventList />} />} />
          <Route path="/create-event" element={<PrivateRoute element={<CreateEvent />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/booking-history" element={<PrivateRoute element={<BookingHistory />} />} />
          <Route path="/booking/:bookingId" element={<PrivateRoute element={<BookingEvent />} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
