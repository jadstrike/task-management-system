import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserRole, userLogin } from "../features/auth/authActions";
import LoginFailed from "./Error/LoginFailed";
import { UserOutlined, ThunderboltFilled } from "@ant-design/icons";
import {
  Card,
  Avatar,
  Space,
  Typography,
  Input,
  Button,
  Form,
  Checkbox,
} from "antd";
import { useEffect } from "react";
import { remember } from "../features/auth/authSlice";
import { persistor } from "../app/store";
const { Title } = Typography;
const Login = () => {
  // persistor.purge();

  const username = Cookies.get("login_info");
  const password = Cookies.get("password");
  // console.log(username);
  const isLoading = useSelector((state) => state.auth.loading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (data) => {
    data.remember === true ? dispatch(remember(data)) : null;
    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      // dispatch(getCurrentUserRole());
      navigate("/dashboard");
    } else {
      <LoginFailed />;
    }
  }, [isLoggedIn]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen font-robo  ">
      <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:content-center lg:items-center flex flex-col items-center ">
        <img
          className="m-0 p-0 mb-8"
          src="src/assets/login.svg"
          alt="login-illustration"
        />

        <Card
          className="w-80 h-90"
          style={{
            // width: 330,
            // height: 406,
            border: 2,
            borderColor: "#F0F0F0",
            borderStyle: "solid",
            background: "#FAFAFA",
          }}
        >
          <div className="flex justify-center">
            <img src="src/assets/Group.svg" alt="" />
          </div>

          <p className="mt-5 mb-5">Log in</p>
          <Form
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ margin: 0, padding: 0 }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
              style={{ margin: 0, padding: 0 }}
            >
              <Input className="" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
              style={{ margin: 0, padding: 0 }}
            >
              <Input.Password className="mt-5" placeholder="Password" />
            </Form.Item>
            <Form.Item
              style={{ margin: 0, padding: 0 }}
              name="remember"
              valuePropName="checked"
            >
              <Checkbox className="pt-1 mt-1">Remember me</Checkbox>
            </Form.Item>

            <Form.Item style={{ margin: 0, padding: 0 }}>
              <Button
                style={{
                  borderRadius: 1,
                }}
                className="mt-5"
                type="primary"
                block
                htmlType="submit"
                loading={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
              <p className=" text-red-600 flex flex-col items-center justify-center">
                {error ? `${error}` : null}
              </p>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
