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
} from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Title } = Typography;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Tasks from "./Tasks";
import { DragDropContext } from "react-beautiful-dnd";
import { createTask } from "../../features/projects/projectActions";

const ProjectTasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project_detail = useSelector((state) => state.project.detail_project);
  // console.log(project_detail.users);
  const options = project_detail.users.map((member) => ({
    label: member.username,
    value: member.id,
  }));
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
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
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const disableDate = (current) => {
    return current && current < moment().startOf("day");
  };
  return (
    <div className="w-screen bg-[#FFFF]">
      <Breadcrumb
        className="pt-3 pl3 mt-3 ml-3 "
        items={[
          {
            title: (
              <a onClick={() => navigate(`/dashboard/ProjectsLists`)}>
                Projects List
              </a>
            ),
          },

          {
            title: project_detail.title,
          },
        ]}
      />
      <div className=" h-88 border-b border-gray-400 border-solid border-t-0 border-r-0 border-l-0">
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
            className="p-4  m-4 flex items-center justify-center"
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
        title="Create Tasks"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
      >
        <Title className="flex justify-center" level={5}>
          Add a new task
        </Title>
        <div className=" flex flex-col justify-center items-center ">
          <Form onFinish={handleTaskCreate} className=" pt-4 mt-4">
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
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </div>
  );
};

export default ProjectTasks;
