import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import './Register.css'; 

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',          
    password: '',
    phoneNumber: ''     
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // Send all form data (username, email, password, phoneNumber) to the backend
      const res = await API.post('/api/auth/register', form);
      setMessage(res.data.message || 'Registration successful! You can now log in.');
      setTimeout(() => {
        navigate('/login'); // Redirect to login after a short delay
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message); 
      setMessage(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value 
    });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text" 
            name="username" 
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="email" 
            name="email" 
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password" 
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="tel" 
            name="phoneNumber" 
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number (Optional)"
            
          />

          <button type="submit" className="register-button">Register</button>
          {message && <p className="form-message">{message}</p>}
          <p>Already have an account? <Link to="/login" className="login-link">Login here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;