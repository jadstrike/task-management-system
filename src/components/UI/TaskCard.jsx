import { Card, Tag, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  DashOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import { setTaskEdit } from "../../features/projects/projectSlice";
const TaskCard = (props) => {
  const dispatch = useDispatch();
  //   console.log("Props", title);
  //   console.log("Props", description);
  const formattedDate = moment.utc(props.dueDate).format("DD/MM/YYYY");
  return (
    <Card
      style={{
        width: 231,
        borderColor: `${props.borderColor}`,
      }}
      headStyle={{ border: "none" }}
      className=" mb-2 mt-3"
      title={props.title !== undefined ? props.title : "No Title"}
      extra={<DashOutlined onClick={() => dispatch(setTaskEdit)} />}
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
            <span>{formattedDate}</span>
          </div>
          <Tag
            className=" mt-1"
            color={
              props.priorityStatus === "HIGH"
                ? "error"
                : props.priorityStatus === "LOW"
                ? "success"
                : props.priorityStatus === "MEDIUM"
                ? "warning"
                : "default"
            }
          >
            {props.priorityStatus}
          </Tag>
        </div>
        <div>
          <div className=" flex flex-col justify-center items-center">
            <Avatar className=" mb-1" icon={<UserOutlined />} />
            <div className=" text-[12px]">
              {props.username === null
                ? "Unassigned"
                : props.username !== undefined && props.username}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
