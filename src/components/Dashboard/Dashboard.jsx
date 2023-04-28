import DashboardHeader from "./DashboardHeader";
import DashboardSider from "./DashboardSider";
import { Layout, Space, Typography, notification, message, Spin } from "antd";
import DashboardContent from "./DashboardContent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getCurrentUserRole } from "../../features/auth/authActions";
import { getMemberList } from "../../features/member/memberActions";
import { LoadingOutlined } from "@ant-design/icons";
import MySpin from "./MySpin";
import { GooSpinner } from "react-spinners-kit";

const Dashboard = () => {
  const [api, context] = notification.useNotification();
  const [messageApi, contextHolder] = message.useMessage();
  const success = (ex) => {
    messageApi.open({
      type: "success",
      content: `Welcome!  ${ex}`,
    });
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "You remembered your password ",
      description: "You don't need to login again",
      placement: "bottomRight",
      duration: 20,
    });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // dispatch(getCurrentUserRole());
  const expiredAt = useSelector((state) => state.auth.expiredAt);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector((state) => state.auth.loading);
  // console.log(isLoggedIn);
  const isRemember = useSelector((state) => state.auth.remember);
  const user_email = useSelector((state) => state.auth.user_login_email);
  const user_pwd = useSelector((state) => state.auth.user_login_pwd);
  const expiredDate = new Date(expiredAt);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedExpire = expiredDate.toLocaleString("en-US", options);

  useEffect(() => {
    // isLoggedIn ? success(user_email) : navigate("/loginfailed");
    isLoggedIn ? dispatch(getCurrentUserRole()) : navigate("/loginfailed");
  }, [isLoggedIn]);
  useEffect(() => {
    isRemember ? openNotificationWithIcon("warning") : null;
  }, [isRemember]);

  // isRemember ? Cookies.set("login_info", user_email, { expires: 1 }) : null;
  // isRemember ? Cookies.set("password", user_pwd, { expires: 1 }) : null;
  // isRemember ? Cookies.set("cookie_loggedin", true, { expires: 1 }) : null;
  // isRemember

  //   : null;
  return (
    <>
      <Layout
        style={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <DashboardHeader />

        <Layout>
          {loading ? (
            <MySpin />
          ) : (
            <>
              <DashboardSider />
              <DashboardContent />
            </>
          )}
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
