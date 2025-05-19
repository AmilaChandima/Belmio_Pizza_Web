import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myLogo from "../assests/logo.jpg";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { motion } from "framer-motion";

// Import Google Fonts (Poppins)
const googleFontsLink = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
`;

const Navbar = ({ setShowLogin, setFormType }) => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll event to show navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Define the swinging animation for the logo
  const swingAnimation = {
    rotate: [-10, 10, -10],
    transition: {
      repeat: Infinity,
      duration: 0.5,
      ease: "easeInOut",
    },
  };

  const defaultAnimation = {
    rotate: 0,
    transition: { duration: 0.2 },
  };

  // Animation for navbar links
  const linkAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: (index) => index * 0.1 },
  };

  // Animation for navbar entrance
  const navbarAnimation = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      {/* Inject Google Fonts */}
      <style dangerouslySetInnerHTML={{ __html: googleFontsLink }} />

      <motion.div
        className="fixed top-0 left-0 w-full z-50"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={navbarAnimation}
        style={{ pointerEvents: isVisible ? "auto" : "none" }} // Ensure clicks work even when hidden
      >
        {/* Slogan Bar */}
        <div className="bg-gray-900 text-center py-2 text-sm font-medium text-white font-poppins tracking-wide">
          WELCOME TO BELMIO PIZZA SHOP
        </div>

        {/* Navigation Bar */}
        <nav className="bg-black shadow-lg py-4 font-poppins">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 md:px-12">
            {/* Logo with Swinging Animation */}
            <div className="flex items-center space-x-4">
              <motion.img
                src={myLogo}
                alt="Logo"
                className="h-14 w-14 rounded-full object-cover border-2 border-white"
                animate={defaultAnimation}
                whileHover={swingAnimation}
                style={{ transformOrigin: "top center" }}
              />
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>

            {/* NavBar Links */}
            <ul
              className={`${
                isMenuOpen ? "block" : "hidden"
              } md:flex items-center space-y-4 md:space-y-0 md:space-x-8 absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-none p-4 md:p-0 transition-all duration-300`}
            >
              {["Home", "Menu", "Services", "AboutUs"].map((item, index) => (
                <motion.li
                  key={item}
                  {...linkAnimation}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="block text-white text-base md:text-lg font-medium hover:text-orange-200 transition-colors duration-300"
                    onClick={() => {
                      console.log(`Navigating to ${item} at ${item === "Home" ? "/" : `/${item.toLowerCase()}`}`);
                      setIsMenuOpen(false); // Close mobile menu on click
                    }}
                  >
                    {item} {["Menu", "Services"].includes(item) && <span className="inline-block ml-1">▾</span>}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Right */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Cart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <button
                  className="text-white hover:text-orange-200 focus:outline-none transition-colors duration-300"
                  onClick={() => console.log("Cart clicked")}
                >
                  <svg
                    className="w-6 h-6"
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
                  <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-orange-200">
                    2
                  </span>
                </button>
              </motion.div>
              {!token ? (
                <div className="flex items-center space-x-4">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    onClick={() => {
                      setShowLogin(true);
                      setFormType("Login");
                    }}
                    className="text-white bg-transparent px-5 py-2 rounded-lg border-2 border-white hover:bg-white hover:text-orange-600 transition-all duration-300 font-medium text-base"
                  >
                    LOGIN
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    onClick={() => {
                      setShowLogin(true);
                      setFormType("Sign Up");
                    }}
                    type="button"
                    className="text-white bg-gradient-to-br from-pink-500 to-orange-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg px-5 py-2 text-center text-base"
                  >
                    Sign Up Now!
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <button
                    onClick={logOut}
                    className="text-white bg-transparent px-5 py-2 rounded-lg border-2 border-white hover:bg-white hover:text-orange-600 transition-all duration-300 font-medium text-base"
                  >
                    LOG OUT
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </nav>
      </motion.div>
    </div>
  );
};

export default Navbar;