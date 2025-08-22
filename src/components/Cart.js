<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";
import { StoreContext } from "../context/StoreContext";
import cartBanner from "../assests/Cart.jpg"; // Replace with your actual banner image
=======
import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../contexts/CartContext';
import { StoreContext } from '../context/StoreContext';
import cartBanner from '../assests/AboutUs.png'; // Replace with your actual banner image
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { token } = useContext(StoreContext);
  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your cart");
      navigate("/");
      return;
    }

<<<<<<< HEAD
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
=======
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
    setCalculatedTotal(total);
  }, [cartItems, token]);

  if (cartItems.length === 0) {
    return (
<<<<<<< HEAD
      <div className="min-h-[75vh] flex flex-col justify-center items-center px-4 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">
          Add items to your cart to proceed with checkout.
        </p>
        <button
          onClick={() => navigate("/menu")}
=======
      <div className="min-h-[84vh] flex flex-col justify-center items-center px-4 text-center">
        <div className="text-6xl mt-4 mb-4">🛒</div>
        <h1 className="text-4xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6 text-xl">Add items to your cart to proceed with checkout.</p>
        <button
          onClick={() => navigate('/menu')}
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="bg-mygray text-center p-8 md:p-16 xl:px-36">
<<<<<<< HEAD
=======

>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
      {/* Cart Banner */}
      <motion.img
        src={cartBanner}
        alt="Cart Banner"
<<<<<<< HEAD
        className="w-full max-h-64 object-fill rounded-md mb-8"
=======
        className="w-full max-h-64 object-cover rounded-md mb-8"
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Title and Clear Cart Button */}
      <motion.div
        className="flex justify-between mb-8 flex-wrap items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl font-passion md:text-4xl font-extrabold text-gray-800 mb-4 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          YOUR <span className="text-orange-500">CART</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            onClick={clearCart}
<<<<<<< HEAD
            className="px-5 py-3 bg-red-500 font-semibold rounded text-white hover:bg-red-600 transition"
=======
            className="px-5 py-3 bg-orange-500 font-semibold rounded text-white hover:bg-red-600 transition"
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
          >
            CLEAR CART
          </button>
        </motion.div>
      </motion.div>

<<<<<<< HEAD
      <div className="space-y-4 mt-12">
=======
      {/* Cart Items List */}
      <div className="space-y-4">
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
        {cartItems.map((item, index) => (
          <motion.div
            key={item._id + item.size}
            className="relative flex flex-col sm:flex-row items-center sm:items-start w-full border border-gray-200 rounded-lg bg-white shadow hover:shadow-lg cursor-pointer p-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Remove Button in top-right corner */}
            <button
              onClick={() => removeFromCart(item._id, item.size)}
<<<<<<< HEAD
              className="absolute top-3 right-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition z-10 shadow-md"
=======
              className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition z-10 shadow-md"
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
            >
              Remove
            </button>

<<<<<<< HEAD
=======

>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
            />

            {/* Item Details */}
            <div className="flex-1 flex flex-col justify-between text-left w-full min-h-[120px]">
              <div>
<<<<<<< HEAD
                <h3 className="font-bold text-2xl mb-2">{item.name}</h3>
                <p className="text-gray-800 mb-2 ">
                  <span className="font-bold mr-14">Size</span>{" "}
                  {item.size.toUpperCase()}
                </p>
                <p className="text-gray-800 mb-2">
                  <span className="font-bold mr-12">Price</span> RS.{" "}
                  {item.price.toFixed(2)}
                </p>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity - 1)
                    }
=======
                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-900 mb-2">
                  <span className="font-semibold mr-14">Size:</span> {item.size.toUpperCase()}
                </p>
                <p className="text-gray-900 mb-2">
                  <span className="font-semibold mr-12">Price:</span> RS. {item.price.toFixed(2)}
                </p>


                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
<<<<<<< HEAD
                      updateQuantity(
                        item._id,
                        item.size,
                        parseInt(e.target.value)
                      )
=======
                      updateQuantity(item._id, item.size, parseInt(e.target.value))
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
                    }
                    className="w-16 text-center border rounded"
                  />
                  <button
<<<<<<< HEAD
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity + 1)
                    }
=======
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total price aligned bottom-right */}
<<<<<<< HEAD
              <p className="text-orange-500 text-xl font-bold self-end mt-4">
=======
              <p className="text-orange-600 text-XL font-bold self-end mt-4">
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
                Total: RS. {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </motion.div>
<<<<<<< HEAD
=======

>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
        ))}
      </div>

      {/* Total and Checkout */}
      <div className="mt-10 bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
<<<<<<< HEAD
          <h3 className="text-2xl font-bold">Total Amount</h3>
          <p className="text-3xl font-bold text-orange-600">
            RS. {calculatedTotal.toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => toast.info("Checkout functionality coming soon!")}
=======
          <h3 className="text-xl font-bold text-grey-800">Total Amount</h3>
          <p className="text-2xl font-bold text-orange-600">RS. {calculatedTotal.toFixed(2)}</p>
        </div>
        <button
          onClick={() => toast.info('Checkout functionality coming soon!')}
>>>>>>> 793b402a9dd1e6ba77e9d895064ffd758703ff22
          className="w-full px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
