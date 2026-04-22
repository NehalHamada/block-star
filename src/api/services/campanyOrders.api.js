import axiosInstance from "../axiosInstance.js";

export const CompanyOrdersServices = {
  createCompanyOrder: async (data) => {
    const formData = new FormData();
    formData.append("company_name", data.company_name);
    formData.append("manager_name", data.manager_name);
    formData.append("phone1", data.phone1);
    if (data.phone2) formData.append("phone2", data.phone2);
    formData.append("email", data.email);
    formData.append("service_type", data.service_type);
    formData.append("description", data.description);
    formData.append("expected_delivery", data.expected_delivery);

    const response = await axiosInstance.post("/partner-requests", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  },
  getPartnersData: async (lang) => {
    const response = await axiosInstance.get(`/partners?lang=${lang}`);
    return response.data;
  },
};
