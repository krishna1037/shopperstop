import React, { useState, useEffect } from 'react';

const SignupForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    useEffect(() => {
      document.title = "Signup | ShopperStop"; // 👈 Set the page title
    }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Signed up as: ${formData.username}`);
    onSwitch(); 
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Sign Up
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        Already have an account?{' '}
        <button onClick={onSwitch} className="text-blue-500 hover:underline">
          Login here
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
