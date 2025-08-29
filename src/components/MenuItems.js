import React, { useState, useEffect, useContext } from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { menuServices } from '../Services/MenuServices';
import { useCart } from '../contexts/CartContext';
import { StoreContext } from '../context/StoreContext';

const MenuItem = ({ item, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { addToCart } = useCart();
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = () => {
      const adminStatus = localStorage.getItem('isAdmin') === 'true';
      setIsAdmin(adminStatus);
    };
    checkAdmin();
  }, []);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = (size) => {
    try {
      if (!token) {
        toast.error('Please login to add items to cart');
        navigate('/login');
        return;
      }
      if (!size) {
        toast.warning('Please select a size first');
        return;
      }
      addToCart(item, size);
      setSelectedSize(null);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Menu Item?");
    if (!confirmDelete) return;

    try {
      await menuServices.deleteItem(item._id);
      toast.success("Menu Item Deleted Successfully!");
      if (onDelete) onDelete(item._id);
    } catch (error) {
      console.error("Failed to Delete Menu item:", error);
      toast.error("Failed to Delete. Please Try Again.");
    }
  };

  return (
    <div
      className="menu-item relative border rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden 
                 transition-all duration-300 transform hover:-translate-y-2 bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Admin Controls */}
      {isAdmin && (
        <div className="absolute top-3 right-3 flex gap-3 z-20">
          <Link
            to={`/edit/${item._id}`}
            className="bg-white/70 p-2 rounded-full shadow hover:scale-110 transition"
            title="Edit Menu Item"
          >
            <FiEdit2 size={18} className="text-blue-500" />
          </Link>
          <button
            onClick={handleDelete}
            className="bg-white/70 p-2 rounded-full shadow hover:scale-110 transition"
            title="Delete Menu Item"
          >
            <FiTrash2 size={18} className="text-red-500" />
          </button>
        </div>
      )}

      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[20rem] sm:h-[22rem] md:h-[24rem] object-cover transition-transform duration-500 
                   hover:scale-105"
      />

      {/* Footer (solid black background) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black text-white p-4 font-passion">
        <h3 className="text-lg font-bold tracking-wide">{item.name.toUpperCase()}</h3>
        <div className="flex justify-between items-center mt-1 text-sm">
          <p>
            PRICE -{" "}
            <span className="text-orange-500 font-bold">RS. {item.prices.medium}.00</span>
          </p>
          <p className="uppercase">Size - M</p>
        </div>
      </div>

      {/* Hover Overlay */}
      {hovered && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-10 flex flex-col justify-between p-5 text-white 
                        animate-fadeIn">
          <div>
            <h3 className="text-xl font-bold text-center mb-2">{item.name.toUpperCase()}</h3>
            <p className="text-sm text-gray-300 text-center mb-6">{item.description}</p>
          </div>

          {/* Size Options */}
          <div className="flex justify-center gap-3 text-sm">
            <button
              className={`flex-1 px-4 py-2 rounded-xl border transition-all duration-300 
                ${selectedSize === 'medium'
                  ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                  : 'bg-black/60 border-gray-600 hover:bg-gray-800 text-orange-400 font-bold'}`}
              onClick={() => handleSizeSelect('medium')}
            >
              MEDIUM <br />
              <span
                className={`${
                  selectedSize === 'medium'
                    ? 'text-white font-bold'
                    : 'text-orange-500 font-bold'
                }`}
              >
                RS. {item.prices.medium}.00
              </span>
            </button>

            {item.prices.large && (
              <button
                className={`flex-1 px-4 py-2 rounded-xl border transition-all duration-300 
                  ${selectedSize === 'large'
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                    : 'bg-black/60 border-gray-600 hover:bg-gray-800 text-orange-400 font-bold'}`}
                onClick={() => handleSizeSelect('large')}
              >
                LARGE <br />
                <span
                  className={`${
                    selectedSize === 'large'
                      ? 'text-white font-bold'
                      : 'text-orange-500 font-bold'
                  }`}
                >
                  RS. {item.prices.large}.00
                </span>
              </button>
            )}
          </div>

          {/* Add to Cart */}
          <button
            className={`mt-6 w-full py-3 text-sm font-bold rounded-xl transition-all duration-300 
              ${selectedSize
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg'
                : 'bg-gray-400 cursor-not-allowed text-gray-700'}`}
            onClick={() => handleAddToCart(selectedSize)}
            disabled={!selectedSize}
          >
            {selectedSize ? 'ADD TO CART →' : 'SELECT SIZE FIRST'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
