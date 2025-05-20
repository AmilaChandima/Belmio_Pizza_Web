import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Menu Management Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Menu Management</h2>
            <div className="space-y-3">
              <Link 
                to="/services" 
                className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Add New Item
              </Link>
              <Link 
                to="/menu" 
                className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                View/Edit Menu
              </Link>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Orders</h2>
            <div className="space-y-3">
              <Link 
                to="/orders" 
                className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
              >
                View Orders
              </Link>
            </div>
          </div>

          {/* Reservations Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Reservations</h2>
            <div className="space-y-3">
              <Link 
                to="/reservations" 
                className="block w-full text-center bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition"
              >
                View Reservations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
