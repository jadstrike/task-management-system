import { Avatar, Badge, Breadcrumb, Layout, Menu, theme, Spin } from "antd";
import { BellFilled, UserOutlined } from "@ant-design/icons";
import ProjectSider from "./ProjectSider";
import ProjectCard from "../UI/ProjectCard";
import ProjectContent from "./ProjectTasks";
import { useSelector } from "react-redux";
import MySpin from "../Dashboard/MySpin";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const { Header, Content, Footer } = Layout;
const ProjectDashboard = () => {
  const navigate = useNavigate();
  const project_detail = useSelector((state) => state.project.detail_project);

  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          margin: 0,
          width: "100vw",
          position: "fixed",
          backgroundColor: "#597EF7",
          zIndex: 1,
        }}
      >
        <div
          className="flex justify-between items-center pl-2 pr-2 ml-2 mr-2  "
          style={{
            height: "100%",
          }}
        >
          <img src="/logotitle.svg" alt="" />
          <div className="flex space-x-5">
            <Badge count={"1"} size="small">
              <BellFilled
                className="mt-2"
                style={{ fontSize: "20px", color: "#fff" }}
              />
            </Badge>
            <Avatar
              className=" cursor-pointer"
              onClick={() => navigate("/dashboard/profile")}
              icon={<UserOutlined />}
            />
          </div>
        </div>
      </Header>
      <Layout
        style={{
          minHeight: "100vh",
        }}
        className="mt-14"
      >
        {project_detail !== null ? (
          <>
            <ProjectSider project_detail={project_detail} />
            <Outlet />
          </>
        ) : (
          <MySpin />
        )}
      </Layout>
    </Layout>
  );
};

export default ProjectDashboard;
