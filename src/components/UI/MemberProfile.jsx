import {
  Avatar,
  Breadcrumb,
  Typography,
  Input,
  Form,
  Card,
  Progress,
} from "antd";

const { Title } = Typography;
import { EditTwoTone, ArrowLeftOutlined } from "@ant-design/icons";
import ProjectHeader from "./UI/ProjectHeader";

const MemberProfile = () => {
  return (
    <>
      <ProjectHeader />
      <div className="  static h-24 bg-gray-200">
        <div className=" absolute top-20 left-8 flex  flex-row items-center space-x-8">
          <ArrowLeftOutlined />
          <Breadcrumb
            items={[
              {
                title: <a href="">Dashboard</a>,
              },
              {
                title: "Name's Profile",
              },
            ]}
          />
        </div>
        <Avatar
          size={90}
          src="https://thumbs.dreamstime.com/b/iron-man-17900674.jpg"
          className=" border-gray-200 border-8 bg-black ml-52  absolute  top-32 "
        />
      </div>
      <div className=" h-14"></div>
      <div className=" w-40 text-center  flex items-start flex-row justify-evenly h-8 ml-44  ">
        <div className=" flex flex-col items-center p-0 m-0 space-x-0 space-y-0">
          <Title
            className=" mb-0 pb-0 h-full  w-full  text-ellipsis overflow-hidden whitespace-nowrap"
            level={4}
          >
            Khant Zwe Naing
          </Title>
          <p className=" pt-0 mt-0 font-robo text-sm text-gray-400">
            neymar@example.com
          </p>
          <p className=" font-robo text-sm  pt-0  ">UI/UX Designer</p>
        </div>
      </div>
      <div className=" h-14"></div>
      <div className=" bg-gray-100 w-full h-1"></div>
      <div className=" flex flex-row items-center justify-evenly my-4 py-4">
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
          title="To Do Tasks"
          bordered={false}
          style={{
            width: 240,
            border: " 2px solid #D9D9D9",
          }}
        >
          <p className="font-bold pt-5">12</p>
        </Card>
        <Card
          title="In Progress Tasks"
          bordered={false}
          style={{
            width: 240,
            border: " 2px solid #40A9FF ",
          }}
        >
          <p className="font-bold pt-5">12</p>
        </Card>
        <Card
          title="Completed Tasks"
          bordered={false}
          style={{
            width: 240,
            border: " 2px solid #73D13D",
          }}
        >
          <p className="font-bold pt-5">12</p>
        </Card>
      </div>
      <div className=" flex items-center justify-evenly ">
        <div className=" border border-solid rounded-lg border-gray-300   h-52 w-[580px]    ">
          <div className=" flex flex-row items-center justify-between">
            <div className=" my-8 py-8 mx-4 px-4 font-robo">
              <Title
                style={{
                  color: "rgba(0, 0, 0, 0.45)",
                }}
                level={5}
              >
                Total Projects
              </Title>
              <span>12</span>
            </div>
            <div className=" mx-4">
              <Progress
                percent={60}
                success={{
                  percent: 30,
                }}
                type="dashboard"
              />
            </div>
          </div>
          <div className=" flex flex-row space-x-7 mb-2 pb-2 mx-3 px-3 justify-start font-robo">
            <div className=" flex flex-row space-x-1">
              <div className=" w-[16px] h-[16px] bg-gray-100"></div>
              <div>To Do</div>
            </div>
            <div className=" flex flex-row space-x-1">
              <div className=" w-[16px] h-[16px]  bg-blue-500"></div>
              <div>In Progress</div>
            </div>
            <div className=" flex flex-row space-x-1">
              <div className=" w-[16px] h-[16px] bg-green-500"></div>
              <div>Completed</div>
            </div>
          </div>
        </div>
        <div className=" border border-solid rounded-lg border-gray-300 h-52 w-[580px] ">
          <div className=" flex flex-row items-center justify-between">
            <div className=" my-8 py-8 mx-4 px-4 font-robo">
              <Title
                style={{
                  color: "rgba(0, 0, 0, 0.45)",
                }}
                level={5}
              >
                Total Tasks
              </Title>
              <span>12</span>
            </div>
            <div className=" mx-4">
              <Progress
                percent={60}
                success={{
                  percent: 30,
                }}
                type="dashboard"
              />
            </div>
          </div>
          <div className=" flex  flex-row justify-start space-x-7 mb-2 pb-2 mx-3 px-3  font-robo">
            <div className=" flex flex-row space-x-1">
              <div className=" w-[16px] h-[16px] bg-gray-100"></div>
              <div>To Do</div>
            </div>
            <div className=" flex flex-row space-x-1">
              <div className=" w-[16px] h-[16px]  bg-blue-500"></div>
              <div>In Progress</div>
            </div>
            <div className=" flex flex-row space-x-1">
              <div className=" w-[16px] h-[16px] bg-green-500"></div>
              <div>Completed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberProfile;
