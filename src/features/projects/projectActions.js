import axios from "axios";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";
import { createAsyncThunk } from "@reduxjs/toolkit";
const backendURL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const Authorization = `Bearer ${token}`;

//CREATE PROJECT
export const createProject = createAsyncThunk(
  "project/create",
  async ({ title, description, userId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/createProject`,
        { title, description, userId },
        config
      );
      //store user's token in local storage
      // console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//DELETE PROJECT
export const DeleteProject = createAsyncThunk(
  "project/delete",
  async (projecId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.delete(
        `${backendURL}/api/deleteProject/${projecId}`,
        config
      );
      //store user's token in local storage
      console.log(data);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

//PROJECT LISTS
export const getProjectList = createAsyncThunk(
  "project/getprojectlist",
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/getCreatedProject`,

        config
      );
      //store user's token in local storage
      // console.logdata);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

//UPDATE PROJECT
export const updateProject = createAsyncThunk(
  "project/updateproject",
  async ({ title, description, userId, id }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization: Authorization,
        },
      };
      // console.log("THis is detail ID" + id);
      const { data } = await axios.put(
        `${backendURL}/api/updateProject/${id}`,
        { title, description, userId },
        config
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.messsage) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  }
);

//GET PROJECT DETAIL
export const getProjectDetail = createAsyncThunk(
  "project/getProjectDetail",
  async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/project/${id}`,

        config
      );
      //store user's token in local storage
      // console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

//CREATE TASKS
export const createTask = createAsyncThunk(
  "project/createTask",
  async (
    { title, description, dueDate, userId, priorityStatus, id },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/createTask/${id}`,
        { title, description, dueDate, userId, priorityStatus },
        config
      );
      //store user's token in local storage
      // console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//GET ALL TASKS IN Project
export const getProjectTasks = createAsyncThunk(
  "project/getProjectTasks",
  async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/getTasks/${id}`,

        config
      );
      //store user's token in local storage
      // console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

//GET In Progrss TASKS IN Project
export const getInProgressTasks = createAsyncThunk(
  "project/getInProgressTasks",
  async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/inProgressList/${id}`,

        config
      );
      //store user's token in local storage
      // console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

//GET To Do Tasks In Project
export const getToDoTasks = createAsyncThunk(
  "project/getToDoTasks",
  async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/toDoList/${id}`,

        config
      );
      //store user's token in local storage
      // console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

//GET DONE Tasks In Project
export const getDoneTasks = createAsyncThunk(
  "project/getDoneTasks",
  async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/doneList/${id}`,

        config
      );
      //store user's token in local storage
      // console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);
