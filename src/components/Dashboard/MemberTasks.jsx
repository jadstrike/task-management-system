import { Typography, Badge } from "antd";
import { useSelector } from "react-redux";
import TaskCard from "../UI/TaskCard";
import { useDispatch } from "react-redux";
import {
  getUserDoneTasks,
  getUserFailedTasks,
  getUserInProgressTasks,
  getUserToDoTasks,
} from "../../features/member/memberActions";
const { Title } = Typography;

const MemberTasks = () => {
  const dispatch = useDispatch();
  const InProgress_Tasks = useSelector(
    (state) => state.member.User_InProgress_Tasks
  );
  const ToDo_Tasks = useSelector((state) => state.member.User_ToDo_Tasks);
  const loading = useSelector((state) => state.member.loading);
  const Completed_Tasks = useSelector((state) => state.member.User_Done_Tasks);
  const Failed_Tasks = useSelector((state) => state.member.User_Failed_Tasks);
  console.log(InProgress_Tasks.length);
  const filter = location.pathname.split("/")[3];
  console.log(filter);
  const todoColor = "gray";
  const inprogressColor = "#1890FF";
  const completedColor = "#52C41A";
  const failedColor = "red";
  const refreshTasks = () => {
    dispatch(getUserDoneTasks());
    dispatch(getUserInProgressTasks());
    dispatch(getUserToDoTasks());
    dispatch(getUserFailedTasks());
  };

  return (
    <>
      <div className=" w-1233 h-88 border-b border-gray-400 border-solid border-t-0 border-r-0 border-l-0">
        <div className="flex flex-row items-center justify-between">
          <Title className="p-4 m-4" level={4}>
            Your Total Tasks
          </Title>
        </div>
      </div>
      <div className=" flex flex-row justify-start space-x-3 h-1 ml-8 mt-2">
        <Title level={5}>
          {filter === "ToDo"
            ? "To Do Tasks"
            : filter === "InProgress"
            ? "In Progress Tasks"
            : filter === "Completed"
            ? "Completed Tasks"
            : filter === "Failed"
            ? "Failed Tasks"
            : null}
        </Title>
        <Badge
          className=" mt-0.5"
          count={
            filter === "ToDo"
              ? ToDo_Tasks.length
              : filter === "InProgress"
              ? InProgress_Tasks.length
              : filter === "Completed"
              ? Completed_Tasks.length
              : filter === "Failed"
              ? Failed_Tasks.length
              : null
          }
          showZero
          color={
            filter === "ToDo"
              ? todoColor
              : filter === "InProgress"
              ? inprogressColor
              : filter === "Completed"
              ? completedColor
              : filter === "Failed"
              ? failedColor
              : null
          }
        />
      </div>
      <div className=" grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-3 pt-3 ml-5 pl-5">
        {filter === "ToDo"
          ? ToDo_Tasks.map((item, index) => (
              <TaskCard
                counter={item.counter}
                title={item.title}
                id={item.id}
                key={item.id}
                description={item.description}
                dueDate={item.dueDate}
                username={item.username}
                priorityStatus={item.priorityStatus}
                borderColor={"#D9D9D9"}
                projectTitle={item.projectName}
              />
            ))
          : filter === "InProgress"
          ? InProgress_Tasks.map((item, index) => (
              <TaskCard
                counter={item.counter}
                title={item.title}
                id={item.id}
                key={item.id}
                description={item.description}
                dueDate={item.dueDate}
                username={item.username}
                priorityStatus={item.priorityStatus}
                borderColor={"#1890FF"}
                projectTitle={item.projectName}
              />
            ))
          : filter === "Completed"
          ? Completed_Tasks.map((item, index) => (
              <TaskCard
                counter={item.counter}
                title={item.title}
                id={item.id}
                key={item.id}
                description={item.description}
                dueDate={item.dueDate}
                username={item.username}
                priorityStatus={item.priorityStatus}
                borderColor={"#73D13D"}
                projectTitle={item.projectName}
                duration={item.duration}
                no={true}
              />
            ))
          : filter === "Failed"
          ? Failed_Tasks.map((item, index) => (
              <TaskCard
                counter={item.counter}
                title={item.title}
                id={item.id}
                key={item.id}
                description={item.description}
                dueDate={item.dueDate}
                username={item.username}
                priorityStatus={item.priorityStatus}
                borderColor={"red"}
                projectTitle={item.projectName}
                duration={item.duration}
                no={true}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default MemberTasks;
