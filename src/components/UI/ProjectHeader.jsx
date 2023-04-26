import {
  Badge,
  Layout,
  Avatar,
  Drawer,
  Form,
  message as antdMessage,
  Typography,
  Input,
  Button,
} from "antd";
const { Title } = Typography;
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BellFilled, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
const { Header } = Layout;

const ProjectHeader = () => {
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memberCount = useSelector((state) => state.content.memberCount);
  const projectsCount = useSelector((state) => state.content.projectsCount);
  const role = useSelector((state) => state.auth.role);
  const role_id = useSelector((state) => state.auth.role_id);
  const [ProfileData, setProfileData] = useState(null);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  console.log("IsDiabled: ", isDisabled);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDisabled(true);
    setPasswordEdit(false);
  };

  const showerror = (err) => {
    messageApi.open({
      type: "error",
      content: err,
    });
  };

  const backendURL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const Authorization = `Bearer ${token}`;
  //HandleChangePassword
  const handleChangePassword = (formdata) => {
    console.log(formdata);
    axios
      .put(`${backendURL}/api/changePassword`, formdata, {
        headers: {
          Authorization: Authorization,
        },
      })
      .then((response) => {
        setLoading(false);

        console.log(response);
        antdMessage.success("Profile Updated Successfully");
        setDisabled(true);
        setPasswordEdit(false);
        // handle successful response here
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // alert(error.response.data);
        showerror(error.response.data);
        // antdMessage.error(error.response.data);
      });
  };

  //HANDLING PROFILE DATA
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
      imgurl: formdata.imgurl,
      positionId: role_id,
    };
    console.log(data);
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
            console.log(ProfileData);
            antdMessage.success("Profile Updated Successfully");
            setDisabled(true);
            // handle successful response here
          })
          .catch((error) => {
            console.log(error.response.data.message);
            const error_message = error.data.message;
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error_message,
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
            console.log(ProfileData);
            antdMessage.success("Password Updated Successfully");
            setDisabled(true);
            // handle successful response here
          })

          .catch((error) => {
            // console.log(error.response.data.message);
            const error_message = error.data.message;
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error_message,
            });
            // handle error here
          });

    // setLoading(true);
  };

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/dashboard");
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
      : axios
          .get(`${backendURL}/api/member/${role_id}`, {
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
          });
  }, [role]);
  return (
    ProfileData !== null && (
      <>
        {contextHolder}
        <Header
          style={{
            padding: 0,
            margin: 0,
            width: "100vw",
            height: "64px",
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
            <div className="flex space-x-8">
              <Badge
                style={{ padding: 0, margin: 0 }}
                count={"1"}
                size={"small"}
              >
                <BellFilled
                  className="mt-2"
                  style={{ fontSize: "25px", color: "#fff" }}
                />
              </Badge>
              <Avatar
                size={40}
                src={ProfileData.imgUrl}
                onClick={() => setIsDrawerOpen(true)}
                className=" cursor-pointer"
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
              {isDisabled && passwordEdit ? (
                <Form
                  labelAlign="center"
                  layout="vertical"
                  // form={form}
                  onFinish={handleChangePassword}
                >
                  <Form.Item
                    requiredMark={false}
                    rules={[
                      {
                        required: true,
                        message: "Please input Old Password",
                      },
                    ]}
                    label="Old Password"
                    name="oldPassword"
                  >
                    <Input.Password></Input.Password>
                  </Form.Item>
                  <Form.Item
                    requiredMark={false}
                    rules={[
                      {
                        required: true,
                        message: "Please input New Password",
                      },
                    ]}
                    label="New Passsword"
                    name="newPassword"
                  >
                    <Input.Password></Input.Password>
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
                      onClick={() => {
                        setDisabled(true);
                        setPasswordEdit(false);
                        // form.resetFields();
                      }}
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
              ) : !isDisabled ? (
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
              ) : isDisabled ? (
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
                      onClick={() => {
                        setDisabled(true);
                        setPasswordEdit(true);
                      }}
                    >
                      Change Password
                    </a>
                  </div>
                </div>
              ) : null}
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

export default ProjectHeader;
