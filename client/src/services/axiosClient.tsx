import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080", // Thay đổi địa chỉ backend tại đây
  timeout: 5000, // Thời gian chờ tối đa cho yêu cầu
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
