import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ token, setToken }) => {
  const [lowStock, setLowStock] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const low = data.filter(p => p.quantity <= p.reorderLevel);
        setLowStock(low);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLowStock();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Inventory and Asset Management System</p>

      {/* Low Stock Alerts */}
      <div>
        <h3>Low Stock Alerts</h3>
        {lowStock.length === 0 ? (
          <p>All stocks are sufficient.</p>
        ) : (
          <ul>
            {lowStock.map(p => (
              <li key={p._id}>
                {p.name} (SKU: {p.sku}) – Stock: {p.quantity} / Reorder Level: {p.reorderLevel}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Navigation buttons */}
      <button onClick={() => navigate('/products')}>Manage Products</button>
      <button onClick={() => navigate('/transactions')}>Stock Transactions</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;