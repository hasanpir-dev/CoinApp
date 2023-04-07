import { createSlice } from "@reduxjs/toolkit";
import {
  addCoin,
  getAllCoins,
  getCoins,
  getSingleCoin,
  getUserCoins,
} from "./coinActions.js";

const initialState = {
  loading: false,
  error: null,
  success: false,
  coins: [],
  allCoins: [],
  myCoins: [],
  filterCoins: {
    title: "",
    country: "",
    metal: "",
    quality: "",
    priceFrom: "",
    priceTo: "",
    yearFrom: "",
    yearTo: "",
  },
  editCoin: false,
  coin: {
    title: "",
    faceValue: "",
    year: "",
    price: "",
    country: "",
    metal: "",
    shortDesc: "",
    longDesc: "",
    quality: "",
    weight: "",
    imgObverse: "",
    imgReverse: "",
    category: "",
  },
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    filterCoin: (state, action) => {
      state.filterCoins = { ...state.filterCoins, ...action.payload };
    },
    isEditCoin: (state, action) => {
      state.editCoin = action.payload;
    },
  },
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
    builder.addCase(getAllCoins.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllCoins.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allCoins = payload.data;
    });
    builder.addCase(getAllCoins.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getUserCoins.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserCoins.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.myCoins = payload.data;
    });
    builder.addCase(getUserCoins.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getSingleCoin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSingleCoin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.coin = payload.data;
    });
    builder.addCase(getSingleCoin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { filterCoin, isEditCoin } = coinSlice.actions;

export default coinSlice.reducer;
