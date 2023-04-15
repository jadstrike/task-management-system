import { createSlice } from "@reduxjs/toolkit";
import { getMemberCount, getProjectsCount } from "./contentActions";
const initialState = {
  loading: false,
  memberCount: null,
  projectsCount: null,
  error: null,
  success: false,
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET MEMBER COUNT
    builder.addCase(getMemberCount.pending, (state) => {
      // console.log("pending");
      // state.loading = true;
      state.error = null;
      state.loading = true;
    });
    builder.addCase(getMemberCount.fulfilled, (state, { payload }) => {
      // state.loading = false;
      state.success = true;
      state.memberCount = payload;
    });
    builder.addCase(getMemberCount.rejected, (state, { payload }) => {
      // state.loading = false;
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });

    //GET PROJECTS COUNT
    builder.addCase(getProjectsCount.pending, (state) => {
      // console.log("pending");
      // state.loading = true;
      state.error = null;
      state.loading = true;
    });
    builder.addCase(getProjectsCount.fulfilled, (state, { payload }) => {
      // state.loading = false;
      state.success = true;
      state.projectsCount = payload;
    });
    builder.addCase(getProjectsCount.rejected, (state, { payload }) => {
      // state.loading = false;
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });
  },
});

export default contentSlice.reducer;
