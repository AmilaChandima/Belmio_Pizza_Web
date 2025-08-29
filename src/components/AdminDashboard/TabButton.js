import React from 'react';

const TabButton = ({ icon, label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 
      ${isActive
        ? 'border-orange-500 text-orange-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
  >
    {icon}
    <span>{label}</span>
    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
      {count}
    </span>
  </button>
);

export default TabButton;
