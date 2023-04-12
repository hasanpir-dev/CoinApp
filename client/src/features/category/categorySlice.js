import { createSlice } from "@reduxjs/toolkit";
import { addCategory, getCategories } from "./categoryActions.js";

const initialState = {
  loading: false,
  error: null,
  success: false,
  categories: [],
  title: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categorySearch: (state, action) => {
      state.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = [...state.categories, payload.data];
    });
    builder.addCase(addCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = payload.data;
    });
    builder.addCase(getCategories.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { categorySearch } = categorySlice.actions;

export default categorySlice.reducer;
