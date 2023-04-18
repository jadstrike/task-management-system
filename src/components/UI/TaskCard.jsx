import { Card, Tag, Avatar } from "antd";
import { useSelector } from "react-redux";
import {
  DashOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
const TaskCard = (props) => {
  //   console.log("Props", title);
  //   console.log("Props", description);
  return (
    <Card
      style={{
        width: 231,
      }}
      headStyle={{ border: "none" }}
      className=" mb-2 mt-3"
      title={props.title !== null ? props.title : "No Title"}
      extra={<DashOutlined onClick={() => alert("You clicked three dots")} />}
      size="small"
    >
      <div className=" flex flex-row justify-between items-center">
        <div>
          <div className=" mb-2 text-[12px] w-[130px] h-[32px] text-[#00000073]">
            {props.description !== undefined
              ? props.description
              : "No Description"}
          </div>
          <div className=" space-x-1 text-[#000000D9] mt-1">
            <CalendarOutlined />
            <span>12-12-2023</span>
          </div>
          <Tag className=" mt-1" color="success">
            High
          </Tag>
        </div>
        <div>
          <div className=" flex flex-col justify-center items-center">
            <Avatar icon={<UserOutlined />} />
            <div className=" text-[12px]">Tony Stark</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
