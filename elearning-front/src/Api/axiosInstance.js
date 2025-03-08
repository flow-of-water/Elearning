// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api", 
  baseURL: "https://elearning-be-water.onrender.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Tự động gắn token vào header của mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);

      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; 
      }

    } else if (error.request) {
      console.error("Không nhận được phản hồi từ server:", error.request);
    } else {
      console.error("Lỗi khi thiết lập request:", error.message);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
