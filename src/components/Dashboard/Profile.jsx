import { Avatar, Breadcrumb, Typography, Input, Form, Card } from "antd";

const { Title } = Typography;
import { EditTwoTone, ArrowLeftOutlined } from "@ant-design/icons";
import ProjectHeader from "../UI/ProjectHeader";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <>
      <ProjectHeader />
      <div className="">
        <div className="  static h-28 bg-gray-200">
          <div className=" absolute top-20 left-8 flex  flex-row items-center space-x-8">
            <ArrowLeftOutlined />
            <Breadcrumb
              items={[
                {
                  title: (
                    <a onClick={() => navigate("/dashboard")}>Dashboard</a>
                  ),
                },
                {
                  title: "Profile",
                },
              ]}
            />
          </div>
          <Avatar
            size={90}
            src="https://thumbs.dreamstime.com/b/iron-man-17900674.jpg"
            className=" border-gray-200 border-8 bg-black ml-64  absolute  top-36 "
          />
        </div>
        <div className=" h-14"></div>
        <div className=" w-40 text-center  flex items-start flex-row justify-evenly h-8 ml-56 ">
          <Title
            className=" h-full  w-full  text-ellipsis overflow-hidden whitespace-nowrap"
            level={4}
          >
            Tony Stark
          </Title>
        </div>
        <div className=" flex flex-row space-x-24 ">
          <div className=" w-80 mt-3 h-72 rounded-lg border-gray-300 border-2 border-solid ml-36 flex flex-col justify-start items-center ">
            <Title level={4} className=" mt-4">
              About me
            </Title>
            <Form className=" py-3 my-3" initialValues={{ username: "inn" }}>
              <Form.Item name="username">
                <div className="flex flex-row">
                  <Input style={{ borderRadius: "1px" }} />
                  <EditTwoTone
                    style={{ fontSize: "1.3rem" }}
                    className=" pt-1 pl-2"
                  />
                </div>
              </Form.Item>
              <Form.Item>
                <div className="flex flex-row">
                  <Input style={{ borderRadius: "1px" }} placeholder="Name" />
                  <EditTwoTone
                    style={{ fontSize: "1.3rem" }}
                    className=" pt-1 pl-2"
                  />
                </div>
              </Form.Item>
              <Form.Item>
                <div className="flex flex-row">
                  <Input style={{ borderRadius: "1px" }} placeholder="Name" />
                  <EditTwoTone
                    style={{ fontSize: "1.3rem" }}
                    className=" pt-1 pl-2"
                  />
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className="mt-3 font-robo">
            <Title level={5}>Activity</Title>
            <div className="  mt-10  grid md:grid-cols-3 sm:grid-cols-2 gap-5">
              <Card
                title="Total Projects"
                bordered={false}
                headStyle={{ backgroundColor: "#D6E4FF" }}
                style={{
                  width: 240,
                  border: " 2px solid #597EF7",
                }}
              >
                <p className="font-bold pb-1">12</p>
                <p>Projects</p>
              </Card>
              <Card
                title="Total Members"
                bordered={false}
                headStyle={{ backgroundColor: "#FFE58F" }}
                style={{
                  width: 240,
                  border: " 2px solid #FFC53D",
                }}
              >
                <p className="font-bold pb-1">12</p>
                <p>Members</p>
              </Card>
              <Card
                title="Completed Projects"
                bordered={false}
                headStyle={{ backgroundColor: "#F6FFED" }}
                style={{
                  width: 240,
                  border: " 2px solid #73D13D",
                }}
              >
                <p className="font-bold pb-1">12</p>
                <p>Projects</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
