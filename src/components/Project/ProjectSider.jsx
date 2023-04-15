import { Layout, Menu } from "antd";
import { HomeFilled, ProjectOutlined, IdcardOutlined } from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;
import "./ProjectSider.css";

const ProjectSider = (project_detail) => {
  console.log(project_detail);
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    {
      label: project_detail
        ? project_detail.project_detail.title
        : "Project Name",
      style: {
        textAlign: "center",
        fontSize: "15px",
        PointerEvents: "none",
        cursor: "default",
      },
      key: "#",
    },
    {
      label: "Tasks",
      key: "/ProjectDashboard/home",
      icon: <ProjectOutlined />,
    },
    {
      label: "Members",
      key: "/ProjectDashboard/members",
      icon: <IdcardOutlined />,
    },
  ];

  return (
    <Sider
      className="font-robo "
      style={{
        backgroundColor: "#fff",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Menu
        className="mt-10"
        mode="vertical"
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

export default ProjectSider;
