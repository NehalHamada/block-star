import axiosInstance from "../axiosInstance";

const addressesService = {
  getAllAddressTypes: async (lang = "en") => {
    const response = await axiosInstance.get(`/address-types?lang=${lang}`);
    return response.data;
  },
  getAllHeadlines: async (lang = "en") => {
    const response = await axiosInstance.get(`/addresses?lang=${lang}`);
    return response.data;
  },
  createHeadline: async (headline) => {
    const response = await axiosInstance.post("/addresses", headline);
    return response.data;
  },
  updateHeadline: async (id, headline) => {
    const response = await axiosInstance.post(
      `/addresses/${id}/update`,
      headline,
    );
    return response.data;
  },
  deleteHeadline: async (id) => {
    const response = await axiosInstance.delete(`/addresses/${id}`);
    return response.data;
  },
  getGovernorates: async (lang = "en") => {
    const response = await axiosInstance.get(`/governorates?lang=${lang}`);
    return response.data;
  },
};

export default addressesService;
