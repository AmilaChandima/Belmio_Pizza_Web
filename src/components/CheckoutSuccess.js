// src/components/CheckoutSuccess.js
import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const CheckoutSuccess = () => (
  <div className="min-h-[75vh] bg-gray-100 flex items-center justify-center p-6 font-sans">
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
      <h1 className="text-4xl font-bold text-gray-800">Payment Successful!</h1>
      <p className="text-gray-600 mt-2">Thank you for your payment. Your order is being processed and you will receive a confirmation shortly.</p>

      <div className="flex justify-center gap-4 mt-8">
        <Link to="/" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
          Continue Shopping
        </Link>
        <Link to="/orders" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
          View My Orders
        </Link>
      </div>
    </div>
  </div>
);

export default CheckoutSuccess;
