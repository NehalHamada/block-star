import axiosInstance from "../axiosInstance.js";

export const homeService = {
  getHomeData: async (lang = "en") => {
    const response = await axiosInstance.get(`/site-intro?lang=${lang}`);
    return response.data;
  },
  getLatestCategories: async (lang = "en") => {
    const response = await axiosInstance.get(`/categories/latest?lang=${lang}`);
    return response.data;
  },
  getBestSellingProducts: async (lang = "en") => {
    const response = await axiosInstance.get(
      `/products/best-selling?lang=${lang}`,
    );
    return response.data;
  },
  getLatestProducts: async (lang = "en") => {
    const response = await axiosInstance.get(
      `/products/latest-items?lang=${lang}`,
    );
    return response.data;
  },
  getOffersProducts: async (lang = "en") => {
    const response = await axiosInstance.get(`/products/offers?lang=${lang}`);
    return response.data;
  },
  getHomeCard: async () => {
    const response = await axiosInstance.get(`/site-sections/home`);
    return response.data;
  },
  getCompanyCard: async () => {
    const response = await axiosInstance.get(`/site-sections/company_orders`);
    return response.data;
  },
};
