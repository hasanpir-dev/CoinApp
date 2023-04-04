import { createSlice } from "@reduxjs/toolkit";
import { addCategory, getCategories } from "./categoryActions.js";

const initialState = {
  loading: false,
  error: null,
  success: false,
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategoryState: (state, action) => {
      state.categories.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.category = payload;
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

export const { addCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
