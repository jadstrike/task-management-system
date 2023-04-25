import { Card, Tag, Avatar, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  DashOutlined,
  CalendarOutlined,
  UserOutlined,
  PlayCircleFilled,
  ProjectOutlined,
} from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import { setTaskEdit } from "../../features/projects/projectSlice";
const TaskCard = (props) => {
  console.log(props.no);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const taskedit = () => {
    console.log("Task Edit");
    dispatch(setTaskEdit(true));
  };
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
      className=" mb-3 mt-3"
      title={props.title !== undefined ? props.title : "No Title"}
      extra={
        role === "ROLE_ADMIN" ? (
          <DashOutlined onClick={() => taskedit()} />
        ) : null
      }
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
          {props.projectTitle ? (
            <div className=" space-x-1">
              <ProjectOutlined />
              <span>{props.projectTitle}</span>
            </div>
          ) : null}
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
            <Avatar className=" mb-2" icon={<UserOutlined />} />
            <div className=" text-[12px] text-center">
              {props.username === null
                ? "Unassigned"
                : props.username !== undefined && props.username}
              {role === "ROLE_USER" && props.no !== true && (
                <div className=" mt-1 mb-2 ">
                  <PlayCircleFilled
                    className=" w-ful hover:backdrop-blur-sm"
                    onClick={() => alert("You clicked play button")}
                    style={{
                      fontSize: "25px",
                      color: "#52C41A",
                    }}
                  />
                </div>
              )}
              {role === "ROLE_USER" && props.no !== true && (
                <Button type="primary">Done</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
