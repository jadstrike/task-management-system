import { createSlice } from "@reduxjs/toolkit";
import {
  createProject,
  createTask,
  DeleteProject,
  getDoneTasks,
  getFailedTasks,
  getInProgressTasks,
  getProjectDetail,
  getProjectList,
  getProjectTasks,
  getToDoTasks,
  updateProject,
} from "./projectActions";

const initialState = {
  loading: false,
  projects_list: null,
  error: null,
  success: false,
  detail_project: null,
  refresh: null,
  project_tasks: null,
  project_in_progress_tasks: null,
  project_to_do_tasks: null,
  project_done_tasks: null,
  project_failed_tasks: null,
  taskEdit: false,

  deleteMessage: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setTaskEdit: (state, action) => {
      state.taskEdit = true;
    },
  },
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

    //GET TASKS IN PROJECT
    builder.addCase(getProjectTasks.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProjectTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.project_tasks = payload;
      // console.log(payload);
      // state.projects_list = payload;
    });
    builder.addCase(getProjectTasks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(state.error);
      state.success = false;
    });

    //GET In Progress TASKS IN PROJECT
    builder.addCase(getInProgressTasks.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getInProgressTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.project_in_progress_tasks = payload;
      // console.log(payload);
      // state.projects_list = payload;
    });
    builder.addCase(getInProgressTasks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(state.error);
      state.success = false;
    });
    //GET TO DO TASKS
    builder.addCase(getToDoTasks.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getToDoTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.project_to_do_tasks = payload;
      // console.log(payload);
      // state.projects_list = payload;
    });
    builder.addCase(getToDoTasks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(state.error);
      state.success = false;
    });
    //GET DONE TASKS
    builder.addCase(getDoneTasks.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDoneTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.project_done_tasks = payload;
      // console.log(payload);
      // state.projects_list = payload;
    });
    builder.addCase(getDoneTasks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(state.error);
      state.success = false;
    });

    //GET Failed Tasks
    builder.addCase(getFailedTasks.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFailedTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.project_failed_tasks = payload;
      // console.log(payload);
      // state.projects_list = payload;
    });
    builder.addCase(getFailedTasks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(state.error);
      state.success = false;
    });
  },
});

export const { setTaskEdit } = projectSlice.actions;

export default projectSlice.reducer;
