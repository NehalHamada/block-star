import axiosInstance from "../axiosInstance";

const authService = {
  register: async (userData) => {
    const { data } = await axiosInstance.post("/register", userData, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  },

  verifyEmail: async (payload) => {
    const { data } = await axiosInstance.post("/verify-email", payload, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  },

  verifyEmailForResetPassword: async (payload) => {
    const { data } = await axiosInstance.post("/check-reset-code", payload, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  },

  resendCode: async (payload) => {
    const { data } = await axiosInstance.post("/resend-code", payload, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  },

  login: async (credentials) => {
    const { data } = await axiosInstance.post("/login", credentials, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  },

  forgotPassword: async (payload) => {
    const { data } = await axiosInstance.post("/forgot-password", payload);
    return data;
  },

  resetPassword: async (payload) => {
    const { data } = await axiosInstance.post("/reset-password", payload);
    return data;
  },

  getUser: async () => {
    const token = localStorage.getItem("userToken");
    const { data } = await axiosInstance.get("/user", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  logout: async () => {
    const token = localStorage.getItem("userToken");
    const { data } = await axiosInstance.post(
      "/logout",
      {},
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  },
};

export default authService;
