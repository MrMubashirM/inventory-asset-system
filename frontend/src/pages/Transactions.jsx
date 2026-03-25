import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ productId: '', type: 'in', quantity: 1, note: '' });

  useEffect(() => {
    fetchProducts();
    fetchTransactions();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/api/products', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(data);
  };

  const fetchTransactions = async () => {
    const { data } = await axios.get('http://localhost:5000/api/transactions', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTransactions(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/transactions', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();  // update product list (quantities may have changed)
      fetchTransactions();
      setForm({ productId: '', type: 'in', quantity: 1, note: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h2>Stock Transactions</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={form.productId}
          onChange={e => setForm({ ...form, productId: e.target.value })}
          required
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p._id} value={p._id}>{p.name} ({p.sku}) - Stock: {p.quantity}</option>
          ))}
        </select>
        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option value="in">Stock In</option>
          <option value="out">Stock Out</option>
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) })}
          min="1"
          required
        />
        <input
          type="text"
          placeholder="Note"
          value={form.note}
          onChange={e => setForm({ ...form, note: e.target.value })}
        />
        <button type="submit">Record Transaction</button>
      </form>

      <h3>Recent Transactions</h3>
      <table border="1">
        <thead>
          <tr><th>Product</th><th>Type</th><th>Qty</th><th>Note</th><th>Date</th></tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t._id}>
              <td>{t.product?.name} ({t.product?.sku})</td>
              <td style={{ color: t.type === 'in' ? 'green' : 'red' }}>{t.type === 'in' ? 'IN' : 'OUT'}</td>
              <td>{t.quantity}</td>
              <td>{t.note}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;