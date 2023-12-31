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
import {
  DownOutlined,
  InboxOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Tasks from "./Tasks";
import { DragDropContext } from "react-beautiful-dnd";
import { createTask } from "../../features/projects/projectActions";
import {
  resetProjectTasks,
  setTaskEdit,
} from "../../features/projects/projectSlice";

const MemberProjectTasks = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project_detail = useSelector((state) => state.project.detail_project);
  const isTaskEdit = useSelector((state) => state.project.taskEdit);
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
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const disableDate = (current) => {
    return current && current < moment().startOf("day");
  };
  return (
    <div className="w-screen  bg-[#FFFF] ">
      <Breadcrumb
        className="pt-3  mt-3 ml-4 "
        items={[
          {
            title: <ArrowLeftOutlined />,
          },
          {
            title: (
              <a
                onClick={() => {
                  {
                    dispatch(resetProjectTasks());
                    navigate(`/dashboard/myprojects`);
                  }
                }}
              >
                Projects List
              </a>
            ),
          },

          {
            title: "All tasks",
          },
        ]}
      />

      <div
        // style={{ width: "calc(100% - 200px)" }}
        className=" h-88   border-b border-gray-400 border-solid border-t-0 border-r-0 border-l-0"
      >
        <div className="flex flex-row items-center justify-between">
          <Title className="p-2 m-2 ml-5 pb-0 mb-0 pl-5" level={4}>
            {project_detail.title}
          </Title>
        </div>
      </div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className=" cursor-pointer hover:bg-slate-200 ml-10 mt-5  flex flex-row justify-center items-center border border-solid border-gray-300  w-[90px] h-[32px]">
          <span className=" p-0 m-0 ">Filter By</span>
          <DownOutlined size="small" className=" mt-1 pl-1" />
        </div>
      </Dropdown>
      <div className=" h-screen">
        <Tasks />
      </div>
    </div>
  );
};

export default MemberProjectTasks;
