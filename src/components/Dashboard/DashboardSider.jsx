import { Layout, Menu } from "antd";
import {
  HomeFilled,
  ProjectOutlined,
  IdcardOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const DashboardSider = () => {
  const ROLE = useSelector((state) => state.auth.role);
  const location = useLocation();
  const navigate = useNavigate();
  let menuItems = [];
  if (ROLE === "ROLE_ADMIN") {
    menuItems.push(
      {
        label: "Dashboard",
        icon: <HomeFilled />,
        key: "/dashboard/home",
      },
      {
        label: "Project Lists",
        key: "/dashboard/ProjectsLists",
        icon: <ProjectOutlined />,
      },
      {
        label: "Members",
        key: "/dashboard/members",
        icon: <IdcardOutlined />,
      }
    );
  } else if (ROLE === "ROLE_USER") {
    menuItems.push(
      {
        label: "Project Lists",
        key: "/dashboard/myprojects",
        icon: <ProjectOutlined />,
      },
      {
        label: "My Tasks",
        key: "/dashboard/mytasks",
        icon: <IdcardOutlined />,
      }
    );
  }

  return (
    <Sider
      className="font-robo"
      style={{
        backgroundColor: "#fff",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Menu
        className="mt-10"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
      ></Menu>
    </Sider>
  );
};

export default DashboardSider;
