import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice.js";
import editModalSlice from "./editModalSlice.js";
import categorySlice from "./category/categorySlice.js";
import coinSlice from "./coin/coinSlice.js";

//1 create a store
const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: editModalSlice,
    category: categorySlice,
    coin: coinSlice,
  },
});

export default store;
