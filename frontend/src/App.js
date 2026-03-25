import Transactions from './pages/Transactions';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/transactions" element={token ? <Transactions token={token} /> : <Navigate to="/login" />} />
	<Route path="/products" element={token ? <Products token={token} /> : <Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;