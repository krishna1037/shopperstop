import React, { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaWallet, FaRupeeSign } from 'react-icons/fa';

const Payment = () => {
  const context = useOutletContext();
  const navigate = useNavigate();

  if (!context) {
    return (
      <div className="p-6 text-center text-red-600 font-bold">
        Error: Payment context is missing. Please return to the cart.
      </div>
    );
  }

  const { cartItems, getCartTotal, clearCart, appliedDiscount } = context;

  const subTotal = Number(getCartTotal()) || 0;
  const discountValue = Number(appliedDiscount) || 0;
  const totalAmount = Math.max(0, subTotal - discountValue);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    document.title = 'Payment | ShopperStop';
  }, []);

  useEffect(() => {
    if (cartItems.length === 0 && totalAmount <= 0 && !paymentProcessing) {
      navigate('/cart');
    }
  }, [cartItems, totalAmount, navigate, paymentProcessing]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0 || totalAmount <= 0) {
      alert('Cart is empty or total amount is invalid.');
      return;
    }

    setPaymentProcessing(true);

    // Simulate payment delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();

    // Redirect to order success
    navigate('/orderSuccess');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Choose Payment Method</h2>

      {paymentProcessing ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] text-center text-slate-700">
          <div className="animate-pulse text-lg font-medium mb-2">Processing your payment...</div>
          <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <form onSubmit={handlePaymentSubmit}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={selectedPaymentMethod === 'creditCard'}
                  onChange={() => setSelectedPaymentMethod('creditCard')}
                />
                <FaCreditCard className="text-blue-500" /> Credit/Debit Card
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={selectedPaymentMethod === 'upi'}
                  onChange={() => setSelectedPaymentMethod('upi')}
                />
                <FaWallet className="text-green-500" /> UPI / Wallets
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={selectedPaymentMethod === 'cod'}
                  onChange={() => setSelectedPaymentMethod('cod')}
                />
                <FaRupeeSign className="text-yellow-500" /> Cash on Delivery
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 text-slate-700">
            <span className="text-xl font-semibold">Amount Payable:</span>
            <span className="text-2xl font-bold text-green-600">
              ₹ {totalAmount.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg flex items-center justify-center gap-2"
          >
            <FaLock />
            Pay Securely
          </button>
        </form>
      )}
    </div>
  );
};

export default Payment;
