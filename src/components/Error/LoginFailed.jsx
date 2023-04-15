import { SmileOutlined, FrownTwoTone } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./LoginFailed.css";

const LoginFailed = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="loginfailed-wrapper">
      <Result
        className="loginfailed-items"
        icon={<FrownTwoTone />}
        title="You need to login First"
        extra={
          <Button
            style={{
              width: "296px",
              backgroundColor: "#003A8C",
              borderRadius: "1px",
            }}
            onClick={handleClick}
            type="primary"
            className="loginfailed-button"
          >
            Go to login
          </Button>
        }
      />
    </div>
  );
};

export default LoginFailed;
