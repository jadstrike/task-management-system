import { createSlice } from "@reduxjs/toolkit";
import {
  createMember,
  DeleteMember,
  DetailMember,
  endTask,
  getcurrentUserCompleteProject,
  getcurrentUserIncompleteProject,
  getcurrentUserInProgressProject,
  getCurrentUserProjects,
  getCurrentUserToDoProject,
  getEventList,
  getMemberList,
  getPositinLists,
  getUserDoneTasks,
  getUserFailedTasks,
  getUserInProgressTasks,
  getUserToDoTasks,
  startTask,
  stopTask,
  subscribe,
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
  User_Todo_Projects: null,
  User_Inprogress_Projects: null,
  User_Complete_Projects: null,
  User_Incomplete_Projects: null,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    taskCardId: (state, action) => {
      state.currentTaskCardId = action.payload;
      console.log(state.currentTaskCardId);
    },
    resetMember: (state) => {
      Object.assign(state, initialState);
    },
  },
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

    builder.addCase(startTask.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(startTask.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(startTask.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    builder.addCase(getCurrentUserToDoProject.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      getCurrentUserToDoProject.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.User_Todo_Projects = payload;
      }
    );
    builder.addCase(
      getCurrentUserToDoProject.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        console.log(state.error);
      }
    );
    builder.addCase(getcurrentUserInProgressProject.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      getcurrentUserInProgressProject.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.User_Inprogress_Projects = payload;
      }
    );
    builder.addCase(
      getcurrentUserInProgressProject.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        console.log(state.error);
      }
    );

    builder.addCase(getcurrentUserIncompleteProject.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      getcurrentUserIncompleteProject.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.User_Incomplete_Projects = payload;
      }
    );
    builder.addCase(
      getcurrentUserIncompleteProject.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        console.log(state.error);
      }
    );

    builder.addCase(getcurrentUserCompleteProject.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      getcurrentUserCompleteProject.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.User_Complete_Projects = payload;
      }
    );
    builder.addCase(
      getcurrentUserCompleteProject.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        console.log(state.error);
      }
    );
    builder.addCase(subscribe.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(subscribe.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.notis = payload;
    });
    builder.addCase(subscribe.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    builder.addCase(getEventList.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getEventList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.User_Todo_Projects = payload;
    });
    builder.addCase(getEventList.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    builder.addCase(stopTask.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(stopTask.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      console.log(payload);
    });
    builder.addCase(stopTask.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    builder.addCase(endTask.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(endTask.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(endTask.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });
  },
});

export const { taskCardId, resetMember } = memberSlice.actions;

export default memberSlice.reducer;
