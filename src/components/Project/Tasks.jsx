import { Card, Typography, Tag } from "antd";
const { Title } = Typography;
import TaskCard from "../UI/TaskCard";
import NoTasks from "../UI/NoTasks";
import { useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Tasks = () => {
  const ToDo = useSelector((state) => state.project.project_to_do_tasks);
  const InProgress = useSelector(
    (state) => state.project.project_in_progress_tasks
  );
  const Done = useSelector((state) => state.project.project_done_tasks);
  const Failed = useSelector((state) => state.project.project_failed_tasks);
  const handleOnDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;
    // TODO: Implement logic to update task status based on drag and drop
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="  ml-4 mt-4 flex flex-row justify-evenly items-start space-x-2 font-robo  ">
        <div className="  bg-[#F5F5F5] w-[263px]  border border-solid border-gray-300 rounded-md flex flex-col justify-center items-center">
          <div className="w-full ml-5 mt-4 text-left">
            <div className=" text-42px  ">To Do</div>
          </div>
          <Droppable droppableId="Todo">
            {(provided) => (
              <div
                className="mt-2 max-h-[500px] overflow-y-scroll"
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

        <div className="  bg-[#E6F7FF] w-[263px]  border border-solid border-blue-300 rounded-md flex flex-col justify-center items-center">
          <div className="w-full ml-5 mt-4 text-left">
            <div className=" text-42px text-[#0050B3] ">In Progress</div>
          </div>
          <Droppable droppableId="InProgress">
            {(provided) => (
              <div
                className="mt-2 max-h-[500px] overflow-y-scroll"
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
                ) : (
                  <NoTasks />
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="  bg-[#F6FFED] w-[263px] border border-solid border-green-200 rounded-md flex flex-col justify-center items-center">
          <div className="w-full ml-5 mt-4 text-left">
            <div className=" text-42px text-[#389E0D] ">Done</div>
          </div>
          <div className="mt-2 max-h-[500px] overflow-y-scroll">
            {Done !== undefined && Done.length !== 0 ? (
              Done.map((task) => {
                return (
                  <TaskCard
                    title={task.title}
                    key={task.id}
                    description={task.description}
                    dueDate={task.dueDate}
                    username={task.username}
                    priorityStatus={task.priorityStatus}
                    borderColor={"#73D13D"}
                  />
                );
              })
            ) : (
              <NoTasks />
            )}
          </div>
        </div>

        <div className="  bg-[#FCF0F0] w-[263px] border border-solid border-red-200 rounded-md flex flex-col justify-center items-center">
          <div className="w-full ml-5 mt-4 text-left">
            <div className=" text-42px text-[#CF1322] ">Failed</div>
          </div>
          <div className="mt-2 max-h-[500px] overflow-y-scroll">
            {Failed !== undefined && Failed.length !== 0 ? (
              Failed.map((task) => {
                return (
                  <TaskCard
                    title={task.title}
                    key={task.id}
                    description={task.description}
                    dueDate={task.dueDate}
                    username={task.username}
                    priorityStatus={task.priorityStatus}
                    borderColor={"#F5222D"}
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
