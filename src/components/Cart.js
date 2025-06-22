import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!token) {
      toast.error('Please login to view your cart');
      navigate('/');
      return;
    }

    const calculateTotal = () => {
      const total = cartItems.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
      setCalculatedTotal(total);
    };
    calculateTotal();
  }, [cartItems, token]);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600">Add items to your cart to proceed with checkout.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      
      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id + item.size}
            className="bg-white rounded-lg shadow-md p-4 flex items-center"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            
            {/* Item Details */}
            <div className="ml-4 flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-600">Size: {item.size.toUpperCase()}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-orange-500 font-bold">
                RS. {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            
            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, item.size, parseInt(e.target.value))}
                className="w-16 text-center"
                min="1"
              />
              <button
                onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item._id, item.size)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Total</h3>
          <p className="text-2xl font-bold text-orange-500">
            RS. {calculatedTotal.toFixed(2)}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          <button
            onClick={() => {
              // TODO: Implement checkout functionality
              toast.info('Checkout functionality coming soon!');
            }}
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
