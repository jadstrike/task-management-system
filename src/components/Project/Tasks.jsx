import { Card, Typography } from "antd";
const { Title } = Typography;
import TaskCard from "../UI/TaskCard";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

const Tasks = () => {
  const ToDo = useSelector((state) => state.project.project_to_do_tasks);
  const InProgress = useSelector(
    (state) => state.project.project_in_progress_tasks
  );
  console.log(InProgress);
  return (
    <div className=" ml-4 mt-4 flex flex-row justify-evenly items-start space-x-2 font-robo  ">
      <div className="  bg-[#F5F5F5] w-[263px] border border-solid border-[#F5F5F5] rounded-md flex flex-col justify-center items-center">
        <div className="w-full ml-5 mt-4 text-left">
          <div className=" text-42px ">To Do</div>
        </div>
        {ToDo.map((task) => {
          console.log("Looping", task);
          console.log("Looping", task.description);

          return (
            <TaskCard
              title={task.title}
              key={task.id}
              description={task.description}
            />
          );
        })}
      </div>

      <div className="  bg-[#E6F7FF] w-[263px] border border-solid border-[#E6F7FF] rounded-md flex flex-col justify-center items-center">
        <div className="w-full ml-5 mt-4 text-left">
          <div className=" text-42px text-[#0050B3] ">In Progress</div>
        </div>
        {InProgress !== "No message available" ? (
          InProgress.map((task) => {
            console.log("Looping_In_Progress", task);
            return <TaskCard title={task.title} key={task.id} />;
          })
        ) : (
          <TaskCard />
        )}
      </div>

      <div className="  bg-[#F6FFED] w-[263px] border border-solid border-[#F6FFED] rounded-md flex flex-col justify-center items-center">
        <div className="w-full ml-5 mt-4 text-left">
          <div className=" text-42px text-[#389E0D] ">Done</div>
        </div>
        <TaskCard />
      </div>

      <div className="  bg-[#FCF0F0] w-[263px] border border-solid border-[#FCF0F0] rounded-md flex flex-col justify-center items-center">
        <div className="w-full ml-5 mt-4 text-left">
          <div className=" text-42px text-[#CF1322] ">Failed</div>
        </div>
        <TaskCard />
      </div>
    </div>
  );
};

export default Tasks;