import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import API from './api'; 

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Use the API utility to fetch items, similar to Items.js
    const fetchItems = async () => {
      try {
        const res = await API.get('/items');
        setItems(res.data);
        setLoading(false);
      } catch (err) {
        // More robust error handling: check for response data if available
        setError(err.message || 'Failed to fetch items. Please check your backend server.');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  //  Analytics Calculations remain the same
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + Number(item.quantity), 0);
  // Ensure item.category exists before mapping
  const uniqueCategories = [...new Set(items.map(item => item.category).filter(Boolean))];
  const totalCategories = uniqueCategories.length;

  const recentItems = items.slice(-5).reverse();

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  //  Conditional Renders remain the same
  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading inventory data...</p>
    </div>
  );

  if (error) return <p className="home-page error-msg">Error: {error}</p>;

  if (!loading && items.length === 0) return (
    <div className="empty-state">
      <h2>No items found in your inventory.</h2>
      <p>Start by adding new items to manage your stock efficiently.</p>
      <button onClick={() => navigate('/AddItems')}>Add Your First Item</button>
    </div>
  );

  return (
    <div className="home-page">
      <Sidebar />
      <Navbar />

      <h1>Welcome to InventoryPro </h1>
      <p>Manage your items efficiently and keep track of your stock.</p>

      <section className="dashboard">
        <h2>Dashboard Overview</h2>
        <div className="stats-cards">
          <div className="card">
            <h3>{totalItems}</h3>
            <p>Unique Items</p>
          </div>
          <div className="card">
            <h3>{totalCategories}</h3>
            <p>Categories</p>
          </div>
          <div className="card">
            <h3>{totalQuantity}</h3>
            <p>Total Quantity</p>
          </div>
        </div>
      </section>

      <section className="search">
        <h2>Search Items</h2>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by item name or category"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>×</button>
          )}
        </div>
      </section>

      <section className="filtered">
        <h2>Filtered Items ({filteredItems.length})</h2>
        {filteredItems.length === 0 ? (
          <p>No matching items found.</p>
        ) : (
          <ul className="items-list">
            {filteredItems.map(item => (
              <li key={item._id} className="item-card">
                <h3>{item.itemName}</h3>
                <p>Qty: {item.quantity}</p>
                <p>Category: {item.category}</p>
                <p>Price: ₹{item.price}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="recent">
        <h2>Recently Added Items</h2>
        {recentItems.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <ul className="items-list">
            {recentItems.map(item => (
              <li key={item._id} className="item-card">
                <h3>{item.itemName}</h3>
                <p>Qty: {item.quantity}</p>
                <p>Category: {item.category}</p>
                <p>Price: ₹{item.price}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <button onClick={() => navigate('/additem')}>Add New Item</button>
        <button onClick={() => navigate('/items')}>View All Items</button>
      </section>

      <footer className="footer">
        <p>Inventory Management &copy; 2025 | Version 1.0</p>
      </footer>
    </div>
  );
}

export default Home;