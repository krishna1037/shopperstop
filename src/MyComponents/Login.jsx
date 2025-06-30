// Mycomponents/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = ({ onSwitch, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

    useEffect(() => {
      document.title = "Login | ShopperStop"; // 👈 Set the page title
    }, []);

   const handleLogin = (e) => {
    e.preventDefault();
    onLoginSuccess(username);
    alert(`Logged in as: ${username}`);
    navigate("/"); // 
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center text-amber-950">Login to Shop</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        New user?{' '}
        <button onClick={onSwitch} className="text-blue-500 hover:underline">
          Register here
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
