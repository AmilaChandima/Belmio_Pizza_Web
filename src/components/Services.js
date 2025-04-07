import React from 'react';
import delivery from '../assests/4.jpg';
import food from '../assests/3.jpg';
import reservation from '../assests/2.jpg';
import truck from '../assests/1.jpg';
import { Link } from "react-router-dom";

const Services = () => {
  return (
<div className="bg-mygray text-center p-8 md:p-16 xl:px-36">
      {/* Title and Learn More Button */}
      <div className="flex justify-between mb-8">
        <h2 className="text-4xl font-passion md:text-4xl font-extrabold text-gray-800 mb-8">
          OUR <span className="text-orange-500">SERVICES</span>
        </h2>
        <div>
        <Link to= "/services" className="px-5 py-3 bg-orange-500 font-semibold rounded text-white hover:bg-orange-600 transition">
          LEARN MORE
        </Link>
        </div>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Service: Fast Delivery */}
        <Link to="/services/fastDelivery">
        <button 
          className="relative w-full h-[360px] border border-gray-300 rounded-md cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <img src={delivery} alt="Fast Delivery" className="w-full h-full object-cover rounded-t-md" />
          <div className="absolute bottom-0 left-0 right-0 text-xl font-passion md: font-extrabold bg-black bg-opacity-50 text-white text-center py-4 rounded-b-md">
            FAST DELIVERY
          </div>
        </button>
        </Link>
        
        {/* Service: Healthy Foods */}
        <Link to="/menu">
        <button 
          className="relative w-full h-[360px] border border-gray-300 rounded-md cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <img src={food} alt="Healthy Foods" className="w-full h-full object-cover rounded-t-md" />
          <div className="absolute bottom-0 left-0 right-0 text-xl font-passion md: font-extrabold bg-black bg-opacity-50 text-white text-center py-4 rounded-b-md">
            HEALTHY FOODS
          </div>
        </button>
        </Link>
        
        {/* Service: Reservation */}
        <Link to="/services/table">
        <button 
          className="relative w-full h-[360px] border border-gray-300 rounded-md cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <img src={reservation} alt="Reservation" className="w-full h-full object-cover rounded-t-md" />
          <div className="absolute bottom-0 left-0 right-0 text-xl font-passion md: font-extrabold bg-black bg-opacity-50 text-white text-center py-4 rounded-b-md">
            RESERVATION
          </div>
        </button>
        </Link>
        {/* Service: Food Truck */}
        <Link to="/services/foodTruck">
        <button 
          className="relative w-full h-[360px] border border-gray-300 rounded-md cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <img src={truck} alt="Food Truck" className="w-full h-full object-cover rounded-t-md" />
          <div className="absolute bottom-0 left-0 right-0 text-xl font-passion md: font-extrabold bg-black bg-opacity-50 text-white text-center py-4 rounded-b-md">
            FOOD TRUCK
          </div>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Services;

