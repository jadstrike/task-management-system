import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  const backhome = () => {
    navigate("/dashboard");
  };

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={backhome}>
          Back Home
        </Button>
      }
    />
  );
};
export default ErrorPage;
