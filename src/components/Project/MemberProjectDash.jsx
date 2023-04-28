import { Avatar, Badge, Breadcrumb, Layout, Menu, theme, Spin } from "antd";
import { BellFilled, UserOutlined } from "@ant-design/icons";
import ProjectSider from "./ProjectSider";
import ProjectCard from "../UI/ProjectCard";
import ProjectContent from "./ProjectTasks";
import { useSelector } from "react-redux";
import MySpin from "../Dashboard/MySpin";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProjectHeader from "../UI/ProjectHeader";
import ProjectTasks from "./ProjectTasks";
import MemberProjectTasks from "./MProjectTasks";
const { Header, Content, Footer } = Layout;
const MemberProjectDash = () => {
  const navigate = useNavigate();
  const project_detail = useSelector((state) => state.project.detail_project);
  const role = useSelector((state) => state.auth.role);

  return (
    <Layout
      style={{
        overflow: "hidden",
      }}
    >
      <ProjectHeader />

      <Layout
        style={{
          minHeight: "100vh",
        }}
        className=""
        // className="mt-14"
      >
        {project_detail !== null ? <MemberProjectTasks /> : <MySpin />}
      </Layout>
    </Layout>
  );
};

export default MemberProjectDash;
