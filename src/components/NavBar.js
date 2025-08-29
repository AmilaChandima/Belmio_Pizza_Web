import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import myLogo from "../assests/logo.jpg";
import { StoreContext } from "../context/StoreContext";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";

const googleFontsLink = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
`;

const Navbar = ({ setShowLogin, setFormType }) => {
  const navigate = useNavigate();
  const { token, setToken, user } = useContext(StoreContext);
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("default-profile.png");

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, [token]);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user?.profileImage) {
      // Ensure the image URL is properly formatted
      let imgUrl = user.profileImage;
      if (imgUrl && !imgUrl.startsWith('http') && !imgUrl.startsWith('data:')) {
        imgUrl = imgUrl.startsWith('//') ? `https:${imgUrl}` : imgUrl;
      }
      
      // Save to state and localStorage
      setProfileImage(imgUrl);
      localStorage.setItem("profileImage", imgUrl);
    } else {
      // Fallback to whatever is in localStorage
      const saved = localStorage.getItem("profileImage");
      if (saved) {
        let imgUrl = saved;
        if (imgUrl && !imgUrl.startsWith('http') && !imgUrl.startsWith('data:')) {
          imgUrl = imgUrl.startsWith('//') ? `https:${imgUrl}` : imgUrl;
          localStorage.setItem("profileImage", imgUrl);
        }
        setProfileImage(imgUrl);
      } else {
        // Default profile image if none exists
        setProfileImage("default-profile.png");
      }
    }
  }, [user]);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("profileImage");
    setToken("");
    setIsAdmin(false);
    navigate("/");
  };

  const swingAnimation = {
    rotate: [-10, 10, -10],
    transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" },
  };
  const defaultAnimation = { rotate: 0, transition: { duration: 0.2 } };
  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (index) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }),
  };
  const navbarAnimation = { hidden: { opacity: 0, y: -100 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: googleFontsLink }} />
      <motion.div
        className="fixed top-0 left-0 w-full z-50"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={navbarAnimation}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      >
        <div className="bg-gray-900 text-center py-2 text-sm font-medium text-white font-poppins tracking-wide">
          WELCOME TO BELMIO PIZZA SHOP
        </div>

        <nav className="bg-black shadow-lg py-4 font-poppins">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 md:px-12">
            {/* Left: Logo */}
            <div className="flex items-center gap-4">
              <Link to="/">
                <motion.img
                  src={myLogo}
                  alt="Logo"
                  className="h-14 w-14 rounded-full object-cover border-2 border-white"
                  animate={defaultAnimation}
                  whileHover={swingAnimation}
                  style={{ transformOrigin: "top center" }}
                />
              </Link>
            </div>

            {/* Middle: Links */}
            <div className="hidden md:flex items-center space-x-12">
              {['Home', 'Menu', 'Services', 'AboutUs'].map((item, index) => (
                <motion.div
                  key={item}
                  custom={index}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={linkVariants}
                >
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-white text-base md:text-lg font-medium hover:text-orange-200 transition-colors duration-300"
                  >
                    {item}
                    {['Menu', 'Services'].includes(item) && <span className="ml-1">▾</span>}
                  </Link>
                </motion.div>
              ))}
              
              {/* Admin Dashboard Button */}
              {isAdmin && (
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={linkVariants}
                >
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-1 text-white text-base md:text-lg font-medium hover:text-orange-200 transition-colors duration-300"
                  >
                    <span>Dashboard</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Right: Cart + Auth / Profile */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <Link to="/cart" className="text-white hover:text-orange-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5.5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-orange-200">
                    {cartItems.length}
                  </span>
                </Link>
              </motion.div>

              {/* Hamburger for mobile */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>

              {/* Desktop Auth/Profile */}
              <div className="hidden md:flex items-center space-x-4">
                {!token ? (
                  <>
                    <button
                      onClick={() => { setShowLogin(true); setFormType("Login"); }}
                      className="text-white border-2 border-white px-5 py-2 rounded-lg hover:bg-white hover:text-orange-600 transition"
                    >
                      LOGIN
                    </button>
                    <button
                      onClick={() => { setShowLogin(true); setFormType("Sign Up"); }}
                      className="text-white bg-gradient-to-br from-pink-500 to-orange-600 hover:bg-gradient-to-bl px-5 py-2 rounded-lg"
                    >
                      SIGN UP
                    </button>
                  </>
                ) : (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={toggleProfile}
                      className="flex items-center space-x-2 focus:outline-none"
                      onMouseEnter={() => setIsProfileOpen(true)}
                    >
                      <div className="relative">
                        <img
                          src={profileImage || "default-profile.png"}
                          alt="Profile"
                          className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        />
                      </div>
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                      <div
                        className="absolute right-0 mt-2 w-72 bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl py-2 z-50 border border-gray-700"
                        onMouseLeave={() => setIsProfileOpen(false)}
                      >
                        <div className="px-4 py-3 border-b border-gray-700">
                          <p className="text-sm font-medium text-white">
                            {user?.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-300 truncate">
                            {user?.email || 'user@example.com'}
                          </p>
                        </div>
                        <Link
                          to="/cart"
                          className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-orange-600/20 hover:text-white transition-colors flex items-center"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5.5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          My Cart
                          <span className="ml-auto bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {cartItems.length}
                          </span>
                        </Link>
                        <button
                          onClick={() => {
                            logOut();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-colors flex items-center"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black px-6 pt-4 pb-6 space-y-4">
              {['Home', 'Menu', 'Services', 'AboutUs'].map((item, index) => (
                <motion.div key={item} custom={index} initial="hidden" animate="visible" variants={linkVariants}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="block text-white text-base font-medium hover:text-orange-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item} {['Menu', 'Services'].includes(item) && <span className="ml-1">▾</span>}
                  </Link>
                </motion.div>
              ))}
              {!token ? (
                <div className="flex flex-col space-y-2">
                  <button onClick={() => { setShowLogin(true); setFormType("Login"); setIsMenuOpen(false); }} className="text-white border px-4 py-2 rounded hover:bg-white hover:text-orange-600">LOGIN</button>
                  <button onClick={() => { setShowLogin(true); setFormType("Sign Up"); setIsMenuOpen(false); }} className="text-white bg-gradient-to-br from-pink-500 to-orange-600 hover:bg-gradient-to-bl px-4 py-2 rounded">Sign Up</button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <button onClick={() => { navigate('/admin/dashboard'); setIsMenuOpen(false); }} className="text-white border px-4 py-2 rounded hover:bg-white hover:text-orange-600">Dashboard</button>
                  )}
                  <img
                    src={user?.profileImage || "default-profile.png"}
                    alt="Profile"
                    loading="lazy"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "default-profile.png";
                    }}
                  />
                  <button onClick={() => { logOut(); setIsMenuOpen(false); }} className="text-white border px-4 py-2 rounded hover:bg-white hover:text-orange-600">LOG OUT</button>
                </div>
              )}
            </div>
          )}
        </nav>
      </motion.div>
    </div>
  );
};

export default Navbar;
