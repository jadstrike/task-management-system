import {
  Breadcrumb,
  Button,
  Typography,
  Table,
  Input,
  Popconfirm,
  Modal,
  Form,
  Select,
} from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const { Title } = Typography;

const ProjectMembers = () => {
  const [form] = Form.useForm();
  const project_members = useSelector(
    (state) => state.project.detail_project.users
  );
  const old_members =
    project_members !== null &&
    project_members.map((member) => ({
      label: member.username,
      value: member.id,
    }));
  const new_members = useSelector((state) => state.member.members);

  const options = new_members.map((member) => ({
    label: member.username,
    value: member.id,
  }));
  const loading = useSelector((state) => state.project.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleSubmit = (userId) => {
    console.log(userId);
  };

  const navigate = useNavigate();
  console.log(project_members);
  const [searchedText, setSearchedText] = useState("");
  const [page, setPage] = useState(1);

  const handleView = (record) => {
    console.log(record.id);
    dispatch(DetailMember(record.id));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // render: (text, record, index) => (page - 1) * 5 + (index + 1),
    },

    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.username).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(record.positionName)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Position",
      dataIndex: "positionName",
      key: "positionName",
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <span>
          <a
            onClick={() => handleView(record)}
            className="flex flex-col justify-between  "
          >
            View
          </a>
          <Popconfirm
            title="Warning"
            description="Are you sure you to remove this member?"
            onConfirm={() => confirmHandler(record)}
            onCancel={() => cancelHandler(record)}
            okText="Yes"
            cancelText="No"
          >
            <a className="text-red-400">Remove</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const project_detail = useSelector((state) => state.project.detail_project);
  return (
    <div className="w-screen bg-white">
      <Breadcrumb
        className="pt-3 pl3 mt-3 ml-3 "
        items={[
          {
            title: (
              <a onClick={() => navigate("/dashboard/ProjectsLists")}>
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
            Members in this project
          </Title>
          <Button
            style={{
              width: 150,
              height: 40,
              borderRadius: 8,
              background: "#2F54EB",
            }}
            onClick={showModal}
            className="p-4  m-4 flex items-center justify-center"
          >
            <div className=" text-white">Add a new member</div>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-start p-5 m-5">
        <Input.Search
          style={{ width: 372, height: 60 }}
          placeholder="Search here"
          onSearch={(value) => {
            setSearchedText(value);
          }}
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
        />
        <Table
          rowKey={"id"}
          loading={loading}
          size="small"
          style={{
            width: 904,
            height: 235,
          }}
          dataSource={project_members}
          columns={columns}
          pagination={{
            pageSize: 5,
            onChange(current) {
              setPage(current);
            },
          }}
        />
      </div>
      <Modal
        open={isModalOpen}
        centered={true}
        onCancel={handleCancel}
        onOk={form.submit}
        width={331}
        okText="Add"
      >
        <div className=" m-3 p-3">
          <Form
            onFinish={handleSubmit}
            form={form}
            initialValues={old_members !== null && { userId: old_members }}
          >
            <Form.Item label="Members" name="userId">
              <Select options={options} mode="multiple"></Select>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectMembers;
