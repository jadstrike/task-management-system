import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserRole, userLogin } from "./authActions";
import Cookies from "js-cookie";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;
const cookie_loggedin = Cookies.get("cookie_loggedin");
const cookie_expireat = Cookies.get("cookie_expireat");

const initialState = {
  loading: false,
  userInfo: null,
  userToken, //for storing JWT
  imgurl: null,
  role: null,
  error: null,
  success: false,
  remember: false,
  isLoggedIn: cookie_loggedin,
  user_login_email: null,
  user_login_pwd: null,
  expiredAt: cookie_expireat,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    remember: (state, action) => {
      // console.log(action.payload);
      state.remember = true;
      state.user_login_email = action.payload.email;
      state.user_login_pwd = action.payload.password;
    },
  },
  extraReducers: (builder) => {
    //USER LOGIN
    builder.addCase(userLogin.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.token;
      state.expiredAt = payload.expiredAt;
      state.success = true;
      state.isLoggedIn = true;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log(state.error);
    });
    //USER LOGIN
    //----------------------------//

    //CURRENT USER ROLE
    builder.addCase(getCurrentUserRole.pending, (state) => {
      // console.log("pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUserRole.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.role = payload[0].roleName;
      state.imgurl = payload[0].imgUrl;

      console.log(state.role);
      console.log(state.imgurl);
    });
    builder.addCase(getCurrentUserRole.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(state.error);
      state.success = false;
    });
    //CURRENT USER ROLE
    //--------------------------//
  },
});

export const { remember } = authSlice.actions;

export default authSlice.reducer;
