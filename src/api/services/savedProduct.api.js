import axiosInstance from "../axiosInstance.js";

const savedProductService = {
  /**
   * Toggle a product's saved state (server handles add/remove logic).
   * POST /saved-products/{id}/toggle
   */
  toggleSavedProduct: async (productId) => {
    const response = await axiosInstance.post(
      `/saved-products/${productId}/toggle`,
    );
    return response.data;
  },

  /**
   * Fetch all saved products for the authenticated user.
   * GET /saved-products
   */
  getSavedProducts: async (lang = "en") => {
    const response = await axiosInstance.get(`/saved-products?lang=${lang}`);
    return response.data;
  },
};

export default savedProductService;
