import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://wooden.ahdafweb.com/public/api",
});

// Request Interceptor — attaches token when user is logged in
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
