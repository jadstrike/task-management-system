import {
  Breadcrumb,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Dropdown,
  Tag,
  Drawer,
  Empty,
} from "antd";
import { DownOutlined, InboxOutlined } from "@ant-design/icons";
const { Title } = Typography;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Tasks from "./Tasks";
import { DragDropContext } from "react-beautiful-dnd";
import {
  createTask,
  getToDoTasks,
} from "../../features/projects/projectActions";
import { setTaskEdit } from "../../features/projects/projectSlice";

const ProjectTasks = () => {
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project_detail = useSelector((state) => state.project.detail_project);
  const isTaskEdit = useSelector((state) => state.project.taskEdit);
  const taskEditInfo = useSelector((state) => state.project.taskEditInfo);
  console.log(taskEditInfo);
  useEffect(() => {
    if (isTaskEdit) {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
    }
  }, [isTaskEdit]);

  console.log(project_detail.users);
  let options = null;

  if (project_detail.users !== null) {
    options = project_detail.users.map((member) => ({
      label: member.username,
      value: member.id,
    }));
  }
  //Filter Items
  const items = [
    {
      label: <Tag color={"error"}>HIGH</Tag>,
      key: "0",
    },
    {
      label: <Tag color={"warning"}>MEDIUM</Tag>,
      key: "1",
    },
    {
      label: <Tag color={"success"}>LOW</Tag>,
      key: "3",
    },
  ];
  //Filter Items
  // isTaskEdit ? setIsDrawerOpen(true) : setIsDrawerOpen(false);

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleTaskEdit = () => {
    // setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      // your code here
      dispatch(setTaskEdit(false));
    }, 500);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleTaskCreate = (values) => {
    const dueDate = values.dueDate.toDate();
    const fomattedDate = moment(dueDate).toISOString();
    const task = {
      title: values.title,
      description: values.description,
      dueDate: fomattedDate,
      userId: values.userId,
      priorityStatus: values.priorityStatus,
      id: project_detail.id,
    };
    dispatch(createTask(task));
    setTimeout(() => {
      // your code here
      setRefresh(!refresh);
      form.resetFields();
    }, 500);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getToDoTasks(project_detail.id));

    // dispatch(getToDoTasks(projectId));
    // dispatch(getDoneTasks(projectId));
    // dispatch(getFailedTasks(projectId));
    // dispatch(getUnassignedtasks(projectId));
  }, [refresh]);

  const disableDate = (current) => {
    return current && current < moment().startOf("day");
  };
  return (
    <div className="w-screen  bg-[#FFFF] ">
      <Breadcrumb
        className="pt-3 pl3 mt-3 ml-10 "
        items={[
          {
            title: (
              <a
                onClick={() => {
                  navigate(`/dashboard/ProjectsLists`);
                }}
              >
                Projects List
              </a>
            ),
          },

          {
            title: project_detail.title,
          },
        ]}
      />

      <div
        // style={{ width: "calc(100% - 200px)" }}
        className=" h-88   border-b border-gray-400 border-solid border-t-0 border-r-0 border-l-0"
      >
        <div className="flex flex-row items-center justify-between">
          <Title className="p-2 m-2 ml-5 pb-0 mb-0 pl-5" level={4}>
            Tasks
          </Title>
          <Button
            onClick={showDrawer}
            style={{
              width: 139,
              height: 40,
              borderRadius: 8,
              background: "#2F54EB",
            }}
            className=" mr-52 flex items-center justify-center"
          >
            <div className=" text-white">Create Tasks</div>
          </Button>
        </div>
      </div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className=" cursor-pointer hover:bg-slate-200 ml-10 mt-5  flex flex-row justify-center items-center border border-solid border-gray-300  w-[90px] h-[32px]">
          <span className=" p-0 m-0 ">Filter By</span>
          <DownOutlined size="small" className=" mt-1 pl-1" />
        </div>
      </Dropdown>
      <Tasks />

      <Drawer
        title={isTaskEdit ? "Edit Tasks" : "Create Tasks"}
        forceRender={true}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
      >
        <Title className="flex justify-center" level={5}>
          {isTaskEdit ? "Edit a task" : "Create a new task"}
        </Title>
        <div className=" flex flex-col justify-center items-center ">
          <Form
            form={form}
            onFinish={isTaskEdit ? handleTaskEdit : handleTaskCreate}
            className=" pt-4 mt-4"
            initialValues={
              isTaskEdit
                ? {
                    title: taskEditInfo.title,
                    description: taskEditInfo.description,
                    dueDate: moment(taskEditInfo.dueDate),
                    userId: taskEditInfo.userId,
                    priorityStatus: taskEditInfo.priorityStatus,
                  }
                : null
            }
          >
            <Form.Item name="title">
              <Input
                style={{ width: "280px", borderRadius: "1px" }}
                placeholder="Task title"
              ></Input>
            </Form.Item>
            <Form.Item name="description">
              <Input
                style={{ width: "280px", borderRadius: "1px" }}
                placeholder="Task Description"
              ></Input>
            </Form.Item>
            <Form.Item name="dueDate">
              <DatePicker
                style={{ width: "280px", borderRadius: "1px" }}
                disabledDate={disableDate}
                showToday={false}
                showTime={false}
                placeholder="Due Date: DD/MM/YY"
              />
            </Form.Item>
            <Form.Item name="userId">
              <Select
                // showSearch
                options={options}
                placeholder="Assign Members :"
                notFoundContent={
                  options ? null : (
                    <Empty description="No Members Yet. You need to add members first ✨" />
                  )
                }
              ></Select>
            </Form.Item>
            <Form.Item name="priorityStatus">
              <Select placeholder="Priority :">
                <Select.Option value="HIGH">High</Select.Option>
                <Select.Option value="MEDIUM">Medium</Select.Option>
                <Select.Option value="LOW">Low</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                // loading={isLoading}
                style={{
                  backgroundColor: "#597EF7",
                  width: "280px",

                  border: "1px solid",

                  borderRadius: "1px",
                }}
                type="primary"
                htmlType="submit"
              >
                {/* {isLoading ? "Creating member account.." : "Create"} */}
                {isTaskEdit ? "Edit Task" : "Create Task"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </div>
  );
};

export default ProjectTasks;
