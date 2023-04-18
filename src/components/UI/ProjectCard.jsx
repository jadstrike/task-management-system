import {
  Typography,
  Card,
  Button,
  Avatar,
  Tooltip,
  Modal,
  Form,
  Input,
  Select,
  Dropdown,
} from "antd";
import {
  SettingOutlined,
  DashOutlined,
  AntDesignOutlined,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteProject,
  getDoneTasks,
  getInProgressTasks,
  getProjectDetail,
  getProjectTasks,
  getToDoTasks,
  updateProject,
} from "../../features/projects/projectActions";

const ProjectCard = ({ item, index, id, fcolor, scolor }) => {
  // console.log(item);
  const projectId = id;
  const defaultMember =
    item.users !== null &&
    item.users.map((project) => ({
      label: project.username,
      value: project.id,
    }));
  const items = [
    {
      label: <a onClick={() => buttonClick()}>Edit</a>,

      key: "0",
    },
    {
      label: <a onClick={() => dispatch(DeleteProject(projectId))}>Delete</a>,
      key: "1",
    },
  ];
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardOpen, setCardOpen] = useState(true);

  const dispatch = useDispatch();
  const member_list = useSelector((state) => state.member.members);
  const options = member_list.map((member) => ({
    label: member.username,
    value: member.id,
  }));
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    // console.log("Form values:", values);
    if (typeof values.userId[0] !== "object") {
      console.log("Form values:", values);
      const updateValues = {
        title: values.title,
        description: values.description,
        userId: values.userId,
        id: projectId,
      };
      dispatch(updateProject(updateValues));
    } else {
      const userIds = values.userId.map((id) => id.value);
      const updateValues = {
        title: values.title,
        description: values.description,
        userId: userIds,
        id: projectId,
      };
      // console.log("Update values:", updateValues);
      dispatch(updateProject(updateValues));
    }

    // const formMembers = values.userId;
    // const selectedMembers = [];
    // formMembers.map((member) => {
    // selectedMembers.push(member.value);
    // });
    // console.log("Selected Members:", values.userId);

    // const formData = {
    //   title: values.title,
    //   description: values.description,
    //   userId: selectedMembers,
    // };
    // console.log("Form data", formData);
    // console.log(projectId);
  };
  const navigate = useNavigate();
  const toprojectdashboard = () => {
    setCardOpen(true);
    dispatch(getProjectDetail(projectId));
    dispatch(getInProgressTasks(projectId));
    dispatch(getToDoTasks(projectId));
    dispatch(getDoneTasks(projectId));
    // dispatch(getProjectTasks(projectId));
    navigate("/ProjectDashboard");
  };

  const buttonClick = (e) => {
    setIsModalOpen(true);
    setCardOpen(true);
  };

  return (
    <div
      key={index}
      style={{
        height: 172,
        width: 290.5,

        border: `1px solid ${fcolor}`,

        borderRadius: 8,
      }}
    >
      <Card
        hoverable={true}
        onClick={isCardOpen ? toprojectdashboard : null}
        key={id}
        title={item.title}
        extra={
          <Dropdown placement="top" menu={{ items }} trigger={["click"]} arrow>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCardOpen(false);
              }}
              size="medium"
            >
              <DashOutlined size={"large"} />
            </Button>
          </Dropdown>
        }
        style={{
          height: 170,
          width: 288,
          // margin: 0,
          opacity: 0.8,
          border: `8px solid ${scolor}`,

          // padding: 0,
          borderRadius: 8,
        }}
      >
        <p className="opacity-50 mt-0 mb-2">{item.description}</p>
        <span>
          <Avatar.Group
            maxCount={2}
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            <Avatar src="" />
            <Avatar
              style={{
                backgroundColor: "#f56a00",
              }}
            >
              K
            </Avatar>
            <Tooltip title="Ant User" placement="top">
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                }}
                icon={<UserOutlined />}
              />
            </Tooltip>
            <Avatar
              style={{
                backgroundColor: "#1890ff",
              }}
              icon={<AntDesignOutlined />}
            />
          </Avatar.Group>
        </span>
      </Card>

      <Modal
        title="Edit project"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={332}
        centered={true}
        style={{ borderRadius: "1px" }}
      >
        <div className=" flex flex-col pt-1 mt-1  justify-center items-center">
          <Form
            form={form}
            initialValues={
              item.users !== null
                ? {
                    title: item.title,
                    description: item.description,

                    userId: defaultMember,
                  }
                : { title: item.title, description: item.description }
            }
            onFinish={onFinish}
            layout="vertical"
            name="create_form"
          >
            <Form.Item
              className="pb-2 m-0"
              label="Project Title"
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
              style={{
                marginBottom: 0,
              }}
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
            <p className="pt-1 mt-1">Members</p>
            <div>
              {item.users !== null &&
                item.users.map((project) => {
                  <div className="pb-2">
                    <Avatar size={"small"} />
                    <span className="pl-3">{project.username}</span>
                    <CloseOutlined
                      onClick={() => {
                        console.log("hehe");
                      }}
                      className="pl-3"
                    />
                  </div>;
                })}
            </div>
            <Form.Item required={true} name="userId">
              <Select
                mode="multiple"
                showSearch
                options={options}
                placeholder="+ Add members"
              ></Select>
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
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectCard;
