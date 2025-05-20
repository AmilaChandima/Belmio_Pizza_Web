import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { FaStar, FaCalendarAlt, FaUtensils, FaUsers, FaClock, FaPhone, FaEnvelope } from 'react-icons/fa';

const Dashboard = () => {
  const { url } = useContext(StoreContext);
  const [reviews, setReviews] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reviews
        const reviewsRes = await axios.get(`${url}/api/reviews`);
        console.log('Reviews response:', reviewsRes.data);
        
        // Fetch reservations
        const reservationsRes = await axios.get(`${url}/api/reservations`);
        console.log('Reservations response:', reservationsRes.data);
        
        // Set reviews data
        if (reviewsRes.data && reviewsRes.data.success) {
          setReviews(reviewsRes.data.data || []);
        }

        // Set reservations data
        if (reservationsRes.data && reservationsRes.data.success) {
          setReservations(reservationsRes.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setReviews([]);
        setReservations([]);
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

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-800 mb-8 font-passion">Admin Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="rounded-full bg-orange-100 p-3 mr-4">
              <FaUsers className="text-orange-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reservations</p>
              <p className="text-2xl font-bold text-gray-800">{reservations.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="rounded-full bg-orange-100 p-3 mr-4">
              <FaStar className="text-orange-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-800">{reviews.length}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Latest Reviews */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 font-passion">Latest Reviews</h2>
              <span className="text-sm text-orange-600">{reviews.length} total</span>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {Array.isArray(reviews) && reviews.slice(0, 5).map((review, index) => (
                <div key={review._id || index} className="border-b border-gray-100 pb-4 last:border-0 hover:bg-orange-50 p-4 rounded-lg transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{review.name}</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'text-orange-500' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-orange-600 font-medium">{review.rating}/5</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">{formatDate(review.createdAt)}</p>
                      {review.location && (
                        <p className="text-gray-500 text-sm mt-1">{review.location}</p>
                      )}
                    </div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg mt-2">
                    <p className="text-gray-700 text-base italic">"{review.comment}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Reservations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 font-passion">Latest Reservations</h2>
              <span className="text-sm text-orange-600">{reservations.length} total</span>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {Array.isArray(reservations) && reservations.slice(0, 5).map((reservation, index) => (
                <div key={reservation._id || index} className="border-b border-gray-100 pb-4 last:border-0 hover:bg-orange-50 p-4 rounded-lg transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{reservation.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <FaPhone className="mr-1 text-orange-500" />
                          {reservation.contact}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end text-orange-600 font-medium">
                        <FaCalendarAlt className="mr-2" />
                        {formatDate(reservation.date)}
                      </div>
                      <div className="flex items-center justify-end mt-1 text-gray-600">
                        <FaClock className="mr-2" />
                        {reservation.time}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 bg-orange-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <FaUsers className="text-orange-500 mr-2" />
                      <span className="text-gray-700">{reservation.headCount || 'N/A'} guests</span>
                    </div>
                    <div className="flex items-center">
                      <FaUtensils className="text-orange-500 mr-2" />
                      <span className="text-gray-700">Table(s): {Array.isArray(reservation.tables) ? reservation.tables.join(', ') : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-passion">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/services" 
                className="flex items-center justify-center bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition"
              >
                Add New Menu Item
              </Link>
              <Link 
                to="/menu" 
                className="flex items-center justify-center bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition"
              >
                View/Edit Menu
              </Link>
              <Link 
                to="/orders" 
                className="flex items-center justify-center bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
