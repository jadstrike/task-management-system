import { Typography, Card, Button, Avatar, Tooltip } from "antd";
import {
  SettingOutlined,
  DashOutlined,
  AntDesignOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../UI/ProjectCard";
import {
  getCurrentUserProjects,
  getMemberList,
  getPositinLists,
} from "../../features/member/memberActions";
import ProjectPie from "./ProjectsDataPie";
import MySpin from "./MySpin";
import { getProjectList } from "../../features/projects/projectActions";
import {
  getMemberCount,
  getProjectsCount,
} from "../../features/content/contentActions";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const DashboardHome = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.member.loading);
  const memberCount = useSelector((state) => state.content.memberCount);
  const projectsCount = useSelector((state) => state.content.projectsCount);

  useEffect(() => {
    if (role === "ROLE_ADMIN") {
      console.log("admin");
      dispatch(getProjectList());
      dispatch(getMemberList());
      dispatch(getPositinLists());
      dispatch(getMemberCount());
      dispatch(getProjectsCount());
    } else {
      dispatch(getProjectList());
      dispatch(getCurrentUserProjects());

      navigate("/dashboard/myprojects");
    }
  }, [role]);

  return loading ? (
    <MySpin />
  ) : (
    <div>
      <div className="p-0 m-0 mt-5 flex justify-center ">
        <Title level={3}>Welcome to Dashboard</Title>
      </div>
      <div className="w-100 h-52  flex md:flex-row sm:flex-col justify-center items-start">
        <div className="flex space-x-10 mt-7">
          <Card
            title="Total Projects"
            bordered={false}
            headStyle={{ backgroundColor: "#D6E4FF" }}
            style={{
              width: 240,
              border: " 2px solid #597EF7",
            }}
          >
            <p className="font-bold pb-1">{projectsCount}</p>
            <p>Project count</p>
          </Card>
          <Card
            title="Total Members"
            bordered={false}
            headStyle={{ backgroundColor: "#FFE58F" }}
            style={{
              width: 240,
              border: " 2px solid #FFC53D",
            }}
          >
            <p className="font-bold pb-1">{memberCount}</p>
            <p>Members count</p>
          </Card>
        </div>
      </div>
      <div className=" h-full  bg-gray-100">
        <ProjectPie />
      </div>
      {/* <Title className="ml-4 pt-2" level={5}> */}
      {/* Completed Projects */}
      {/* </Title> */}
      {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ml-5 pl-5">
        {data.map((item, index) => (
          <ProjectCard
            key={index}
            item={item}
            index={index}
            fcolor={"#03C988"}
            scolor={"#DFFFD8"}
          />
        ))}
      </div> */}
    </div>
  );
};

export default DashboardHome;
