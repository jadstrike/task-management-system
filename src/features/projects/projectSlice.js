import { createSlice } from "@reduxjs/toolkit";
import {
  createProject,
  createTask,
  DeleteProject,
  getProjectDetail,
  getProjectList,
  updateProject,
} from "./projectActions";

const initialState = {
  loading: false,
  projects_list: null,
  error: null,
  success: false,
  detail_project: null,
  refresh: null,

  deleteMessage: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //CREATE Project
    builder.addCase(createProject.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.refresh = null;
    });
    builder.addCase(createProject.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.refresh = payload;
    });
    builder.addCase(createProject.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(state.error);
      state.success = false;
    });

    //DELETE PROJECT
    builder.addCase(DeleteProject.pending, (state) => {
      console.log("deleting");
      state.deleteMessage = null;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(DeleteProject.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.deleteMessage = payload;
    });
    builder.addCase(DeleteProject.rejected, (state, { payload }) => {
      state.deleteMessage = null;
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //PROJECT LISTS
    builder.addCase(getProjectList.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProjectList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.projects_list = payload;
    });
    builder.addCase(getProjectList.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(state.error);
      state.success = false;
    });
    //UPDATE PROJECT
    builder.addCase(updateProject.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.refresh = null;
    });
    builder.addCase(updateProject.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.refresh = payload;

      // console.log(payload);
      // state.projects_list = payload;
    });
    builder.addCase(updateProject.rejected, (state, { payload }) => {
      // state.project_successfully_updated = false;
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //Get PROJECT DETAIL
    builder.addCase(getProjectDetail.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProjectDetail.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.detail_project = payload;
      // state.projects_list = payload;
    });
    builder.addCase(getProjectDetail.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //TASK CREATE
    builder.addCase(createTask.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      // console.log(payload);
      // state.projects_list = payload;
    });
    builder.addCase(createTask.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(state.error);
      state.success = false;
    });
  },
});

export default projectSlice.reducer;
