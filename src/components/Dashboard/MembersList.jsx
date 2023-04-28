import {
  Typography,
  Button,
  Input,
  Table,
  Modal,
  Form,
  Select,
  Space,
} from "antd";
import emailjs from "@emailjs/browser";
import { message, Popconfirm } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { Search } = Input;
const { Title } = Typography;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  createMember,
  DeleteMember,
  DetailMember,
  getMemberList,
  getPositinLists,
  getUserDoneTasks,
  getUserInProgressTasks,
  getUserToDoTasks,
} from "../../features/member/memberActions";
import MySpin from "./MySpin";

const MembersList = () => {
  const [mounted, setMounted] = useState(false);
  const [userDeletedName, setUserDeletedName] = useState("");
  //redux
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.member.positionLists);
  const delete_error = useSelector((state) => state.member.delete_error);
  const member_creating = useSelector((state) => state.member.member_creating);
  const member_created = useSelector((state) => state.member.member_created);
  const loading = useSelector((state) => state.member.loading);
  const member_list = useSelector((state) => state.member.members);

  //redux
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const createsuccess = () => {
    messageApi.open({
      type: "success",
      content: "New Member Created sucessfully",
    });
  };
  const deleteFailed = () => {
    if (delete_error.startsWith("Y") || delete_error.startsWith("y")) {
      // handle error starting with "Y" or "y"
      messageApi.open({
        type: "warning",
        content: delete_error + " " + "(" + userDeletedName + ")",
      });
    } else {
      // handle other errors
      messageApi.open({
        type: "success",
        content: delete_error + " " + "(" + userDeletedName + ")",
      });
    }
    // messageApi.open({
    //   type: "warning",
    //   content: delete_error + " " + "(" + userDeletedName + ")",
    // });
  };

  //-------DeleteMember-------//
  const confirmHandler = (record) => {
    setUserDeletedName(record.username);
    console.log(record.id);
    dispatch(DeleteMember(record.id));
    // setRefresh(true);
  };

  const cancelHandler = (record) => {
    console.log(record);
    // message.error("Click ");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleView = (record) => {
    console.log(record.id);
    dispatch(DetailMember(record.id));
    dispatch(getUserToDoTasks());
    dispatch(getUserInProgressTasks());
    dispatch(getUserDoneTasks());
    navigate("/MemberProfile");
  };
  //------Create Member-----//
  const onFinish = (values) => {
    console.log(values);
    // console.log("Form values:", values);
    const emailData = {
      username: values.username,
      email: values.email,
      password: values.password,
      member_email: values.email,
    };
    emailjs
      .send(
        "service_ldlkfem",
        "template_2pw0ug6",
        emailData,
        "4Sz_ppkrh0RjDpYvq"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    dispatch(createMember(values));
  };

  //-----Create Member----//
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
        <span className="flex flex-row space-x-3">
          <a
            onClick={() => handleView(record)}
            className="flex flex-col justify-between  "
          >
            View
          </a>
          <Popconfirm
            title="Warning"
            description="Are you sure you want to delete this Member?"
            onConfirm={() => confirmHandler(record)}
            onCancel={() => cancelHandler(record)}
            okText="Yes"
            cancelText="No"
          >
            <a className="text-red-400">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  //USE EFFECT

  useEffect(() => {
    member_created !== null ? createsuccess() : null;
    form.resetFields();
    dispatch(getMemberList());
  }, [member_created]);

  useEffect(() => {
    if (mounted) {
      delete_error !== null ? deleteFailed() : null;
      dispatch(getMemberList());
    } else {
      null;
    }
  }, [delete_error]);
  //USE EFFECT
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {contextHolder}
      <div className=" w-1233 h-88 border-b border-gray-400 border-solid border-t-0 border-r-0 border-l-0">
        <div className="flex flex-row items-center justify-between">
          <Title className="p-4 m-4" level={4}>
            Members List
          </Title>
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
            <div className=" text-white">Create Members</div>
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
          key={"id"}
          loading={{
            spinning: loading,
            indicator: <MySpin />,
          }}
          size="medium"
          style={{
            width: 904,
            height: 235,
          }}
          dataSource={member_list}
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
        forceRender={true}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered={true}
        width={331}
      >
        <div className="flex flex-col justify-center items-center">
          <Title level={5}>Create an account for member</Title>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            name="create_form"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  type: "string",
                  message: "Please input the name",
                },
              ]}
              // validateTrigger="onBlur"
            >
              <Input placeholder="name" style={{ borderRadius: "1px" }} />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input the email",
                },
              ]}
              validateTrigger={"onChange"}
            >
              <Input placeholder="email" style={{ borderRadius: "1px" }} />
            </Form.Item>
            <Form.Item
              name="password"
              // placeholder="password"
              // label="Phone"
              rules={[
                {
                  required: true,
                  validator: (_, value) => {
                    if (value.length < 8) {
                      return Promise.reject(
                        new Error("Password must be at least 8 characters")
                      );
                    }
                    if (!/\d/.test(value)) {
                      return Promise.reject(
                        new Error("Password must contain at least one number")
                      );
                    }
                    if (!/[A-Z]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Password must contain at least one capital letter"
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              validateTrigger={"onChange"}
            >
              <Input.Password
                style={{ borderRadius: "1px" }}
                placeholder="password"
              />
            </Form.Item>
            <Form.Item
              name="positionId"
              rules={[
                {
                  required: true,
                  message: "Please select the position",
                },
              ]}
            >
              <Select placeholder="position">
                {positions &&
                  positions.map((position) => (
                    <Select.Option key={position.id} value={position.id}>
                      {position.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                loading={member_creating}
                style={{
                  width: "277px",
                  backgroundColor: "#597EF7",
                  border: "1px solid #1890FF",
                  borderRadius: "1px",
                }}
                type="primary"
                htmlType="submit"
              >
                {member_creating ? "Creating member account.." : "Create"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default MembersList;
