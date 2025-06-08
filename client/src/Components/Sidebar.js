// this is the side bar for the navigation between the home,items,add items page in the inventory management system
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-profile">
        <h2>InventoryPro</h2>
      </div>
      <nav className="sidebar-nav">
       <Link to="/">Home</Link>
      <Link to="/items">Items</Link>
      <Link to="/additem">Add Item</Link>
      </nav>
      <div className="sidebar-footer">
        {isLoggedIn ? (
          <button className="sidebar-logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="sidebar-link">🔐 Login</Link>
            <Link to="/register" className="sidebar-link">📝 Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
