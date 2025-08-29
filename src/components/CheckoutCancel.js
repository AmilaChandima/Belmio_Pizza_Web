// src/components/CheckoutCancel.js
import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const CheckoutCancel = () => (
  <div className="max-w-2xl mx-auto p-6 font-sans">
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
      <h1 className="text-4xl font-bold text-gray-800">Payment Canceled</h1>
      <p className="text-gray-600 mt-2">Your payment was not completed. Your cart has been saved, so you can try again anytime.</p>

      <div className="flex justify-center gap-4 mt-8">
        <Link to="/checkout" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
          Try Again
        </Link>
        <Link to="/" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
          Back to Home
        </Link>
      </div>
    </div>
  </div>
);

export default CheckoutCancel;
