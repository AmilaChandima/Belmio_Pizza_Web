import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import NavBar from "./components/NavBar";
import StorySection from "./components/StorySection";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MenuPage from "./components/Pages/MenuPage";
import Ser from "./components/Pages/SerPage";
import FastDelivery from "./components/Pages/FastDelivery";
import FoodTruck from "./components/Pages/FoodTruck";
import AboutUs from "./components/Pages/AboutUs";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import { StoreContext } from "./context/StoreContext";
import ScrollToTop from "./components/ScrollTop";
import ReviewPage from "./components/Pages/Review";
import TableReservation from "./components/Pages/TableReservation";
import LoadingScreen from "./components/LoadingScreen";
import AddItem from "./components/AdminDashboard/AddItem";
import EditItem from "./components/AdminDashboard/EditItem";
import Dashboard from "./components/AdminDashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Wrapper component to handle loading state with route changes
const AppWithLoading = () => {
  const { showLogin, setShowLogin, formType, setFormType } = useContext(StoreContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (showLogin) {
      document.body.classList.add("overflow-hidden");
      document.body.style.position = "fixed";
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.position = "initial";
    }
  }, [showLogin]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <ToastContainer position="top-right" autoClose={3000} />
      <ScrollToTop />

      {showLogin && (
        <LoginPopUp
          setShowLogin={setShowLogin}
          formType={formType}
          setFormType={setFormType}
        />
      )}

      <NavBar setShowLogin={setShowLogin} setFormType={setFormType} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <StorySection />
              <Services />
              <ReviewPage />
            </>
          }
        />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/services" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/services/fastDelivery" element={<FastDelivery />} />
        <Route path="/services/foodTruck" element={<FoodTruck />} />
        <Route path="/services/table" element={<TableReservation />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditItem /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWithLoading />
    </Router>
  );
}

export default App;
