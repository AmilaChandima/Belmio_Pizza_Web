import React, { useState, useEffect } from 'react';
import MenuItem from '../MenuItems';
import { menuServices } from '../../Services/MenuServices';
import heroImage from "../../assests/hero-image.png";

const MenuPage = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await menuServices.getAllItems();
        setMenuData(data);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleDelete = (id) => {
    setMenuData(prevData => prevData.filter(item => item._id !== id));
  };

  const handleAddToCart = (item, size) => {
    const newItem = { ...item, selectedSize: size, price: item.prices[size] };
    const exists = cart.find(cartItem =>
      cartItem._id === item._id && cartItem.selectedSize === size
    );
    if (!exists) {
      setCart(prevCart => [...prevCart, newItem]);
      console.log('Item added to cart:', newItem);
    } else {
      console.log('Item already in cart');
    }
  };

  const filteredMenu =
    selectedCategory === 'All'
      ? menuData
      : menuData.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[90vh] flex items-center pt-[64px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center items-start h-full">
          <h1 className="text-4xl text-white font-passion text-left md:text-6xl font-extrabold leading-snug mt-2 mb-4 tracking-tighter ml-24">
            OUR <span className="text-orange-500">MENU</span>
          </h1>
          <p className="text-white mt-4 text-lg ml-24">
            Explore our wide range of delicious dishes, from pizzas to desserts.
          </p>
          <p className="mt-4 text-left text-white md:text-base leading-relaxed ml-24">
            HOME / MENU
          </p>
          <div className="absolute bottom-0 left-[-100px] w-[400px] h-2 bg-orange-500"></div>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="menu-header flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-16 mt-24">
        <div className="left-header">
          <h2 className="text-4xl text-nowrap text-gray-900 font-passion font-extrabold">
            <span className="text-gray-300 ml-10"></span> OUR{' '}
            <span className="text-orange-500">MENU</span>
          </h2>
        </div>
        <div className="categories flex flex-wrap gap-2 mt-4 md:mt-0">
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
      <div className="menu-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10 mb-20 mt-24">
        {loading ? (
          <p className="text-center col-span-full text-gray-500">Loading menu...</p>
        ) : filteredMenu.length > 0 ? (
          filteredMenu.map(item => (
            <MenuItem key={item._id || item.id} item={item} onAddToCart={handleAddToCart} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No items found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
