import axiosInstance from "../axiosInstance.js";

const aboutAsService = {
  getAboutUs: async (lang = "en") => {
    const response = await axiosInstance.get(`/about-us?lang=${lang}`);
    return response.data;
  },
};

export default aboutAsService;
