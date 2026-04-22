import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getProductFilters,
  getProductTypes,
  getWoodTypes,
} from "../../api/services/products.api.js";
import { useTranslation } from "react-i18next";

/**
 * Fetch /products with optional filter params.
 */
export const useGetProducts = (params = {}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== "" && v !== undefined && v !== null,
    ),
  );

  return useQuery({
    queryKey: ["products", lang, cleanParams],
    queryFn: () => getAllProducts(lang, cleanParams),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Fetch /products/filter — returns wood_types, product_types, subcategories
 * used to populate the FilterBar dropdowns.
 */
export const useGetProductFilters = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["products-filter", lang],
    queryFn: () => getProductFilters(lang),
    staleTime: 1000 * 60 * 10, // 10 min — filter options rarely change
  });
};

export const useGetProductTypes = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["product-types", lang],
    queryFn: () => getProductTypes(lang),
    staleTime: 1000 * 60 * 10, // 10 min — filter options rarely change
  });
};

export const useGetWoodTypes = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["wood-types", lang],
    queryFn: () => getWoodTypes(lang),
    staleTime: 1000 * 60 * 10, // 10 min — filter options rarely change
  });
};
