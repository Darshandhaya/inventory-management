import React, { useEffect, useState } from 'react';
import API from './api';
import './Items.css';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';

const Items = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await API.get('/items');
    setItems(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    await API.delete(`/items/${id}`);
    setItems(items.filter(item => item._id !== id));
  };

  const handleEditClick = (item) => {
    setEditingItem(item._id);
    setFormData({
      itemName: item.itemName,
      quantity: item.quantity,
      price: item.price,
      description: item.description || ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await API.put(`/items/${editingItem}`, formData);
    setEditingItem(null);
    setFormData({ itemName: '', quantity: '', price: '', description: '' });
    fetchItems();
  };

  return (
    <div className="items-page">
      <Sidebar />
      <Navbar />
     
      <h2>Items List</h2>

      {editingItem ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <input
            placeholder="Item Name"
            value={formData.itemName}
            onChange={e => setFormData({ ...formData, itemName: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingItem(null)}>Cancel</button>
        </form>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item._id}>
              <strong>{item.itemName}</strong> - {item.quantity} pcs - ₹{item.price}
              <br />
              {item.description && <small>{item.description}</small>} <br />
              <button onClick={() => handleEditClick(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Items;
