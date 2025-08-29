// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

const CartContext = createContext();

const readCart = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
};

const writeCart = (key, items) => {
  try {
    const total = items.reduce((s, it) => s + (Number(it.price) * Number(it.quantity)), 0);
    localStorage.setItem(key, JSON.stringify({ items, totalPrice: total }));
  } catch {}
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);

  // Always use a stable key: user cart when logged in, otherwise guest cart
  const cartKey = token ? `cart_${token}` : 'cart_guest';

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Hydration guard to prevent overwriting storage with empty state during init/key switch
  const [hydrated, setHydrated] = useState(false);
  const prevKeyRef = useRef(cartKey);

  // Load from localStorage whenever the storage key changes (e.g., login/logout) or on first mount
  useEffect(() => {
    setHydrated(false); // pause saving
    const items = readCart(cartKey);
    setCartItems(items);
    setHydrated(true); // resume saving
    prevKeyRef.current = cartKey;
  }, [cartKey]);

  // Recompute total whenever cartItems changes
  useEffect(() => {
    const total = cartItems.reduce((s, it) => s + (Number(it.price) * Number(it.quantity)), 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Persist to localStorage after hydration only
  useEffect(() => {
    if (!hydrated) return;
    writeCart(cartKey, cartItems);
  }, [cartItems, cartKey, hydrated]);

  // Optional: keep multiple tabs/windows in sync
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === cartKey) {
        const items = readCart(cartKey);
        setCartItems(items);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [cartKey]);

  // -------- Cart actions --------
  const addToCart = (item, size) => {
    const price = Number(item?.prices?.[size] ?? item?.price ?? 0);
    const idx = cartItems.findIndex(ci => ci._id === item._id && ci.size === size);

    let updated;
    if (idx >= 0) {
      updated = [...cartItems];
      updated[idx] = { ...updated[idx], quantity: Number(updated[idx].quantity) + 1 };
    } else {
      updated = [...cartItems, { ...item, size, quantity: 1, price }];
    }
    setCartItems(updated);
    toast.success(`${item.name} (${size}) added to cart!`, { autoClose: 1800 });
  };

  const removeFromCart = (itemId, size) => {
    const updated = cartItems.filter(it => !(it._id === itemId && it.size === size));
    setCartItems(updated);
    toast.success('Item removed from cart!', { autoClose: 1500 });
  };

  const updateQuantity = (itemId, size, quantity) => {
    const q = Number(quantity);
    if (q < 1) return removeFromCart(itemId, size);
    const updated = cartItems.map(it =>
      it._id === itemId && it.size === size ? { ...it, quantity: q } : it
    );
    setCartItems(updated);
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    localStorage.removeItem(cartKey);
    toast.success('Cart cleared!');
    navigate('/');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
