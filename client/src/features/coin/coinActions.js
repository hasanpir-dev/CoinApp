import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const backendURL = "http://localhost:4000";

export const addCoin = createAsyncThunk(
  "coin/add",
  async (
    {
      title,
      faceValue,
      year,
      price,
      country,
      metal,
      shortDesc,
      longDesc,
      quality,
      weight,
      imgObverse,
      imgReverse,
      category,
    },
    { rejectWithValue }
  ) => {
    const id = category;
    try {
      let authToken = localStorage.getItem("userToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + authToken,
        },
      };
      const data = await axios.post(
        `${backendURL}/api/category/${id}/coins`,
        {
          title,
          faceValue,
          year,
          price,
          country,
          metal,
          shortDesc,
          longDesc,
          quality,
          weight,
          imgObverse,
          imgReverse,
        },
        config
      );
      toast.success("You added new coin", {
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
export const editCoin = createAsyncThunk(
  "coin/editCoin",
  async (
    {
      title,
      faceValue,
      year,
      price,
      country,
      metal,
      shortDesc,
      longDesc,
      quality,
      weight,
      imgObverse,
      imgReverse,
      category,
      _id,
    },
    { rejectWithValue }
  ) => {
    let authToken = localStorage.getItem("userToken");
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + authToken,
        },
      };
      const { data } = await axios.put(
        `${backendURL}/api/coins/${_id}/edit`,
        {
          title,
          faceValue,
          year,
          price,
          country,
          metal,
          shortDesc,
          longDesc,
          quality,
          weight,
          imgObverse,
          imgReverse,
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
  async (
    {
      user_id,
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
    console.log(
      user_id,
      title,
      country,
      metal,
      quality,
      priceFrom,
      priceTo,
      yearFrom,
      yearTo
    );
    try {
      const { data } = await axios.get(
        `${backendURL}/api/users/${user_id}/coins?title=${title}&year=${yearFrom},${yearTo}&price=${priceFrom},${priceTo}&country=${country}&metal=${metal}&quality=${quality}`
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
