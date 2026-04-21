import { createSlice } from "@reduxjs/toolkit";

// load from localStorage
const loadCart = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// save to localStorage
const saveCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state.items));
};

const initialState = {
  items: loadCart()
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    // ADD ITEM
    addToCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      saveCart(state);
    },

    // REMOVE ITEM
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      saveCart(state);
    },

    // UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCart(state);
    }

  }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;