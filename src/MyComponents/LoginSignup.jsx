
import React, { useState } from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import { useOutletContext } from 'react-router-dom';
import { ReactTyped } from 'react-typed';

const LoginSignup = () => {

  const [showLogin, setShowLogin] = useState(true);
const { setUsername } = useOutletContext();


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 bg-[url(https://c0.wallpaperflare.com/preview/447/552/983/ecommerce-online-shop-euro.jpg)]"
    >
      <div className="w-full max-w-md p-8  shadow-2xl rounded-lg backdrop-blur-sm border border-gray-200">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-800">
          <ReactTyped
  strings={showLogin ? ['Welcome Back!'] : ['Join ShoppersStop Today']}
  typeSpeed={60}
  backSpeed={40}
  loop
/>
          </h1>
          <p className="text-gray-700 text-sm mt-2">
            {showLogin
              ? 'Login to track orders, manage your profile, and shop smarter.'
              : 'Create your free account to start shopping and saving today.'}
          </p>
        </div>

             {showLogin ? (
        <LoginForm onSwitch={() => setShowLogin(false)} onLoginSuccess={setUsername} />
      ) : (
        <SignupForm onSwitch={() => setShowLogin(true)} />
      )}

      </div>
    </div>
  );
};

export default LoginSignup;
