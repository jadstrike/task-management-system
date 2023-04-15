import axios from "axios";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");
const Authorization = `Bearer ${token}`;

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
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
      //store user's token in local storage
      // console.log(data);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//TO GET CURRENT USER ROLE
export const getCurrentUserRole = createAsyncThunk(
  "auth/CurrentUserRole",
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/currentUserRole`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      // console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.messsage) {
        return error.response.data.messsage;
      } else {
        return error.messsage;
      }
    }
  }
);
