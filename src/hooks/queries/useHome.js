import { useQuery } from "@tanstack/react-query";
import { homeService } from "../../api/services/home.api.js";
import { useTranslation } from "react-i18next";

export const useHomeData = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, error } = useQuery({
    queryKey: ["home-data", lang],
    queryFn: () => homeService.getHomeData(lang),
  });
  return { data, isLoading, error };
};

export const useHomeCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["home-card"],
    queryFn: () => homeService.getHomeCard(),
  });
  return { data, isLoading, error };
};

export const useCompanyCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["company-card"],
    queryFn: () => homeService.getCompanyCard(),
  });
  return { data, isLoading, error };
};

export const useLatestCategories = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, error } = useQuery({
    queryKey: ["latest-categories", lang],
    queryFn: () => homeService.getLatestCategories(lang),
  });
  return { data, isLoading, error };
};

export const useBestSellingProducts = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, error } = useQuery({
    queryKey: ["best-selling-products", lang],
    queryFn: () => homeService.getBestSellingProducts(lang),
  });
  return { data, isLoading, error };
};

export const useLatestProducts = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, error } = useQuery({
    queryKey: ["latest-products", lang],
    queryFn: () => homeService.getLatestProducts(lang),
  });
  return { data, isLoading, error };
};

export const useOffersProducts = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, error } = useQuery({
    queryKey: ["offers-products", lang],
    queryFn: () => homeService.getOffersProducts(lang),
  });
  return { data, isLoading, error };
};
