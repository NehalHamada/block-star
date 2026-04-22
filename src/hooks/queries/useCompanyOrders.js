import { useMutation, useQuery } from "@tanstack/react-query";
import { CompanyOrdersServices } from "../../api/services/campanyOrders.api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetPartnersData = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return useQuery({
    queryKey: ["partners-data", lang],
    queryFn: () => CompanyOrdersServices.getPartnersData(lang),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useCompanyOrders = () => {
  return useMutation({
    mutationFn: (data) => CompanyOrdersServices.createCompanyOrder(data),
    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message === "Unauthenticated."
          ? "يرجي تسجيل الدخول"
          : error?.response?.data?.message || "حدث خطأ أثناء إرسال الطلب",
      );
    },
  });
};
