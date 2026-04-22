import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../api/services/categories.api.js";
import { getCategoryById } from "../../api/services/categories.api.js";
import { useTranslation } from "react-i18next";

export const useGetCategories = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["categories", lang],
    queryFn: () => getAllCategories(lang),
  });
};

export const useGetCategoryById = (categoryId) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["category", categoryId, lang],
    queryFn: () => getCategoryById(categoryId, lang),
  });
};

