import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
  common: {
    Authorization: `Bearer ${token}`,
    "ngrok-skip-browser-warning": "any value",
  },
};

const axiosInstance = axios.create({ headers });

export default axiosInstance;
