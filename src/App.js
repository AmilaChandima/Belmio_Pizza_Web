import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import AddItem from "./components/AdminDashboard/AddItem";
import EditItem from "./components/AdminDashboard/EditItem";


function App() {

  const { showLogin, setShowLogin, formType, setFormType } = useContext(StoreContext);

  useEffect(() => {
    if (showLogin) {

      //comment
      //New comment
      document.body.classList.add("overflow-hidden");
      document.body.style.position = "fixed";
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.position = "initial";
    }
  }, [showLogin]);


  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <ScrollToTop />
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} formType={formType} setFormType={setFormType} /> : <></>}
      <NavBar setShowLogin={setShowLogin} setFormType={setFormType} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <StorySection />
              <Services />
            </>
          }
        />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/services" element={<Ser />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/services/fastDelivery" element={<FastDelivery />} />
        <Route path="/services/foodTruck" element={<FoodTruck />} />
        <Route path="/edit/:id" element={<EditItem />} />


        <Route path="*" element={<div>Page Not Found</div>} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
