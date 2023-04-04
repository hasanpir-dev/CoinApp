import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  editModal: false,
  filterModal: false,
  coinListModal: false,
  categoryModal: false,
};

const editModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    changeFilterModal: (state, action) => {
      state.filterModal = action.payload;
    },
    changeCoinListModal: (state, action) => {
      state.coinListModal = action.payload;
    },
    changeCategoryModal: (state, action) => {
      state.categoryModal = action.payload;
    },
  },
});

export const {
  changeEditModal,
  changeFilterModal,
  changeCoinListModal,
  changeCategoryModal,
} = editModalSlice.actions;
export default editModalSlice.reducer;
