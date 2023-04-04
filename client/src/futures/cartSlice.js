import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [
    {
      id: 1,
      title: "aslan",
    },
    {
      id: 2,
      title: "adil",
    },
    {
      id: 3,
      title: "list",
    },
  ],
  quantity: "0quantity0",
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
  },
});

export const { clearCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
