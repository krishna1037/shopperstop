import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => {
  useEffect(() => {
    document.title = "Order Successful | ShopperStop";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-12">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Thank you for your purchase!</h1>
      <p className="text-gray-700 mb-6 text-center">Your order has been placed successfully.</p>
      <Link
        to="/"
        className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default OrderSuccess;
