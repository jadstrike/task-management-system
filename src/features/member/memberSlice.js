import { createSlice } from "@reduxjs/toolkit";
import {
  createMember,
  DeleteMember,
  DetailMember,
  getCurrentUserProjects,
  getMemberList,
  getPositinLists,
  getUserDoneTasks,
  getUserFailedTasks,
  getUserInProgressTasks,
  getUserToDoTasks,
} from "./memberActions";

const initialState = {
  loading: false,
  members: null,
  error: null,
  success: false,
  positionLists: false,
  detail_member: null,
  member_projects: null,
  delete_error: null,
  member_creating: null,
  member_created: null,
  User_ToDo_Tasks: null,
  User_InProgress_Tasks: null,
  User_Done_Tasks: null,
  User_Failed_Tasks: null,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //CREATE MEMBER
    builder.addCase(createMember.pending, (state) => {
      // console.log("pending");
      // state.loading = true;
      state.error = null;
      state.member_creating = true;
    });
    builder.addCase(createMember.fulfilled, (state, { payload }) => {
      // state.loading = false;
      state.success = true;
      state.member_creating = false;
      if (state.member_created === true) {
        state.member_created = false;
      } else {
        state.member_created = true;
      }
    });
    builder.addCase(createMember.rejected, (state, { payload }) => {
      // state.loading = false;
      state.member_creating = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //------------------//
    //GET MEMBER LISTS
    builder.addCase(getMemberList.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.member_created = null;
    });
    builder.addCase(getMemberList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.members = payload;
    });
    builder.addCase(getMemberList.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //---------------//
    //DELETE MEMBER
    builder.addCase(DeleteMember.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.delete_error = null;
      // state.memberDeleted = false;
    });
    builder.addCase(DeleteMember.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;

      state.delete_error = payload;
      console.log(payload);
    });
    builder.addCase(DeleteMember.rejected, (state, { payload }) => {
      state.loading = false;

      state.error = payload;
      state.success = false;
      console.log(state.error);
    });
    //-----------------------------------//

    //POSITION LISTS//
    builder.addCase(getPositinLists.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getPositinLists.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.positionLists = payload;
      // console.log(payload);
    });
    builder.addCase(getPositinLists.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //DETAIL MEMBER//

    builder.addCase(DetailMember.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(DetailMember.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.detail_member = payload;
      // console.log(payload);
    });
    builder.addCase(DetailMember.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //DETAIL MEMBER/

    //GET CURRENT USER PROJECTS

    builder.addCase(getCurrentUserProjects.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getCurrentUserProjects.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.member_projects = payload;
    });
    builder.addCase(getCurrentUserProjects.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //GET USER TO DO TASKS
    builder.addCase(getUserToDoTasks.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getUserToDoTasks.fulfilled, (state, { payload }) => {
      console.log("User To Do" + payload);
      state.loading = false;
      state.success = true;
      state.User_ToDo_Tasks = payload;
    });
    builder.addCase(getUserToDoTasks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //GET USER IN PROGRESS TASKS
    builder.addCase(getUserInProgressTasks.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getUserInProgressTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.User_InProgress_Tasks = payload;
    });
    builder.addCase(getUserInProgressTasks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //GET USER DONE TASKS
    builder.addCase(getUserDoneTasks.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getUserDoneTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.User_Done_Tasks = payload;
    });
    builder.addCase(getUserDoneTasks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //GET USER DONE TASKS
    builder.addCase(getUserFailedTasks.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getUserFailedTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.User_Failed_Tasks = payload;
    });
    builder.addCase(getUserFailedTasks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });
  },
});

export default memberSlice.reducer;
