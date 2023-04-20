import { Spin } from "antd";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import { SettingOutlined } from "@ant-design/icons";

const MySpin = ({ color }) => (
  <Spin
    indicator={<LoadingOutlined style={{ fontSize: 30, color }} spin />}
    style={{
      display: "flex",
      height: "60vh",
      justifyContent: "center",
      alignItems: "center",
      color: "#2D2727",
    }}
  />
);
export default MySpin;
