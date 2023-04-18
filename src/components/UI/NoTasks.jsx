import Card from "antd/es/card/Card";
const NoTasks = () => {
  return (
    <Card
      style={{
        width: 231,
      }}
      headStyle={{ border: "none" }}
      className=" mb-2 mt-3"
      size="small"
    >
      <div className=" flex flex-col justify-center items-center">
        No Tasks here
      </div>
    </Card>
  );
};

export default NoTasks;
