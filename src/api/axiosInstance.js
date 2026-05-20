import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ahdafweb.com/WoodenApi/public/api/",
});

// Request Interceptor — attaches token when user is logged in
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    const lang = localStorage.getItem("language") || "ar";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Accept-Language"] = lang;

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
