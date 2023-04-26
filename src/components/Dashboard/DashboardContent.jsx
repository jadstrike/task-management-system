import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import { Content } from "antd/es/layout/layout";
const DashboardContent = () => {
  const contentStyle = {
    // textAlign: "center",
    height: "100vh",
    lineHeight: "120px",
    overflow: "auto",
    // color: "red",
    backgroundColor: "#fff",
  };
  return (
    <Layout>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DashboardContent;
