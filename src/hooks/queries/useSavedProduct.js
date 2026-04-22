import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import savedProductService from "../../api/services/savedProduct.api.js";
import { useTranslation } from "react-i18next";

/**
 * Single mutation that calls the toggle endpoint.
 * Works for both saving and un-saving a product.
 */
export const useToggleSavedProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) =>
      savedProductService.toggleSavedProduct(productId),

    onSuccess: () => {
      // Keep the saved-products list in sync after any toggle
      queryClient.invalidateQueries({ queryKey: ["saved-products"] });
    },
  });
};

/**
 * Fetch all saved products — only runs when the user is authenticated.
 */
export const useGetSavedProducts = () => {
  const token = localStorage.getItem("userToken");
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["saved-products", lang],
    queryFn: () => savedProductService.getSavedProducts(lang),
    enabled: !!token, // don't fire for unauthenticated users
  });
};
