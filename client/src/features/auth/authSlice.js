import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const name = localStorage.getItem("name") ? localStorage.getItem("name") : null;

const initialState = {
  loading: false,
  userToken,
  error: null,
  success: false,
  name,
  user_id: null,
  authorized: false,
  signInModal: false,
  signUpModal: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("user_id");
      localStorage.removeItem("name");
      state.loading = false;
      state.user_id = null;
      state.userToken = null;
      state.error = null;
      state.name = null;
      state.authorized = false;
    },
    getAuth: (state, action) => {
      state.name = action.payload.name;
      state.authorized = action.payload.success;
      state.user_id = action.payload.id;
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
      state.userToken = payload.userToken;
      state.signInModal = false;
      state.authorized = true;
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
      state.authorized = true;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logout, getAuth, changeSignInModal, changeSignUpModal } =
  authSlice.actions;

export default authSlice.reducer;
