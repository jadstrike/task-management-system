import { Badge, Layout, Avatar } from "antd";
import { BellFilled, UserOutlined } from "@ant-design/icons";
const { Header } = Layout;

const ProjectHeader = () => {
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
