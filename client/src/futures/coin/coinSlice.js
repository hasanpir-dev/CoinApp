import { createSlice } from "@reduxjs/toolkit";
import { addCoin, getCoins } from "./coinActions.js";

const initialState = {
  loading: false,
  error: null,
  success: false,
  coins: [],
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(addCoin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addCoin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.coins = payload;
    });
    builder.addCase(addCoin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getCoins.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCoins.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.coins = payload.data;
    });
    builder.addCase(getCoins.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {} = coinSlice.actions;

export default coinSlice.reducer;
