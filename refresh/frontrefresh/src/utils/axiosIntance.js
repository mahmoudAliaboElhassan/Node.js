import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true, // Allow cookies
});

export default axiosInstance;
