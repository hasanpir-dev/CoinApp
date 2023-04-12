import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import getApiUrl from "../../utilities/getApiUrl.js";
const backendURL = getApiUrl();

export const addCategory = createAsyncThunk(
  "category/add",
  async ({ title, description, image }, { rejectWithValue }) => {
    try {
      let authToken = localStorage.getItem("userToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + authToken,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/category/add`,
        { title, description, image },
        config
      );
      toast.success("You have created new category", {
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
export const editCategory = createAsyncThunk(
  "category/edit",
  async ({ title, description, image }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/auth/login`,
        { title, description, image },
        config
      );

      toast.success("Category name changed successfully.", {
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

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async ({ title }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/category?title=${title}`
      );
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
