import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MySpin from "./Dashboard/MySpin";
import { useEffect } from "react";
import { getCurrentUserRole } from "../features/auth/authActions";
const Checkrole = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const role_loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  dispatch(getCurrentUserRole());

  useEffect(() => {
    if (role_loading === false) {
      if (role === "ROLE_ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard/myprojects");
      }
    }
  }, []);

  return <MySpin />;
};
export default Checkrole;
