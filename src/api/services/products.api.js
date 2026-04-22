import axiosInstance from "../axiosInstance.js";

/**
 * Fetch all products (optionally filtered by params).
 * The axiosInstance interceptor automatically attaches the token when logged in —
 * the backend then returns personalized results (saved status, etc.).
 */
export const getAllProducts = async (lang = "en", params = {}) => {
  const response = await axiosInstance.get(`/products?lang=${lang}`, {
    params,
  });
  return response.data;
};

export const getProductFilters = async (lang = "en") => {
  const response = await axiosInstance.get(`/products/filter?lang=${lang}`);
  return response.data;
};

export const getProductsBySubcategory = async (
  subcategoryId,
  lang = "en",
  params = {},
) => {
  const response = await axiosInstance.get(`/products?lang=${lang}`, {
    params: { subcategory_id: subcategoryId, ...params },
  });
  return response.data;
};

export const getProductById = async (id, lang = "en") => {
  const response = await axiosInstance.get(`/products/${id}?lang=${lang}`);
  return response.data;
};

export const getProductTypes = async (lang = "en") => {
  const response = await axiosInstance.get(`/product-types?lang=${lang}`);
  return response.data;
};

export const getWoodTypes = async (lang = "en") => {
  const response = await axiosInstance.get(`/wood-types?lang=${lang}`);
  return response.data;
};
