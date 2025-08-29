import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { motion } from 'framer-motion';
import {
  FaStar, FaCalendarAlt, FaUtensils, FaUsers,
  FaClock, FaPhone, FaMapMarkerAlt, FaShoppingCart,
  FaCreditCard, FaMoneyBill
} from 'react-icons/fa';

import dashboardBanner from '../../assests/AboutUs.png'; // replace with actual dashboard banner image

const Dashboard = () => {
  const { url } = useContext(StoreContext);
  const [reviews, setReviews] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [truckOrders, setTruckOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [truckOrdersRes, reviewsRes, reservationsRes, regularOrdersRes, subscriptionsRes] = await Promise.all([
          axios.get(`${url}/api/foodtruck-reservations`),
          axios.get(`${url}/api/reviews`),
          axios.get(`${url}/api/reservations`),
          axios.get(`${url}/api/orders`),
          axios.get(`${url}/api/subscriptions`)
        ]);

        if (truckOrdersRes.data.success) setTruckOrders(truckOrdersRes.data.data || []);
        if (reviewsRes.data.success) setReviews(reviewsRes.data.data || []);
        if (reservationsRes.data.success) setReservations(reservationsRes.data.data || []);
        if (regularOrdersRes.data) setOrders(regularOrdersRes.data || []);
        if (subscriptionsRes?.data?.success) setSubscriptions(subscriptionsRes.data.data || []);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        setReviews([]);
        setReservations([]);
        setTruckOrders([]);
        setOrders([]);
        setSubscriptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  if (loading) {
    return (
      <div className="min-h-[84vh] flex items-center justify-center bg-orange-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 text-center pb-10">

      {/* Page Banner */}
      <motion.img
        src={dashboardBanner}
        alt="Dashboard Banner"
        className="w-full max-h-64 object-cover rounded-b-xl mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-36 text-left">

        {/* Page Title */}
        <motion.h1
          className="text-4xl font-passion font-extrabold text-gray-800 mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ADMIN <span className="text-orange-500">DASHBOARD</span>
        </motion.h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<FaUsers />} label="Total Reservations" count={reservations.length} />
          <StatCard icon={<FaStar />} label="Total Reviews" count={reviews.length} />
          <StatCard icon={<FaShoppingCart />} label="Total Orders" count={orders.length} />
          <StatCard icon={<FaMapMarkerAlt />} label="Food Truck Reservations" count={truckOrders.length} />
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<FaUsers />} label="Subscriptions" count={subscriptions.length} />
          <StatCard 
            icon={<FaCreditCard />} 
            label="Paid Orders" 
            count={orders.filter(order => order.paymentStatus === 'paid').length} 
          />
          <StatCard 
            icon={<FaClock />} 
            label="Pending Orders" 
            count={orders.filter(order => order.deliveryStatus !== 'delivered').length} 
          />
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <SectionCard title="Latest Reviews" count={reviews.length}>
            {reviews.map((review, index) => (
              <motion.div
                key={review._id || index}
                className="bg-white border p-4 rounded-lg shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{review.name}</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-orange-500' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-orange-600 font-medium">{review.rating}/5</span>
                    </div>
                  </div>
                  <div className="text-sm text-right text-gray-500">
                    <p>{formatDate(review.createdAt)}</p>
                    {review.location && <p className="mt-1">{review.location}</p>}
                  </div>
                </div>
                <p className="mt-3 italic text-gray-700">"{review.comment}"</p>
              </motion.div>
            ))}
          </SectionCard>

          <SectionCard title="Latest Reservations" count={reservations.length}>
            {reservations.map((r, i) => (
              <motion.div
                key={r._id || i}
                className="bg-white border p-4 rounded-lg shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{r.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 flex items-center">
                      <FaPhone className="text-orange-500 mr-2" />
                      {r.contact}
                    </p>
                  </div>
                  <div className="text-sm text-right text-gray-600">
                    <div className="flex items-center justify-end gap-2 text-orange-600 font-medium">
                      <FaCalendarAlt /> {formatDate(r.date)}
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-1">
                      <FaClock /> {r.time}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 mt-4 gap-4 text-sm text-gray-700 bg-orange-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-orange-500" /> {r.headCount || 'N/A'} guests
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUtensils className="text-orange-500" /> Table(s): {Array.isArray(r.tables) ? r.tables.join(', ') : 'N/A'}
                  </div>
                </div>
              </motion.div>
            ))}
          </SectionCard>
        </div>

        {/* Orders and Food Truck Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <SectionCard title="Latest Orders" count={orders.length}>
            {orders.slice(0, 5).map((order, index) => (
              <motion.div
                key={order._id || index}
                className="bg-white border p-4 rounded-lg shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <FaShoppingCart className="text-orange-500" /> {order.email}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                      <FaPhone className="text-orange-500" /> {order.phone}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-orange-500" /> {order.address}
                    </p>
                  </div>
                  <div className="text-sm text-right">
                    <div className="flex items-center justify-end gap-2 text-orange-600 font-medium mb-1">
                      <FaCalendarAlt /> {formatDate(order.createdAt)}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.deliveryStatus === 'delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.deliveryStatus === 'delivered' ? 'Delivered' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm">
                    {order.paymentMethod === 'card' ? (
                      <FaCreditCard className="text-green-500" />
                    ) : (
                      <FaMoneyBill className="text-yellow-600" />
                    )}
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.paymentStatus === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-gray-800">
                    RS.{order.totalPrice?.toFixed(2)}
                  </div>
                </div>
              </motion.div>
            ))}
          </SectionCard>

          <SectionCard title="Food Truck Orders" count={truckOrders.length}>
            {truckOrders.map((order, index) => (
              <motion.div
                key={order._id || index}
                className="bg-white border p-4 rounded-lg shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <FaUsers className="text-orange-500" /> {order.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                      <FaPhone className="text-orange-500" /> {order.contact}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-orange-500" /> {order.location}
                    </p>
                  </div>
                  <div className="text-sm text-orange-600 flex items-center gap-2">
                    <FaCalendarAlt /> {formatDate(order.date)}
                  </div>
                </div>
              </motion.div>
            ))}
          </SectionCard>

          <SectionCard 
            title={
              <div className="flex justify-between items-center">
                <span>Latest Subscriptions</span>
                <Link 
                  to="/admin/subscriptions" 
                  className="px-3 text-sm text-orange-600 hover:underline flex items-center"
                >
                  View All <span className="ml-1">→</span>
                </Link>
              </div>
            } 
            count={subscriptions.length}
          >
            {subscriptions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No subscriptions yet</p>
            ) : (
              subscriptions.slice(0, 3).map((sub, index) => (
                <motion.div
                  key={sub._id || index}
                  className="bg-white border p-4 rounded-lg shadow hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{sub.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{sub.email}</p>
                      <p className="text-sm text-gray-600">{sub.phone}</p>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <div>{formatDate(sub.createdAt)}</div>
                      <div className="mt-1">
                        <Link 
                          to="/admin/subscriptions" 
                          className="text-orange-600 hover:underline text-xs"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </SectionCard>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/add" className="bg-orange-600 text-white py-3 px-4 rounded hover:bg-orange-700 text-center transition">
              Add New Menu Item
            </Link>
            <Link to="/menu" className="bg-orange-600 text-white py-3 px-4 rounded hover:bg-orange-700 text-center transition">
              View/Edit Menu
            </Link>
            <Link to="/orders" className="bg-orange-600 text-white py-3 px-4 rounded hover:bg-orange-700 text-center transition">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const StatCard = ({ icon, label, count }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <div className="rounded-full bg-orange-100 p-3 mr-4 text-xl text-orange-600">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
    </div>
  </div>
);

const SectionCard = ({ title, count, children }) => (
  <div className="mt-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <span className="text-sm text-orange-600">{count} total</span>
    </div>
    <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
      {children}
    </div>
  </div>
);

export default Dashboard;
