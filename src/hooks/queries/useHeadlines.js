import { useMutation, useQuery } from "@tanstack/react-query";
import addressesService from "../../api/services/headlines.api";
import { useTranslation } from "react-i18next";

export const useHeadlines = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["headlines", lang],
    queryFn: () => addressesService.getAllHeadlines(lang),
  });
};

export const useAddressTypes = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["address-types", lang],
    queryFn: () => addressesService.getAllAddressTypes(lang),
  });
};

export const useCreateHeadline = () => {
  return useMutation({
    mutationFn: (headline) => addressesService.createHeadline(headline),
  });
};

export const useUpdateHeadline = () => {
  return useMutation({
    mutationFn: ({ id, headline }) =>
      addressesService.updateHeadline(id, headline),
  });
};

export const useDeleteHeadline = () => {
  return useMutation({
    mutationFn: (id) => addressesService.deleteHeadline(id),
  });
};
