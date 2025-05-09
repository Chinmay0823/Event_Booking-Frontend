import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Form data being sent:", formData); 
      const response = await API.post('/auth/login', formData);
      console.log(response.data);
      localStorage.setItem('token', response.data.token); 
      navigate('/'); 
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    }
  };
  
  return (
    <div className=''style={{ padding: '20px', maxWidth: '400px', margin: 'auto', border: '1px solid #ccc', 
        borderRadius: '5px',display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1 style={{ textAlign: 'center' }}>Booking Event</h1>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p>
  Don't have an account? <a href="/register">Register here</a>
</p>
      </form>
    </div>
  );
};

export default Login;
