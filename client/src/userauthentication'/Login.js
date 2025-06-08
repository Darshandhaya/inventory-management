// src/pages/Login.js
import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom'; 
import API from '../api'; 
import './Login.css'; 

const Login = () => {
  // State variables to hold the user's input for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Hook to programmatically navigate to different routes 
  const navigate = useNavigate();

  // Function to handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (which would reload the page)

    try {
      // Send a POST request to your backend's login endpoint It sends the collected username and password from the state
      const res = await API.post('/api/auth/login', { username, password });

      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      // If login fails, display an alert with the error message from the backend,or a generic "Login failed" if no specific message is provided. 
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    // The main container for the entire login page, applying background and centering styles
    <div className="login-page">
      
      <div className="login-container">
       
        <h2 className="login-title">Login</h2>
       
        <form onSubmit={handleLogin} className="login-form">
      
          <input
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            placeholder="Username" 
            required 
          />
          
          <input
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
        
          <button type="submit" className="login-button">Login</button>
         
          <p>
            Don't have an account? <Link to="/register" className="register-link">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login; 