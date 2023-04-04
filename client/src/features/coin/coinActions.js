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
  "coin/edit",
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
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/category/${_id}/coins/`
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
