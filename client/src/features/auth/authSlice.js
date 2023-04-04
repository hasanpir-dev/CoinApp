import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const name = localStorage.getItem("name") ? localStorage.getItem("name") : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  name,
  signInModal: false,
  signUpModal: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("name");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.name = null;
      state.userInfo = null;
    },
    changeSignInModal: (state, action) => {
      state.signInModal = action.payload;
    },
    changeSignUpModal: (state, action) => {
      state.signUpModal = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
      state.signInModal = false;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.signUpModal = false;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logout, changeSignInModal, changeSignUpModal } =
  authSlice.actions;

export default authSlice.reducer;