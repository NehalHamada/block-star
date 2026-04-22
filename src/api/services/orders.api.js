import axiosInstance from "../axiosInstance.js";

export const orderServices = {
  createOrder: async (data) => {
    const response = await axiosInstance.post("/orders", data);
    return response.data;
  },
  getMyOrders: async (lang = "en") => {
    const response = await axiosInstance.get(`/orders?lang=${lang}`);
    return response.data;
  },
  trackOrder: async (orderId, lang = "en") => {
    const response = await axiosInstance.get(`/orders/${orderId}?lang=${lang}`);
    return response.data;
  },
};
