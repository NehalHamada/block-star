import axiosInstance from "../axiosInstance";

const contactService = {
  getContactInfo: async () => {
    const response = await axiosInstance.get("/contact-info");
    return response.data;
  },
  createContactMessage: async (contactInfo) => {
    const response = await axiosInstance.post("/contact-messages", contactInfo);
    return response.data;
  },
  getUserMessages: async () => {
    const response = await axiosInstance.get("my-messages");
    return response.data;
  },
  deleteUserMessage: async (id) => {
    const response = await axiosInstance.delete(`/my-messages/${id}`);
    return response.data;
  },
};

export default contactService;
