import axiosInstance from "../axiosInstance.js";

export const getAllCategories = async (lang = "en") => {
  const response = await axiosInstance.get(`/categories?lang=${lang}`);
  return response.data;
};

export const getCategoryById = async (id, lang = "en") => {
  const response = await axiosInstance.get(`/categories/${id}?lang=${lang}`);
  return response.data;
};

export const getSubCategories = async (id, lang = "en") => {
  const response = await axiosInstance.get(
    `/categories/${id}/subcategories?lang=${lang}`,
  );
  return response.data;
};

export const getAllSubCategories = async (lang = "en") => {
  const response = await axiosInstance.get(`/subcategories?lang=${lang}`);
  return response.data;
};
