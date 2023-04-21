import { Badge, Layout, Avatar, Drawer, Form, message } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BellFilled, UserOutlined } from "@ant-design/icons";
const { Header } = Layout;

const ProjectHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memberCount = useSelector((state) => state.content.memberCount);
  const projectsCount = useSelector((state) => state.content.projectsCount);
  const role = useSelector((state) => state.auth.role);
  const [ProfileData, setProfileData] = useState(null);
  const [isDisabled, setDisabled] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  console.log("IsDiabled: ", isDisabled);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDisabled(true);
  };

  const backendURL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const Authorization = `Bearer ${token}`;

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
          .get(`${backendURL}/api/member/2`, {
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
          });
  }, [role]);
  return (
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
          <Badge style={{ padding: 0, margin: 0 }} count={"1"} size={"small"}>
            <BellFilled
              className="mt-2"
              style={{ fontSize: "25px", color: "#fff" }}
            />
          </Badge>
          <Avatar
            size={40}
            src="https://thumbs.dreamstime.com/b/iron-man-17900674.jpg"
            onClick={() => navigate("/dashboard/profile")}
            className=" cursor-pointer"
            icon={<UserOutlined />}
          />
        </div>
      </div>
    </Header>
  );
};

export default ProjectHeader;
