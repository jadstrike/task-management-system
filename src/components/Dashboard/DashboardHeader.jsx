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
  message,
} from "antd";
import {
  BellFilled,
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { SwapSpinner } from "react-spinners-kit";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";
import logotitle from "/logotitle.svg";
import { getProjectList } from "../../features/projects/projectActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { persistor } from "../../app/store";
import {
  getCurrentUserProjects,
  getMemberList,
  getUserDoneTasks,
  getUserFailedTasks,
  getUserInProgressTasks,
  getUserToDoTasks,
} from "../../features/member/memberActions";
import { logout } from "../../features/auth/authSlice";
const { Title } = Typography;

const { Header } = Layout;

const DashboardHeader = () => {
  const dispatch = useDispatch();

  const backendURL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const Authorization = `Bearer ${token}`;
  const [passwordMode, setPasswordMode] = useState(false);
  const [logOutLoading, setLogOutLoading] = useState(false);
  const [ProfileData, setProfileData] = useState(null);
  const [isDisabled, setDisabled] = useState(true);
  const [Loading, setLoading] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const role_id = useSelector((state) => state.auth.role_id);
  const memberCount = useSelector((state) => state.content.memberCount);
  const projectsCount = useSelector((state) => state.content.projectsCount);
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // console.log("IsDiabled: ", isDisabled);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDisabled(true);
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
    // setDisabled(true);

    const data = {
      username: formdata.username,
      email: formdata.email,
      password: "12345",
      imgUrl: formdata.imgurl,
      positionId: 1,
    };

    const member_update_data = {
      username: formdata.username,
      email: formdata.email,
      imgUrl: formdata.imgurl,
      positionId: ProfileData.positionId,
    };

    // console.log(data);
    // console.log(member_update_data);
    setLoading(true);
    role === "ROLE_ADMIN"
      ? axios
          .put(`${backendURL}/api/updateAdmin/1`, data, {
            headers: {
              Authorization: Authorization,
            },
          })
          .then((response) => {
            setLoading(false);
            setProfileData(response.data);
            // console.log(ProfileData);
            message.success("Profile Updated Successfully");
            setDisabled(true);
            // handle successful response here
          })
          .catch((error) => {
            console.log(error.response.data.message);
            error_message = error.data.message;
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: message,
            });

            // handle error here
          })
      : axios
          .put(
            `${backendURL}/api/updateMember/${role_id}`,
            member_update_data,
            {
              headers: {
                Authorization: Authorization,
              },
            }
          )
          .then((response) => {
            setLoading(false);
            setProfileData(response.data);
            // console.log(ProfileData);
            message.success("Profile Updated Successfully");
            setDisabled(true);
            // handle successful response here
          })
          .catch((error) => {
            // console.log(error.response.data.message);
            // error_message = error.data.message;
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: error,
              // text: error,
            });
          });

    // setLoading(true);
  };
  useEffect(() => {
    if (role === "ROLE_USER") {
      dispatch(getUserToDoTasks());
      dispatch(getUserInProgressTasks());
      dispatch(getUserDoneTasks());
      dispatch(getUserFailedTasks());
    } else {
      null;
    }
  }, [role]);

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("root");
    persistor.purge();

    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    role === "ROLE_ADMIN"
      ? axios
          .get(`${backendURL}/api/member/1`, {
            headers: {
              Authorization: Authorization,
            },
          })
          .then((response) => {
            setProfileData(response.data);
            // console.log(ProfileData);
            // setLoading(false);
            // handle successful response here
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: { error },
            });

            // handle error here
          })
      : role === "ROLE_USER"
      ? axios
          .get(`${backendURL}/api/member/${role_id}`, {
            headers: {
              Authorization: Authorization,
            },
          })
          .then((response) => {
            setProfileData(response.data);
            console.log(ProfileData);
            // setLoading(false);
            // handle successful response here
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: { error },
            });
            // handle error here
          })
      : null;
  }, [role]);

  return (
    ProfileData !== null && (
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
                src={ProfileData.imgUrl}
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
          <div className="flex flex-col justify-start items-center">
            <Avatar
              shape="square"
              size={80}
              src={ProfileData.imgUrl}
              icon={<UserOutlined />}
            ></Avatar>
            <div className=" w-[300px] mt-4 h-[280px] bg-[#FFFFFF] flex flex-col justify-start pt-4  items-center">
              <Title level={5}>About Me</Title>
              {isDisabled ? (
                <div className="">
                  {Loading ? (
                    <Spin />
                  ) : (
                    <table className=" text-sm  my-3">
                      <tbody>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Name:
                          </td>
                          <td className="px-2 py-2">{ProfileData.username}</td>
                          {console.log(ProfileData)}
                        </tr>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Email:
                          </td>
                          <td className="px-2 py-2">{ProfileData.email}</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Password:
                          </td>
                          <td className="px-2 py-2">********</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Position:
                          </td>
                          <td className="px-2 py-2">
                            {ProfileData.positionName}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}

                  <div className=" flex flex-row mt-10 items-start justify-evenly">
                    <a onClick={() => setDisabled(false)}>Edit Profile</a>
                    <span>|</span>
                    <a
                    // onClick={() => setDisabled(false)}
                    >
                      Change Password
                    </a>
                  </div>
                </div>
              ) : (
                <Form
                  form={form}
                  initialValues={{
                    username: ProfileData.username,
                    email: ProfileData.email,
                    imgurl: ProfileData.imgUrl,
                  }}
                  onFinish={handleUpdate}
                >
                  <Form.Item label="Name" name="username">
                    <Input></Input>
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input type="email"></Input>
                  </Form.Item>
                  <Form.Item label="Image" name="imgurl">
                    <Input></Input>
                  </Form.Item>

                  <div className=" flex flex-row space-x-3 justify-center items-center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={Loading}
                      style={{ width: "100px", height: "40px" }}
                    >
                      Save
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setDisabled(true)}
                      style={{
                        width: "100px",
                        height: "40px",
                        backgroundColor: "gray",
                      }}
                    >
                      Back
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          </div>

          <Title className=" ml-3 mt-3" level={5}>
            Activity
          </Title>
          <div className=" flex flex-row space-x-2 justify-center items-center">
            <div className=" w-[160px] h-[95px] bg-white flex flex-col justify-center space-y-2 items-start">
              <span className=" ml-3 text-gray-400">Total Projects</span>
              <span className=" text-lg ml-3">
                {role === "ROLE_ADMIN"
                  ? projectsCount
                  : role === "ROLE_USER"
                  ? ProfileData.projects.length
                  : null}
              </span>
            </div>
            <div className=" w-[160px] h-[95px] bg-white flex flex-col justify-center space-y-2 items-start ">
              <span className=" ml-3 text-gray-400">
                {role === "ROLE_ADMIN" ? "Total Members" : "Total Tasks"}
              </span>
              <span className=" ml-3 text-lg">
                {role === "ROLE_ADMIN"
                  ? memberCount
                  : role === "ROLE_USER"
                  ? ProfileData.tasks.length
                  : null}
              </span>
            </div>
          </div>
          <div
            onClick={() => handleLogout()}
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
    )
  );
};

export default DashboardHeader;
