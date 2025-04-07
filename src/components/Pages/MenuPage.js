import React, { useState } from 'react';
import MenuItem from '../MenuItems';

import heroImage from "../../assests/hero-image.png";
import Pizza1 from "../../assests/Pizza1.png";
import Pizza2 from "../../assests/Pizza2.png";
import Pizza3 from "../../assests/Pizza3.png";
import Pizza4 from "../../assests/Pizza4.png";

// Simulated menu data with images
const menuData = [
  {
    id: 1,
    category: 'Pizza',
    name: 'Pizza Margherita',
    description: 'Classic pizza with tomato and mozzarella',
    prices: { medium: 12, large: 16 },
    image: Pizza1,
  },
  {
    id: 2,
    category: 'Pizza',
    name: 'Pepperoni Pizza',
    description: 'Pizza with pepperoni and mozzarella',
    prices: { medium: 14, large: 18 },
    image: Pizza2,
  },
  {
    id: 3,
    category: 'Sides',
    name: 'Onion Rings',
    description: 'Crispy Onion Rings',
    prices: { medium: 5, large: 7 },
    image: Pizza3,
  },
  {
    id: 4,
    category: 'Sides',
    name: 'Garlic Bread',
    description: 'Crispy garlic bread',
    prices: { medium: 5, large: 7 },
    image: Pizza4,
  },
  // Add more items as needed
];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]); // Initialize cart as an empty array

  const handleAddToCart = (item, size) => {
    const newItem = { ...item, selectedSize: size, price: item.prices[size] };
    setCart(prevCart => [...prevCart, newItem]); // Update cart safely
    console.log('Item added to cart:', newItem);
  };

  const filteredMenu =
    selectedCategory === 'All'
      ? menuData
      : menuData.filter(item => item.category === selectedCategory);

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[90vh] flex items-center pt-[64px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-5"></div>
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center items-start h-full">

          <h1 className="text-4xl text-white font-passion text-left md:text-6xl font-extrabold leading-snug mt-2 mb-4 tracking-tighter ml-24">
            OUR
            <span className="text-orange-500"> MENU</span>
          </h1>
          <p className="text-white mt-4 text-lg ml-24">
            Explore our wide range of delicious dishes, from pizzas to desserts.
          </p>
          <p className="mt-4  text-left text-white md:text-base leading-relaxed ml-24">
            HOME/MENU
          </p>
          <div className="absolute bottom-0 left-[-100px] w-[400px] h-2 bg-orange-500"></div>


        </div>
      </section>
      


      {/* Category Navigation */}
      <div className="menu-header flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-16 mt-24 ">
        <div className="left-header">
          <h2 className="text-4xl text-nowrap text-gray-900 font-passion font-extrabold ">
            <span className="text-gray-300  ml-10"></span> OUR{' '}
            <span className="text-orange-500">MENU</span>
          </h2>
        </div>
        <div className="categories flex flex-nowrap justify-center space-x-2 mt-4 md:mt-0">
          {['All', 'Pizza', 'Calzone', 'Pasta', 'Mains', 'Sides', 'Soup', 'Salad', 'Risotto', 'Desserts', 'Beverages'].map(
            category => (
              <button
                key={category}
                className={`px-4 py-2 rounded ${selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-black'
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu-items grid sm:grid-cols-2 grid-cols-3 lg:grid-cols-4  mx-20  mb-20 justify-evenly mt-24">
        {filteredMenu.map(item => (
          <MenuItem key={item.id} item={item} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;