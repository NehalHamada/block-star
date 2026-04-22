import axiosInstance from "../axiosInstance.js";

const profileService = {
  getMyProfile: async (lang = "en") => {
    const response = await axiosInstance.get(`/profile?lang=${lang}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  },
  updateMyProfile: async (data) => {
    const response = await axiosInstance.post("/profile/update", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  },
  updateImageProfile: async (data) => {
    const response = await axiosInstance.post("/profile/image", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  },
  requestOtp: async (data) => {
    const response = await axiosInstance.post("/profile/request-otp", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  },
  changePassword: async (data) => {
    const response = await axiosInstance.post(
      "/profile/change-password",
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return response.data;
  },
};

export default profileService;
