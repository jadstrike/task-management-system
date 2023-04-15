import axiosInstance from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = import.meta.env.VITE_API_URL;

export const getMemberCount = createAsyncThunk(
  "content/memberCount",
  async () => {
    try {
      const { data } = await axiosInstance.get(
        `${baseURL}/api/allMemberCount/2`
      );
      //store user's token in local storage
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getProjectsCount = createAsyncThunk(
  "content/projectsCount",
  async () => {
    try {
      const { data } = await axiosInstance.get(
        `${baseURL}/api/createdProjectCount`
      );
      //store user's token in local storage
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
