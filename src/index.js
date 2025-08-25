import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import StoreContextProvider from './context/StoreContext.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </React.StrictMode>
);
