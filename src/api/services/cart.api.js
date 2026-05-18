import axiosInstance from "../axiosInstance.js";

export const cartService = {
  addToCart: async (productId, quantity, productColorId) => {
    // RATIONALE: Keep compatibility with products that do not have color variants
    const payload = {
      product_id: productId,
      quantity,
    };
    if (productColorId) {
      payload.product_color_id = productColorId;
    }
    const res = await axiosInstance.post(`/cart/items`, payload);
    return res.data;
  },
  getCart: async (lang = "en") => {
    const res = await axiosInstance.get(`/cart?lang=${lang}`);
    return res.data;
  },
  removeFromCart: async (productId) => {
    const res = await axiosInstance.delete(`/cart/items/${productId}`);
    return res.data;
  },
  updateCart: async (productId, quantity) => {
    const res = await axiosInstance.post(`/cart/items/${productId}/update`, {
      quantity,
    });
    return res.data;
  },
  clearCart: async () => {
    const res = await axiosInstance.delete(`/cart`);
    return res.data;
  },
  addCoupon: async (couponCode) => {
    const res = await axiosInstance.post(`/cart/coupon`, {
      code: couponCode,
    });
    return res.data;
  },
  removeCoupon: async () => {
    const res = await axiosInstance.delete(`/cart/coupon`);
    return res.data;
  },
};
