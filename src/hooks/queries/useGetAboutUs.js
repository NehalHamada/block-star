import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import aboutAsService from "../../api/services/aboutAs.api.js";

export const useGetAboutUs = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["about-us", lang],
    queryFn: () => aboutAsService.getAboutUs(lang),
  });
};
