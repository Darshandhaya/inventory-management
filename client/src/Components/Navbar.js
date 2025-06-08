import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedInUsername, setLoggedInUsername] = useState('');

  // Check login status and get username from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); // Assume username is stored here

    if (token && username) {
      setLoggedInUsername(username);
    } else {
      setLoggedInUsername(''); // Clear if not logged in or username not found
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Clear username on logout
    setLoggedInUsername(''); // Update state to reflect logout
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists

  return (
    <nav className="navbar">
      <div className="navbar-left"> 
       
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span className="username">Welcome, {loggedInUsername || 'User'} 👋</span> 
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;