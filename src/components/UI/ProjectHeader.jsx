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
        <img src="src/assets/logotitle.svg" alt="" />
        <div className="flex space-x-5">
          <Badge count={"1"} size="small">
            <BellFilled
              className="mt-2"
              style={{ fontSize: "20px", color: "#fff" }}
            />
          </Badge>
          <Avatar icon={<UserOutlined />} />
        </div>
      </div>
    </Header>
  );
};

export default ProjectHeader;
