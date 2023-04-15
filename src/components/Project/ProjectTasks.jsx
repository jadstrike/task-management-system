import {
  Breadcrumb,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
const { Title } = Typography;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { createTask } from "../../features/projects/projectActions";

const ProjectTasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project_detail = useSelector((state) => state.project.detail_project);
  console.log(project_detail.users);
  const options = project_detail.users.map((member) => ({
    label: member.username,
    value: member.id,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="w-screen">
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
          <Title className="p-2 m-2" level={4}>
            Tasks
          </Title>
          <Button
            onClick={showModal}
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
      <Modal
        centered={true}
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
        width={331}
      >
        <Title className="flex justify-center" level={5}>
          Add a new task
        </Title>
        <Form onFinish={handleTaskCreate} className="pt-4 mt-4">
          <Form.Item name="title" label="Title">
            <Input placeholder="Task title"></Input>
          </Form.Item>
          <Form.Item label="Desc" name="description">
            <Input placeholder="Task Description"></Input>
          </Form.Item>
          <Form.Item label="Due" name="dueDate">
            <DatePicker
              disabledDate={disableDate}
              style={{ width: "100%" }}
              showToday={false}
              showTime={false}
              placeholder="Due Date: DD/MM/YY"
            />
          </Form.Item>
          <Form.Item name="userId" label="Assign">
            <Select
              // showSearch
              options={options}
              placeholder="Assign Members :"
            ></Select>
          </Form.Item>
          <Form.Item name="priorityStatus" label="Priority">
            <Select placeholder="Priority">
              <Option value="HIGH">High</Option>
              <Option value="MEDIUM">Medium</Option>
              <Option value="LOW">Low</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              // loading={isLoading}
              style={{
                width: "277px",
                backgroundColor: "#597EF7",
                border: "1px solid #1890FF",
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
      </Modal>
    </div>
  );
};

export default ProjectTasks;
