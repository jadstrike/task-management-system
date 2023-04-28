import { Card, Tag, Avatar, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  DashOutlined,
  CalendarOutlined,
  UserOutlined,
  PlayCircleFilled,
  ProjectOutlined,
  PauseCircleFilled,
} from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import {
  setTaskEdit,
  setTaskEditInfo,
} from "../../features/projects/projectSlice";
import {
  endTask,
  startTask,
  stopTask,
} from "../../features/member/memberActions";
import {
  getUserDoneTasks,
  getUserFailedTasks,
  getUserInProgressTasks,
  getUserToDoTasks,
} from "../../features/member/memberActions";
const TaskCard = (props) => {
  const taskEditInfo = {
    id: props.id,
    title: props.title,
    description: props.description,
    dueDate: props.dueDate,
    userId: props.userId,
    priorityStatus: props.priorityStatus,
  };
  const [isStart, setIsStart] = useState(false);
  const [timesheetId, setTimesheetId] = useState(null);
  const refreshTasks = () => {
    dispatch(getUserDoneTasks());
    dispatch(getUserInProgressTasks());
    dispatch(getUserToDoTasks());
    dispatch(getUserFailedTasks());
  };
  // const handleStartTask = async (taskId) => {
  //   const response = await dispatch(startTask(taskId));
  //   console.log("This is from task card", response);
  //   setTimesheetId(response.timesheetId);
  // };

  // console.log(props.no);
  const role = useSelector((state) => state.auth.role);
  const role_id = useSelector((state) => state.auth.role_id);
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
      className=" mb-3 mt-3"
      title={props.title !== undefined ? props.title : "No Title"}
      extra={
        role === "ROLE_ADMIN" ? (
          <DashOutlined
            onClick={() => {
              dispatch(setTaskEditInfo(taskEditInfo));
              dispatch(setTaskEdit(true));
            }}
          />
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
              <span className=" text-ellipsis">{props.projectTitle}</span>
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
            <Avatar className=" mb-2" icon={<UserOutlined />} src="" />
            <div className=" text-[12px] text-center">
              {props.username === null
                ? "Unassigned"
                : props.username !== undefined && props.username}
              {role === "ROLE_USER" && props.no !== true && (
                <div className=" mt-1 mb-2 ">
                  {props.counter === 2 ? (
                    <PlayCircleFilled
                      className=" w-ful hover:backdrop-blur-sm"
                      onClick={() => {
                        dispatch(startTask(props.id));
                        setIsStart(true);
                        // refreshTasks();
                      }}
                      style={{
                        fontSize: "25px",
                        color: "#52C41A",
                      }}
                    />
                  ) : props.counter === 1 ? (
                    <PlayCircleFilled
                      className=" w-ful hover:backdrop-blur-sm"
                      onClick={() => {
                        // dispatch(timesheetId(props.id));
                        dispatch(startTask(props.id));

                        // setIsStart(true);
                        // refreshTasks();
                      }}
                      style={{
                        fontSize: "25px",
                        color: "#52C41A",
                      }}
                    />
                  ) : props.counter === 0 ? (
                    <PauseCircleFilled
                      onClick={() => {
                        dispatch(stopTask(props.id));
                        // setIsStart(false);
                        // refreshTasks();
                      }}
                      style={{ fontSize: "25px", color: "red" }}
                    />
                  ) : null}
                </div>
              )}
              {role === "ROLE_USER" &&
                props.no !== true &&
                (props.userId ? (
                  props.userId === role_id ? (
                    <Button
                      onClick={() => dispatch(endTask(props.id))}
                      type="primary"
                    >
                      Done
                    </Button>
                  ) : null
                ) : (
                  <Button
                    onClick={() => dispatch(endTask(props.id))}
                    type="primary"
                  >
                    Done
                  </Button>
                ))}
              {/* {role === "ROLE_USER" && props.no !== true && (
                // <Button
                //   onClick={() => dispatch(endTask(props.id))}
                //   type="primary"
                // >
                  {props.userId
                    ? props.userId === role_id
                      ?  <Button
                      onClick={() => dispatch(endTask(props.id))}
                      type="primary"
                    ></Button>
                      : null
                    : "Done"}
               
              )} */}
              {props.no === true && (
                <span className="flex text-center flex-row  text-green-700">
                  Spent Time : {props.duration} hours
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
