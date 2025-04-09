// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (producto) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === producto.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...producto, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter(item => item.id !== id));
  };

  const updateQuantity = (id, cantidad) => {
    setCartItems((items) =>
      items.map(item =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPagar = cartItems.reduce((acc, item) => acc + (item.total * item.cantidad), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalItems, totalPagar }}>
      {children}
    </CartContext.Provider>
  );
}
