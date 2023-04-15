import { Layout, Menu, Badge, Avatar, notification } from "antd";
import { BellFilled, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import logotitle from "../../assets/logotitle.svg";
import { getProjectList } from "../../features/projects/projectActions";
import {
  getCurrentUserProjects,
  getMemberList,
} from "../../features/member/memberActions";

const { Header } = Layout;

const DashboardHeader = () => {
  const [notiCount, setnotiCount] = useState(5);
  const openNotification = () => {
    setnotiCount(0);
    notification.open({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  return (
    <Header
      style={{
        background: "#597EF7",
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <div className="flex justify-between items-center font-robo">
        <div className="flex pt-4 pl-3 items-center text-white">
          <img src={logotitle} alt="Logo-img" />
        </div>
        <div className="flex pt-4 items-center mr-5">
          <Badge count={notiCount} className="mr-5">
            <BellFilled
              style={{ fontSize: "20px", color: "#fff" }}
              onClick={openNotification}
            />
          </Badge>
          <Avatar icon={<UserOutlined />} />
        </div>
      </div>
    </Header>
  );
};

export default DashboardHeader;
