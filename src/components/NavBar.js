import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import myLogo from "../assests/logo.jpg";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { motion } from "framer-motion";

const Navbar = ({ setShowLogin, setFormType }) => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Define the swinging animation for the logo
  const swingAnimation = {
    rotate: [-10, 10, -10], // Oscillate between -10° and 10°
    transition: {
      repeat: Infinity, // Repeat indefinitely while hovering
      duration: 2, // Duration of one full swing cycle
      ease: "easeInOut", // Smooth swinging motion
    },
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 bg-basebg text-letter">
        {/* Slogan Bar */}
        <div className="bg-slogan text-center py-0.2 text-sm font-semibold">
          WELCOME TO BELMIO PIZZA SHOP
        </div>

        {/* Navigation Bar */}
        <nav className="text-letter py-2 font-roboto">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between px-24">
            {/* Logo with Swinging Animation */}
            <div className="flex items-center space-x-4">
              <motion.img
                src={myLogo}
                alt="Logo"
                className="h-12 w-12 rounded-full object-cover"
                whileHover={swingAnimation}
                style={{ transformOrigin: "top center" }} // Pivot around the top center
              />
            </div>

            {/* NavBar Links */}
            <ul className="hidden md:flex items-center space-x-24 text-xs">
              <li>
                <Link to="/" className="hover:text-orange-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-orange-300">
                  Menu <span className="inline-block">▾</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-orange-300">
                  Service <span className="inline-block">▾</span>
                </Link>
              </li>
              <li>
                <a href="/aboutUs" className="hover:text-orange-300">
                  About Us
                </a>
              </li>
            </ul>

            {/* Right */}
            <div className="flex items-center space-x-24 text-sm">
              {/* Cart */}
              <div className="relative">
                <button
                  className="text-white hover:text-gray-300 focus:outline-none"
                  onClick={() => {/* Add cart functionality here */}}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.38 2.4a1 1 0 00-.12.6v1a1 1 0 001 1h12a1 1 0 001-1v-1a1 1 0 00-.12-.6L17 13M7 13l4-8M17 13l-4-8M6 21h.01M18 21h.01"
                    ></path>
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-gray-300">
                    2
                  </span>
                </button>
              </div>
              {!token ? (
                <div className="flex items-center space-x-2 text-sm">
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setFormType("Login");
                    }}
                    className="text-white bg-transparent px-4 py-2 rounded border-2 border-transparent hover:border-white transition duration-300"
                  >
                    LOGIN
                  </button>

                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setFormType("Sign Up");
                    }}
                    type="button"
                    className="text-white bg-gradient-to-br from-pink-500 to-orange-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-sm px-5 py-2 text-center text-nowrap"
                  >
                    Sign Up Now!
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-sm">
                  <button
                    onClick={logOut}
                    className="text-white bg-transparent px-4 py-2 rounded border-2 border-transparent hover:border-white transition duration-300"
                  >
                    LOG OUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;