import {
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  message,
} from "antd";
import ProjectCard from "../UI/ProjectCard";
const { Title } = Typography;
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentUserProjects,
  getMemberList,
} from "../../features/member/memberActions";
import {
  createProject,
  getProjectList,
} from "../../features/projects/projectActions";
import MySpin from "./MySpin";

const ProjectsLists = () => {
  const success = useSelector((state) => state.project.success);
  const refresh = useSelector((state) => state.project.refresh);
  const member_projects = useSelector((state) => state.member.member_projects);
  const member_list = useSelector((state) => state.member.members);
  const project_loading = useSelector((state) => state.project.loading);
  const member_loading = useSelector((state) => state.member.loading);
  const deleteMessage = useSelector((state) => state.project.deleteMessage);
  const error = useSelector((state) => state.project.error);
  const [messageApi, contextHolder] = message.useMessage();
  const project_delete_message = () => {
    messageApi.open({
      type: "success",
      content: deleteMessage,
    });
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Creating_project = useSelector(
    (state) => state.project.project_creating
  );
  const role = useSelector((state) => state.auth.role);

  // console.log(project_list);
  const project_list = useSelector((state) => state.project.projects_list);
  console.log(project_list);

  // const options = member_list.map((member) => ({
  //   label: member.username,
  //   value: member.id,
  // }));

  const options =
    role === "ROLE_ADMIN"
      ? member_list.map((member) => ({
          label: member.username,
          value: member.id,
        }))
      : null;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const CreateProject = (values) => {
    // console.log("Form values:", values);

    dispatch(createProject(values));
    success && form.resetFields();
  };
  useEffect(() => {
    role === "ROLE_ADMIN" && dispatch(getProjectList());
    role === "ROLE_USER" && dispatch(getCurrentUserProjects());
  }, [refresh, deleteMessage]);

  const doneF = "#03C988";
  const doneS = "#DFFFD8";

  const toDoF = "#EEEEEE";
  const toDoS = "grey ";

  const inprogressF = "#40A9FF";
  const inprogressS = "#C9EEFF";

  const incompleteF = "#F5222D";
  const incompleteS = "#FCF0F0";
  return (
    <>
      {project_loading ? (
        <MySpin />
      ) : member_loading ? (
        <MySpin />
      ) : (
        <>
          <div className=" w-1233 h-88 border-b border-gray-400 border-solid border-t-0 border-r-0 border-l-0">
            <div className="flex flex-row items-center justify-between">
              <Title className="p-4 m-4" level={4}>
                {role === "ROLE_ADMIN"
                  ? "Project Lists"
                  : "Projects You Have Included"}
              </Title>
              {role === "ROLE_ADMIN" && (
                <Button
                  style={{
                    width: 139,
                    height: 40,
                    borderRadius: 8,
                    background: "#2F54EB",
                  }}
                  onClick={showModal}
                  className="p-4  m-4 flex items-center justify-center"
                >
                  <div className=" text-white">Create Projects</div>
                </Button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-3 pt-3 ml-5 pl-5">
            {role === "ROLE_ADMIN"
              ? project_list.map((item, index) => (
                  <ProjectCard
                    projectStatus={
                      item.projectStatus === "TODO"
                        ? "todo"
                        : item.projectStatus === "COMPLETE"
                        ? "done"
                        : item.projectStatus === "IN_PROGRESS"
                        ? "inprogress"
                        : "incomplete"
                    }
                    id={item.id}
                    key={index}
                    item={item}
                    index={index}
                    fcolor={
                      item.projectStatus === "TODO"
                        ? toDoS
                        : item.projectStatus === "COMPLETE"
                        ? doneF
                        : item.projectStatus === "IN_PROGRESS"
                        ? inprogressF
                        : item.projectStatus === "INCOMPLETE"
                        ? incompleteF
                        : null
                    }
                    scolor={
                      item.projectStatus === "TODO"
                        ? toDoF
                        : item.projectStatus === "COMPLETE"
                        ? doneS
                        : item.projectStatus === "IN_PROGRESS"
                        ? inprogressS
                        : item.projectStatus === "INCOMPLETE"
                        ? incompleteS
                        : null
                    }
                  />
                ))
              : member_projects.map((item, index) => (
                  <ProjectCard
                    projectStatus={
                      item.projectStatus === "TODO"
                        ? "todo"
                        : item.projectStatus === "COMPLETE"
                        ? "done"
                        : item.projectStatus === "IN_PROGRESS"
                        ? "inprogress"
                        : "incomplete"
                    }
                    id={item.id}
                    key={index}
                    item={item}
                    index={index}
                    fcolor={
                      item.projectStatus === "TODO"
                        ? toDoS
                        : item.projectStatus === "COMPLETE"
                        ? doneF
                        : item.projectStatus === "IN_PROGRESS"
                        ? inprogressF
                        : item.projectStatus === "INCOMPLETE"
                        ? incompleteF
                        : null
                    }
                    scolor={
                      item.projectStatus === "TODO"
                        ? toDoF
                        : item.projectStatus === "COMPLETE"
                        ? doneS
                        : item.projectStatus === "IN_PROGRESS"
                        ? inprogressS
                        : item.projectStatus === "INCOMPLETE"
                        ? incompleteS
                        : null
                    }
                  />
                ))}
          </div>
        </>
      )}

      {member_list && (
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered={true}
          width={331}
          style={{ borderRadius: "1px" }}
        >
          <div className=" flex flex-col  justify-center items-center">
            <Title level={4}>Create a new Project</Title>
            <Form
              form={form}
              onFinish={CreateProject}
              layout="vertical"
              name="create_form"
            >
              <Form.Item
                className="pb-2 m-0"
                label="Title"
                required={false}
                name="title"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Please input Project title",
                  },
                ]}
              >
                <Input style={{ borderRadius: "1px" }} />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                required={false}
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Please input Project's description",
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input style={{ borderRadius: "1px" }} />
              </Form.Item>
              <Form.Item
                label="Project's members"
                required={false}
                name="userId"
                // placeholder="password"
                // label="Phone"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  showSearch
                  options={options}
                  placeholder="+ Add members"
                ></Select>
              </Form.Item>
              <Form.Item>
                <Button
                  loading={Creating_project}
                  style={{
                    width: "277px",
                    backgroundColor: "#597EF7",
                    border: "1px solid #1890FF",
                    borderRadius: "1px",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  {project_loading
                    ? "Creating new Project..."
                    : project_loading && refresh === "Successfully Created"
                    ? setIsModalOpen(false)
                    : "Create"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProjectsLists;
