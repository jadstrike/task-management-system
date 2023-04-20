import {
  Layout,
  Menu,
  Badge,
  Avatar,
  notification,
  Drawer,
  Typography,
  Form,
  Input,
  Button,
} from "antd";
import {
  BellFilled,
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import logotitle from "/logotitle.svg";
import { getProjectList } from "../../features/projects/projectActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getCurrentUserProjects,
  getMemberList,
} from "../../features/member/memberActions";
const { Title } = Typography;

const { Header } = Layout;

const DashboardHeader = () => {
  const backendURL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const Authorization = `Bearer ${token}`;
  const [Loading, setLoading] = useState(false);
  const memberCount = useSelector((state) => state.content.memberCount);
  const projectsCount = useSelector((state) => state.content.projectsCount);
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const [notiCount, setnotiCount] = useState(5);
  const navigate = useNavigate();
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

  const handleUpdate = (formdata) => {
    console.log(formdata);
    setLoading(true);
    const data = {
      username: formdata.username,
      email: formdata.email,
      password: "12345",
      imgUrl: formdata.imgurl,
      positionId: 1,
    };
  };

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .put(`${backendURL}/api/updateAdmin/1`, {
  //       headers: {
  //         Authorization: Authorization,
  //       },
  //     })
  //     .then((response) => {})

  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }, []);
  return (
    <>
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
            <Avatar
              src="https://thumbs.dreamstime.com/b/iron-man-17900674.jpg"
              className=" cursor-pointer"
              size={39}
              onClick={() => setIsDrawerOpen(true)}
              icon={<UserOutlined />}
            />
          </div>
        </div>
      </Header>
      <Drawer
        style={{
          backgroundColor: "#F5F5F5",
        }}
        title={"Profile"}
        // forceRender={true}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
      >
        <div className="flex flex-col items-center">
          <Avatar shape="square" size={64} icon={<UserOutlined />}></Avatar>
          <div className=" w-[300px] mt-4 h-[280px] bg-[#FFFFFF] flex flex-col justify-start pt-4 items-center">
            <Title level={5}>About Me</Title>
            <Form
              form={form}
              initialValues={{
                username: "Justin Bieber",
                email: "jb@gmail.com",
                imgurl: "justinBieber",
              }}
              onFinish={handleUpdate}
            >
              <Form.Item label="Name" name="username">
                <Input></Input>
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input></Input>
              </Form.Item>
              <Form.Item label="Image" name="imgurl">
                <Input></Input>
              </Form.Item>
              <div className=" flex justify-center items-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "150px", height: "40px" }}
                >
                  Update
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <Title className=" ml-3 mt-3" level={5}>
          Activity
        </Title>
        <div className=" flex flex-row space-x-2 justify-center items-center">
          <div className=" w-[160px] h-[95px] bg-white flex flex-col justify-center space-y-2 items-start">
            <span className=" ml-3 text-gray-400">Total Projects</span>
            <span className=" text-lg ml-3">{projectsCount}</span>
          </div>
          <div className=" w-[160px] h-[95px] bg-white flex flex-col justify-center space-y-2 items-start ">
            <span className=" ml-3 text-gray-400">Total Members</span>
            <span className=" ml-3 text-lg">{memberCount}</span>
          </div>
        </div>
        <div
          onClick={() => alert("HEHE LOGOUT")}
          className="flex flex-row cursor-pointer hover:bg-red-500 justify-center mt-5 items-center w-[334px] h-[40px] bg-[#2F54EB]"
        >
          <span className=" text-white">Log Out</span>
          <LogoutOutlined
            className=" ml-3"
            style={{ color: "white", fontSize: "20px" }}
          />
        </div>
      </Drawer>
    </>
  );
};

export default DashboardHeader;
