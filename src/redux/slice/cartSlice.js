import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.cantidad += 1;
      } else {
        state.items.push({ ...item, cantidad: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, cantidad } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.cantidad = cantidad;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) => state.cart.items.reduce((sum, i) => sum + i.cantidad, 0);
export const selectTotalPagar = (state) => state.cart.items.reduce((sum, i) => sum + i.cantidad * i.total, 0);

export default cartSlice.reducer;
