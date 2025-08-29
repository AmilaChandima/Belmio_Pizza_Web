// src/components/Checkout.js
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const saveOrder = async (paymentMethod, paymentStatus = "pending") => {
    try {
      const res = await axios.post("http://localhost:4000/api/orders", {
        email,
        phone,
        address,
        items: cartItems,       // ← store full cart
        totalPrice,
        paymentMethod,
        paymentStatus           // ← "paid" for card
      });
      return res.data;
    } catch (err) {
      console.error("Order save failed:", err);
      toast.error("Could not save order.");
      return null;
    }
  };
  
  const handleCardPay = async () => {
    if (!cartItems.length) return toast.error("Your cart is empty.");
    if (!email || !phone || !address) return toast.error("Fill all details.");
  
    setLoading(true);
  
    const order = await saveOrder("card", "paid");  // ← mark as paid
    if (!order) return;
  
    const { data } = await axios.post(
      "http://localhost:4000/api/payments/create-checkout-session",
      {
        customerEmail: email,
        orderId: order._id,
        items: cartItems.map(ci => ({
          name: ci.name,
          size: ci.size,
          price: ci.price,
          quantity: ci.quantity
        }))
      }
    );
  
    if (data.id) {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) toast.error(error.message);
    } else if (data.url) {
      window.location.href = data.url;
    }
  
    setLoading(false);
  };
  
  const handleCOD = async () => {
    if (!cartItems.length) return toast.error("Your cart is empty.");
    if (!email || !phone || !address) return toast.error("Fill all details.");
  
    setLoading(true);
  
    const order = await saveOrder("cod", "pending");  // COD is pending
    if (order) {
      toast.success("Order placed! Pay cash on delivery.");
      clearCart();
      navigate(`/order-success/${order._id}`);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        {cartItems.map((ci) => (
          <div key={`${ci._id}-${ci.size}`} className="flex justify-between py-2 border-b">
            <div>
              <div className="font-medium">
                {ci.name} {ci.size ? `(${ci.size})` : ""}
              </div>
              <div className="text-sm text-gray-500">Qty: {ci.quantity}</div>
            </div>
            <div className="font-medium">RS. {(ci.price * ci.quantity).toFixed(2)}</div>
          </div>
        ))}
        <div className="flex justify-between mt-4 text-lg font-bold">
          <span>Total</span>
          <span>RS. {Number(totalPrice || 0).toFixed(2)}</span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-lg shadow p-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="e.g. +923001234567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Delivery Address (Google Maps link)</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Paste your Google Maps location"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="flex gap-4">
          <button
            onClick={handleCardPay}
            disabled={loading}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded"
          >
            {loading ? "Processing…" : "Pay with Card"}
          </button>

          <button
            onClick={handleCOD}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            {loading ? "Processing…" : "Cash on Delivery"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
