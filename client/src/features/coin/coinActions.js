import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import getApiUrl from "../../utilities/getApiUrl.js";
const backendURL = getApiUrl();

export const addCoin = createAsyncThunk(
  "coin/addCoin",
  async ({ category, ...values }, { rejectWithValue }) => {
    try {
      let authToken = localStorage.getItem("userToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + authToken,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/category/${category}/coins`,
        {
          ...values,
        },
        config
      );
      toast.success("You added new coin", {
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
export const editCoin = createAsyncThunk(
  "coin/editCoin",
  async ({ _id, ...values }, { rejectWithValue }) => {
    let authToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + authToken,
        },
      };
      const { data } = await axios.put(
        `${backendURL}/api/coins/${_id}/edit`,
        {
          ...values,
        },
        config
      );
      toast.success("You have edited coin.", {
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

export const getCoins = createAsyncThunk(
  "coin/getCoins",
  async (
    {
      id,
      title,
      country,
      metal,
      quality,
      priceFrom,
      priceTo,
      yearFrom,
      yearTo,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/category/${id}/coins?title=${title}&year=${yearFrom},${yearTo}&price=${priceFrom},${priceTo}&country=${country}&metal=${metal}&quality=${quality}`
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
export const getAllCoins = createAsyncThunk(
  "coin/getALLCoins",
  async (
    { title, country, metal, quality, priceFrom, priceTo, yearFrom, yearTo },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/coins?title=${title}&year=${yearFrom},${yearTo}&price=${priceFrom},${priceTo}&country=${country}&metal=${metal}&quality=${quality}`
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

export const getUserCoins = createAsyncThunk(
  "coin/getUserCoins",
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/users/${user_id}/coins`
      );
      return data.data;
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

export const getSingleCoin = createAsyncThunk(
  "coin/getSingleCoin",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendURL}/api/coins/${_id}`);
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
