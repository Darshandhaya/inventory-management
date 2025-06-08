import React, { useState } from 'react';
import API from './api';
import './AddItem.css';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import sampleItems from './SampleItem'; 

const AddItem = () => {
  const [form, setForm] = useState({ itemName: '', quantity: '', price: '', description: '', category: '' }); 
  const [message, setMessage] = useState('');

  const addItem = async (e) => {
    e.preventDefault();
    try {
      await API.post('/items', form);
      setForm({ itemName: '', quantity: '', price: '', description: '', category: '' }); // Reset category
      setMessage('Item added successfully!');
      // Optional: You might want to refresh the Home/Items page data after adding an item if it's visible or you navigate there
    } catch (err) {
      console.error('Error adding item:', err.response?.data || err.message);
      setMessage('Failed to add item. Please check the console for details.');
    }
  };

  return (
    <div className="add-item-page">
      <Sidebar />
      <Navbar />
      <h2>Add New Item</h2>
      <form onSubmit={addItem} className="add-item-form">
        <input
          placeholder="Item Name"
          value={form.itemName}
          onChange={e => setForm({ ...form, itemName: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
        />
        <input // Added input for category
          placeholder="Category (e.g., Electronics, Stationery)"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>
      {message && <p className="form-message">{message}</p>}

      {/* Display Sample Items  */}
      <h2 style={{ marginTop: '40px' }}>Sample Items for Reference</h2>
      {sampleItems.length > 0 ? (
        <ul className="sample-items-list">
          {sampleItems.map(item => (
            <li key={item._id} className="sample-item-card">
              <h3>{item.itemName}</h3>
              <p>Qty: {item.quantity}</p>
              <p>Category: {item.category || 'N/A'}</p> {/* Display category */}
              <p>Price: ₹{item.price}</p>
              {item.description && <p className="sample-item-description">{item.description}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No sample items available.</p>
      )}
    </div>
  );
};

export default AddItem;