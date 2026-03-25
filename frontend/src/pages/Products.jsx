import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    reorderLevel: 5,
    unitPrice: 0,
    supplier: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch products');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
      setFormData({
        name: '',
        sku: '',
        category: '',
        quantity: 0,
        reorderLevel: 5,
        unitPrice: 0,
        supplier: ''
      });
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
      } catch (error) {
        console.error(error);
        alert('Delete failed');
      }
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
        <input type="number" name="reorderLevel" placeholder="Reorder Level" value={formData.reorderLevel} onChange={handleChange} />
        <input type="number" name="unitPrice" placeholder="Unit Price" value={formData.unitPrice} onChange={handleChange} required />
        <input type="text" name="supplier" placeholder="Supplier" value={formData.supplier} onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>

      <h3>Product List</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr><th>Name</th><th>SKU</th><th>Category</th><th>Qty</th><th>Price</th><th>Supplier</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td><td>{p.sku}</td><td>{p.category}</td><td>{p.quantity}</td><td>{p.unitPrice}</td><td>{p.supplier}</td>
              <td><button onClick={() => handleDelete(p._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;