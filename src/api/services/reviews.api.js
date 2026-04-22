import axiosInstance from "../axiosInstance.js";

export const addReview = async (review) => {
  const response = await axiosInstance.post("/reviews", review, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return response.data;
};
