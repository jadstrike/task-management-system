import { Layout, Menu } from "antd";
import {
  HomeFilled,
  ProjectOutlined,
  IdcardOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const DashboardSider = () => {
  const role = useSelector((state) => state.auth.role);
  const ROLE = "ROLE_ADMIN";

  const location = useLocation();
  const navigate = useNavigate();
  let menuItems = [];
  if (role === "ROLE_ADMIN") {
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
  } else if (role === "ROLE_USER") {
    menuItems.push(
      {
        label: "Project Lists",
        key: "/dashboard/myprojects",
        icon: <ProjectOutlined />,
      },
      {
        label: "My Tasks",
        key: "/dashboard/MyTasks",
        icon: <IdcardOutlined />,
        submenu: [
          {
            label: "To Do",
            key: "/dashboard/MyTasks/ToDo",
          },
          {
            label: "In Progress",
            key: "/dashboard/MyTasks/InProgress",
          },
          {
            label: "Completed",
            key: "/dashboard/MyTasks/Completed",
          },
          {
            label: "Failed",
            key: "/dashboard/MyTasks/Failed",
          },
        ],
      }
    );
  }

  return (
    <Sider
      className="font-robo"
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
        // overflow: "hidden",
      }}
    >
      <Menu
        className="mt-10"
        mode="inline"
        selectedKeys={[location.pathname]}
        // items={menuItems}
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
      >
        {menuItems.map((menuItem) => {
          if (menuItem.submenu) {
            return (
              <Menu.SubMenu
                key={menuItem.key}
                icon={menuItem.icon}
                title={menuItem.label}
              >
                {menuItem.submenu.map((subMenuItem) => (
                  <Menu.Item key={subMenuItem.key}>
                    {subMenuItem.label}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          } else {
            return (
              <Menu.Item key={menuItem.key} icon={menuItem.icon}>
                {menuItem.label}
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </Sider>
  );
};

export default DashboardSider;
