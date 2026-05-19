import axiosInstance from "../axiosInstance";

const studioService = {
  generateArtisticBoard: async (data) => {
    const response = await axiosInstance.post(
      "/artistic-boards/generate",
      data,
    );
    return response.data;
  },
  //artistic-boards
  approveArtisticBoard: async (id) => {
    const response = await axiosInstance.post(`/artistic-boards`, {
      id,
    });
    return response.data;
  },

  /*
  title: string,
  image_url: string,
  product_type_id: number,
  wood_type_id: number,
  size: string,
  color: string,
  text: string,
  font: string,
  */

  approveCustomBoard: async (data) => {
    const formData = new FormData();
    formData.append("title", data.text);
    formData.append("image_url", data.image);
    formData.append("product_type_id", data.productType);
    formData.append("wood_type_id", data.woodType);
    formData.append("size", data.size);
    formData.append("color", data.color);
    formData.append("text", data.text);
    formData.append("font", data.font);

    const response = await axiosInstance.post(`/artistic-boards`, formData);
    return response.data;
  },
};

export default studioService;
