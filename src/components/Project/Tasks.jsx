import { Card, Typography, Tag } from "antd";
import { message } from "antd";

const { Title } = Typography;
import TaskCard from "../UI/TaskCard";
import NoTasks from "../UI/NoTasks";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import MySpin from "../Dashboard/MySpin";
import { startTask } from "../../features/member/memberActions";
import {
  getDoneTasks,
  getFailedTasks,
  getInProgressTasks,
  getProjectDetail,
  getToDoTasks,
  getUnassignedtasks,
} from "../../features/projects/projectActions";

const Tasks = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const Loading = useSelector((state) => state.project.loading);
  const projectId = useSelector((state) => state.project.detail_project.id);

  const ToDo = useSelector((state) => state.project.project_to_do_tasks);
  const InProgress = useSelector(
    (state) => state.project.project_in_progress_tasks
  );
  const Done = useSelector((state) => state.project.project_done_tasks);
  const Failed = useSelector((state) => state.project.project_failed_tasks);
  const Unassigned = useSelector(
    (state) => state.project.project_unassigned_tasks
  );
  const handleOnDragEnd = (result) => {
    if (role === "ROLE_USER") {
      console.log(result);
      const { destination, source } = result;
      console.log(source);
      console.log(destination);

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (destination.droppableId === "InProgess") {
        // console.log("In Progress");
        // dispatch(startTask(result.draggableId));
      } else {
        console.log("Not In Progress");
        dispatch(startTask(result.draggableId));
        // complete.splice(destination.index, 0, add);
        setTimeout(() => {
          setRefresh(!refresh);
        }, 1000);
        message.loading("Changing Task Status", 1.5);
      }
    }
  };
  //   console.log(result);
  //   const { destination, source } = result;
  //   console.log(source);
  //   console.log(destination);
  //   // console.log(result);

  //   if (!destination) {
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   if (destination.droppableId === "InProgess") {
  //     // console.log("In Progress");
  //     // dispatch(startTask(result.draggableId));
  //   } else {
  //     console.log("Not In Progress");
  //     dispatch(startTask(result.draggableId));
  //     // complete.splice(destination.index, 0, add);
  //     setTimeout(() => {
  //       setRefresh(!refresh);
  //     }, 1000);
  //     message.loading("Changing Task Status", 1.5);
  //   }
  // };

  useEffect(() => {
    // dispatch(getProjectDetail(projectId));
    dispatch(getInProgressTasks(projectId));
    dispatch(getToDoTasks(projectId));
    dispatch(getDoneTasks(projectId));
    dispatch(getFailedTasks(projectId));
    dispatch(getUnassignedtasks(projectId));
  }, [refresh]);

  return Loading ? (
    <MySpin />
  ) : (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className=" ml-9 mt-4  flex flex-row justify-evenly items-start space-x-5 font-robo  ">
        <div className="  bg-[#F5F5F5] w-[263px]    border border-solid border-gray-300 rounded-md flex flex-col justify-center items-center">
          <div className="w-full ml-5 mt-4 text-left">
            <div className=" text-42px  ">To Do</div>
          </div>
          <Droppable droppableId="Todo">
            {(provided, snapshot) => (
              <div
                className={`mt-2 max-h-[500px] overflow-y-scroll ${
                  snapshot.isDraggingOver &&
                  `border-3 border-dotted border-black-300`
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {ToDo !== undefined && ToDo.length !== 0 ? (
                  ToDo.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={`${task.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            id={task.id}
                            userId={task.userId}
                            title={task.title}
                            key={task.id}
                            description={task.description}
                            dueDate={task.dueDate}
                            username={task.username}
                            priorityStatus={task.priorityStatus}
                            borderColor={"#D9D9D9"}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <NoTasks />
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="  bg-[#E6F7FF] w-[263px]   border border-solid border-blue-300 rounded-md flex flex-col justify-center items-center">
          <div className="w-full ml-5 mt-4 text-left">
            <div className=" text-42px text-[#0050B3] ">In Progress</div>
          </div>
          <Droppable droppableId="InProgress">
            {(provided, snapshot) => (
              <div
                className={`mt-2 max-h-[500px] overflow-y-scroll ${
                  snapshot.isDraggingOver &&
                  `border-3 border-dotted border-blue-300`
                } `}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {InProgress !== undefined && InProgress.length !== 0 ? (
                  InProgress.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={`${task.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            id={task.id}
                            userId={task.userId}
                            title={task.title}
                            key={task.id}
                            description={task.description}
                            dueDate={task.dueDate}
                            username={task.username}
                            priorityStatus={task.priorityStatus}
                            borderColor={"#40A9FF"}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : snapshot.isDraggingOver ? null : (
                  <NoTasks />
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="  bg-[#F6FFED] w-[263px]  border border-solid border-green-200 rounded-md flex flex-col justify-center items-center">
          <div className="w-full ml-5 mt-4 text-left">
            <div className=" text-42px text-[#389E0D] ">Done</div>
          </div>
          <div className="mt-2 max-h-[500px] overflow-y-scroll">
            {Done !== undefined && Done.length !== 0 && Done !== null ? (
              Done.map((task) => {
                return (
                  <TaskCard
                    id={task.id}
                    userId={task.userId}
                    title={task.title}
                    key={task.id}
                    description={task.description}
                    dueDate={task.dueDate}
                    username={task.username}
                    priorityStatus={task.priorityStatus}
                    borderColor={"#73D13D"}
                    no={true}
                    duration={task.duration}
                  />
                );
              })
            ) : (
              <NoTasks />
            )}
          </div>
        </div>

        <div className="  bg-[#FCF0F0] w-[263px]  border border-solid border-red-200 rounded-md flex flex-col justify-center items-center">
          <div className="w-full ml-5 mt-4 text-left">
            <div className=" text-42px text-[#CF1322] ">Failed</div>
          </div>
          <div className="mt-2 max-h-[500px] overflow-y-scroll">
            {Failed !== undefined && Failed.length !== 0 ? (
              Failed.map((task) => {
                return (
                  <TaskCard
                    userId={task.userId}
                    title={task.title}
                    key={task.id}
                    description={task.description}
                    dueDate={task.dueDate}
                    username={task.username}
                    priorityStatus={task.priorityStatus}
                    borderColor={"#F5222D"}
                    no={true}
                    duration={task.duration}
                  />
                );
              })
            ) : (
              <NoTasks />
            )}
          </div>
        </div>

        <div className="  bg-[#BFBFBF] w-[263px]   border border-solid border-gray-400 rounded-md flex flex-col justify-center items-center">
          <div className="w-full ml-5 mt-4 text-left">
            <div className=" text-42px text-white ">Unassigned</div>
          </div>
          <div className="mt-2 max-h-[500px] overflow-y-scroll">
            {Unassigned !== undefined &&
            Unassigned.length !== 0 &&
            Unassigned !== null ? (
              Failed.map((task) => {
                return (
                  <TaskCard
                    userId={task.userId}
                    title={task.title}
                    key={task.id}
                    description={task.description}
                    dueDate={task.dueDate}
                    username={task.username}
                    priorityStatus={task.priorityStatus}
                    borderColor={"#BFBFBF"}
                  />
                );
              })
            ) : (
              <NoTasks />
            )}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Tasks;
