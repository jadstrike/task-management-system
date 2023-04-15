import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const Navigate = useNavigate();
  const backhome = () => {
    Navigate("/");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={backhome}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
