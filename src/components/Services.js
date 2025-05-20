import React from 'react';
import { motion } from 'framer-motion';
import delivery from '../assests/4.jpg';
import food from '../assests/3.jpg';
import reservation from '../assests/2.jpg';
import truck from '../assests/1.jpg';
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="bg-mygray text-center p-8 md:p-16 xl:px-36">
      {/* Title and Learn More Button with Fade-In Animation */}
      <motion.div 
        className="flex justify-between mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl font-passion md:text-4xl font-extrabold text-gray-800 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          OUR <span className="text-orange-500">SERVICES</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link to="/services" className="px-5 py-3 bg-orange-500 font-semibold rounded text-white hover:bg-orange-600 transition">
            LEARN MORE
          </Link>
        </motion.div>
      </motion.div>

      {/* Services with Card Animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Service: Fast Delivery */}
        <Link to="/services/fastDelivery">
          <motion.button
            className="relative w-full h-[360px] border border-gray-300 rounded-md cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={delivery} alt="Fast Delivery" className="w-full h-full object-cover rounded-t-md" />
            <div className="absolute bottom-0 left-0 right-0 text-xl font-passion md: font-extrabold bg-black bg-opacity-50 text-white text-center py-4 rounded-b-md">
              FAST DELIVERY
            </div>
          </motion.button>
        </Link>
        
        {/* Service: Healthy Foods */}
        <Link to="/menu">
          <motion.button
            className="relative w-full h-[360px] border border-gray-300 rounded-md cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={food} alt="Healthy Foods" className="w-full h-full object-cover rounded-t-md" />
            <div className="absolute bottom-0 left-0 right-0 text-xl font-passion md: font-extrabold bg-black bg-opacity-50 text-white text-center py-4 rounded-b-md">
              HEALTHY FOODS
            </div>
          </motion.button>
        </Link>
        
        {/* Service: Reservation */}
        <Link to="/services/table">
          <motion.button
            className="relative w-full h-[360px] border border-gray-300 rounded-md cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={reservation} alt="Reservation" className="w-full h-full object-cover rounded-t-md" />
            <div className="absolute bottom-0 left-0 right-0 text-xl font-passion md: font-extrabold bg-black bg-opacity-50 text-white text-center py-4 rounded-b-md">
              RESERVATION
            </div>
          </motion.button>
        </Link>
        
        {/* Service: Food Truck */}
        <Link to="/services/foodTruck">
          <motion.button
            className="relative w-full h-[360px] border border-gray-300 rounded-md cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={truck} alt="Food Truck" className="w-full h-full object-cover rounded-t-md" />
            <div className="absolute bottom-0 left-0 right-0 text-xl font-passion md: font-extrabold bg-black bg-opacity-50 text-white text-center py-4 rounded-b-md">
              FOOD TRUCK
            </div>
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Services;