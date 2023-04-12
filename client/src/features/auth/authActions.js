import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import getApiUrl from "../../utilities/getApiUrl.js";
const backendURL = getApiUrl();

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/auth/register`,
        { name, email, password },
        config
      );
      localStorage.setItem("name", data.data.name);
      localStorage.setItem("user_id", data.data.user_id);
      localStorage.setItem("userToken", data.token);
      toast.success("You have registered successfully.", {
        position: "top-left",
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(
          toast.error(error.response.data.message, {
            position: "top-left",
            autoClose: 5000,
          })
        );
      } else {
        return rejectWithValue(
          toast.error(error.message, {
            position: "top-left",
            autoClose: 5000,
          })
        );
      }
    }
  }
);
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/auth/login`,
        { email, password },
        config
      );
      localStorage.setItem("name", data.data.name);
      localStorage.setItem("user_id", data.data.user_id);
      localStorage.setItem("userToken", data.token);
      toast.success("You have logged in successfully.", {
        position: "top-left",
      });

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(
          toast.error(error.response.data.message, {
            position: "top-left",
            autoClose: 5000,
          })
        );
      } else {
        return rejectWithValue(
          toast.error(error.message, {
            position: "top-left",
            autoClose: 5000,
          })
        );
      }
    }
  }
);
