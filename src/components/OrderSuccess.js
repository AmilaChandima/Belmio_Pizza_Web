import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/orders/${orderId}`)
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch order:", err);
        setError("Could not load order details.");
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <div className="text-center p-10">Loading order details...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!order) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Order Successful!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase. Your order details are below.</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b">
              <div>
                <div className="font-bold text-lg text-gray-800">{item.name}</div>
                <div className="text-sm text-gray-500">{item.size ? `Size: ${item.size}` : ""}</div>
                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
              </div>
              <div className="font-semibold text-lg text-gray-800">RS. {(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div className="flex justify-between mt-4 text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>RS. {Number(order.totalPrice).toFixed(2)}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Delivery Details</h3>
            <p><span className="font-medium">Email:</span> {order.email}</p>
            <p><span className="font-medium">Address:</span> {order.address}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Payment Information</h3>
            <p><span className="font-medium">Method:</span> {order.paymentMethod?.toUpperCase()}</p>
            <p><span className="font-medium">Status:</span> <span className="text-green-600 font-semibold">PAID</span></p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
