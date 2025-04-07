import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; 

const MenuItem = ({ item, onAddToCart, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = (size) => {
    setSelectedSize(size);
    onAddToCart(item, size);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Menu Item?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/menu/delete/${item._id}`);
      toast.success("Menu Item Deleted Successfully!");
      if (onDelete) onDelete(item._id);
    } catch (error) {
      console.error("Failed to Delete Menu item:", error);
      toast.error("Failed to Delete. Please Try Again.");
    }
  };

  return (
    <div
      className="menu-item relative border rounded shadow-md overflow-hidden ml-10 w-64 h-80"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Edit & Delete Buttons */}
      
      <div className="absolute top-1 right-1 flex gap-6 z-10">
        <Link
          to={`/edit/${item._id}`}
          className="text-customBlue hover:text-yellow-500 transition-all"
          title="Edit Menu Item"
        >
          <FiEdit2 size={24} className="hover:scale-110 transition-transform" />
        </Link>

        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-900 transition-all"
          title="Delete Menu Item"
        >
          <FiTrash2 size={24} className="hover:scale-110 transition-transform" />
        </button>
      </div>



      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
      />

      {/* Name & Base Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-black text-white p-3 font-passion">
        <h3 className="text-lg font-bold text-left">{item.name.toUpperCase()}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm font-bold">
            PRICE - <span className="text-orange-500">RS. {item.prices.medium}.00</span>
          </p>
          <p className="text-sm font-bold">SIZE - M</p>
        </div>
      </div>

      {/* Hover Overlay */}
      {hovered && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-between p-4 text-center font-passion font-bold">
          <h3 className="text-xl font-bold text-white">{item.name.toUpperCase()}</h3>
          <p className="text-sm text-gray-300 mb-4">{item.description}</p>

          <div className="flex justify-center gap-2 mb-14 w-full whitespace-nowrap text-xs">
            <button
              className={`flex-1 px-4 py-2 rounded ${selectedSize === 'medium'
                ? 'bg-orange-500 text-white' : 'bg-black text-white hover:bg-gray-800'}`}
              onClick={() => handleAddToCart('medium')}
            >
              MEDIUM PIZZA
              <br />
              <span className={selectedSize === 'medium' ? 'text-white' : 'text-orange-500'}>
                RS. {item.prices.medium}.00
              </span>
            </button>

            <button
              className={`flex-1 px-4 py-2 rounded ${selectedSize === 'large'
                ? 'bg-orange-500 text-white' : 'bg-black text-white hover:bg-gray-800'}`}
              onClick={() => handleAddToCart('large')}
            >
              LARGE PIZZA
              <br />
              <span className={selectedSize === 'large' ? 'text-white' : 'text-orange-500'}>
                RS. {item.prices.large}.00
              </span>
            </button>
          </div>

          <button
            className="w-full absolute bottom-0 bg-orange-500 hover:bg-orange-600 text-white py-5 text-sm font-bold"
            onClick={() => handleAddToCart(selectedSize || 'medium')}
          >
            ADD TO CART →
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
