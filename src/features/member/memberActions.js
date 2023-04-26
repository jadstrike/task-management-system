import axios from "axios";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";

import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const Authorization = `Bearer ${token}`;

//CREATE MEMBER
export const createMember = createAsyncThunk(
  "member/create",
  async ({ username, email, password, positionId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/createMember`,
        { username, email, password, positionId },
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

//GET POSITIONS LISTS//
export const getPositinLists = createAsyncThunk(
  "member/positionlists",
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/positionLists`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.messsage;
      }
    }
  }
);

//GET POSITION LISTS//

//GET MEMBER LISTS

export const getMemberList = createAsyncThunk(
  "member/getMemberlist",
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/getMember/2`,

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

//DELETE MEMBER
export const DeleteMember = createAsyncThunk(
  "member/DeleteMember",
  async (id) => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.delete(
        `${backendURL}/api/deleteMember/${id}`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      // console.log(data);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }
);

export const DetailMember = createAsyncThunk(
  "member/DetailMember",
  async (id) => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/member/${id}`,
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

//CurrentUserProjects

export const getCurrentUserProjects = createAsyncThunk(
  "member/getCurrentUserProjects",
  async () => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/getCurrentUserProjects`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      console.log(data);
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

export const getUserToDoTasks = createAsyncThunk(
  "member/getUserToDoTasks",
  async () => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/currentUserToDoTasks`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      console.log(data);
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

export const getUserInProgressTasks = createAsyncThunk(
  "member/getUserInProgressTasks",
  async () => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/currentUserInProgressTasks`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      console.log(data);
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

export const getUserDoneTasks = createAsyncThunk(
  "member/getUserDoneTasks",
  async () => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/currentUserDoneTasks`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      console.log(data);
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

export const getUserFailedTasks = createAsyncThunk(
  "member/getCurrentUserFailedTasks",
  async () => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/currentUserFailedTasks`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      console.log(data);
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

export const startTask = createAsyncThunk("member/startTask", async (id) => {
  const startTime = new Date().toISOString();
  console.log(startTime);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
    };
    const { data } = await axios.post(
      `${backendURL}/api/${id}/startTime`,
      { startTime },
      // { title, imageUrl, description },
      config
    );
    // store user's token in loacl storage
    console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.messsage) {
      return error.response.data.messsage;
    } else {
      return error.messsage;
    }
  }
});

export const stopTask = createAsyncThunk("member/stopTask", async (id) => {
  const stopTime = new Date().toISOString(); //Pyin ya mye
  console.log(startTime);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
    };
    const { data } = await axios.post(
      `${backendURL}/api/${id}/${stopTime}stopTime`, // Pyin ya mye
      { startTime },
      // { title, imageUrl, description },
      config
    );
    // store user's token in loacl storage
    console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.messsage) {
      return error.response.data.messsage;
    } else {
      return error.messsage;
    }
  }
});

export const endTask = createAsyncThunk(
  "member/stopTask",
  async (id, time_sheet_id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/${id}/${time_sheet_id}stopTime`, // Pyin ya mye
        { startTime },
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      console.log(data);
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

export const getCurrentUserToDoProject = createAsyncThunk(
  "member/currentUserToDoProject",
  async () => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/currentUserToDoProject`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      console.log(data);
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

export const getcurrentUserInProgressProject = createAsyncThunk(
  "member/getcurrentUserInProgressProject",
  async () => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/currentUserInProgressProject`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      console.log(data);
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

export const getcurrentUserCompleteProject = createAsyncThunk(
  "member/getcurrentUserCompleteProject",
  async () => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/currentUserCompleteProject`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      console.log(data);
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

export const getcurrentUserIncompleteProject = createAsyncThunk(
  "member/getcurrentUserIncompleteProject",
  async () => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/currentUserIncompleteProject`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      console.log(data);
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

export const subscribe = createAsyncThunk("member/subscribe", async () => {
  // console.log(token);
  // console.log(title);
  // console.log(imageUrl);
  // console.log(description);

  // console.log(id);
  // console.log(Authorization);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization,
      },
    };
    const { data } = await axios.get(
      `${backendURL}/event/subscribe`,
      // { title, imageUrl, description },
      config
    );
    // store user's token in loacl storage
    console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.messsage) {
      return error.response.data.messsage;
    } else {
      return error.messsage;
    }
  }
});

export const getEventList = createAsyncThunk(
  "member/getEventList",
  async () => {
    // console.log(token);
    // console.log(title);
    // console.log(imageUrl);
    // console.log(description);

    // console.log(id);
    // console.log(Authorization);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",

          Authorization,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/currentUserIncompleteProject`,
        // { title, imageUrl, description },
        config
      );
      // store user's token in loacl storage
      console.log(data);
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
