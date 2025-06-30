import React, { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash, FaTag } from 'react-icons/fa';

const Cart = () => {
  const {
    cartItems,
    updateCartItemQuantity,
    removeCartItem,
    setAppliedDiscount,
  } = useOutletContext();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [validCoupon, setValidCoupon] = useState('');

  useEffect(() => {
    document.title = 'Your Cart | ShopperStop';
  }, []);

  const getSubTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[₹,]/g, ''));
      return total + price * (item.quantity || 1);
    }, 0);
  };

  const getTotal = () => {
    return getSubTotal() - discount;
  };

  const applyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    const upperCode = couponCode.trim().toUpperCase();
    const subtotal = getSubTotal();

    let appliedDisc = 0;

    if (upperCode === 'SAVE30') {
      appliedDisc = subtotal * 0.3;
      setDiscount(appliedDisc);
      setCouponSuccess('Coupon "SAVE30" applied! You got 30% off.');
      setValidCoupon('SAVE30');
    } else if (upperCode === 'FLAT100') {
      appliedDisc = 100;
      setDiscount(appliedDisc);
      setCouponSuccess('Coupon "FLAT100" applied! You got ₹100 off.');
    } 
    else if (upperCode === 'DILIP60') {
      appliedDisc = subtotal * 0.6;
      setDiscount(appliedDisc);
      setCouponSuccess('Coupon "DILIP60" applied! You got 60% off.');
     }
     else if (upperCode === '') {
      setCouponError('Please enter a coupon code.');
      setDiscount(0);
      setValidCoupon('');
    } else {
      setCouponError('Invalid coupon code. Please try again.');
      setDiscount(0);
      setValidCoupon('');
    }

    setAppliedDiscount(appliedDisc);
  };

  // Dynamically update discount when cart or validCoupon changes
  useEffect(() => {
    const subtotal = getSubTotal();
    let updatedDiscount = 0;

    if (validCoupon === 'SAVE30') {
      updatedDiscount = subtotal * 0.3;
    } else if (validCoupon === 'FLAT100') {
      updatedDiscount = 100;
    }  else if ( validCoupon ==='DILIP60'){
        updatedDiscount = subtotal * 0.6 ;

      }
    

    if (validCoupon) {
      setDiscount(updatedDiscount);
      setAppliedDiscount(updatedDiscount);
    }
  }, [cartItems, validCoupon]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
        Your Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/64x64?text=Image';
                    }}
                  />
                  <div>
                    <span className="text-lg font-semibold text-slate-800">{item.name}</span>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) - 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full text-sm"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-3 text-md font-medium text-slate-700">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) + 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full text-sm"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-amber-600 text-lg font-bold">{item.price}</span>
                  <button
                    onClick={() => removeCartItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            {/* Coupon Section */}
            <div className="mb-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  applyCoupon();
                }}
              >
                <label className="flex text-gray-700 text-sm font-bold mb-2 items-center gap-2">
                  <FaTag className="text-amber-500" /> Have a coupon code?
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="shadow border rounded-l w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 ml-2 rounded"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-red-500 text-xs italic mt-2">{couponError}</p>}
                {couponSuccess && <p className="text-green-600 text-xs italic mt-2">{couponSuccess}</p>}
              </form>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-lg text-slate-800">Subtotal:</span>
              <span className="text-xl font-semibold text-slate-800">
                ₹ {getSubTotal().toLocaleString('en-IN')}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between items-center mb-2 text-green-600">
                <span className="text-lg">Discount:</span>
                <span className="text-xl font-semibold">
                  - ₹ {discount.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-center">
              <span className="text-xl font-bold text-slate-800">Total:</span>
              <span className="text-2xl font-bold text-amber-700">
                ₹ {getTotal().toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/payment"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
