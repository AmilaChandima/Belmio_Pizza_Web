import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import StoreContextProvider from "./context/StoreContext.js";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StoreContextProvider>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </StoreContextProvider>
  </React.StrictMode>
);
