import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import profileService from "../../api/services/porfile.api.js";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useProfileData = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["profile", lang],
    queryFn: () => profileService.getMyProfile(lang),
  });
};

export const useUpdateProfileData = () => {
  return useMutation({
    mutationFn: (data) => profileService.updateMyProfile(data),
  });
};

export const useUpdateImageProfileData = () => {
  return useMutation({
    mutationFn: (data) => profileService.updateImageProfile(data),
  });
};

export const useRequestOtp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => profileService.requestOtp(data),
    onSuccess: (response) => {
      toast.success(response?.message || "تم طلب رمز التحقق");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "حدث خطأ أثناء طلب رمز التحقق",
      );
    },
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => profileService.changePassword(data),
    onSuccess: (response) => {
      toast.success(response?.message || "تم تغيير كلمة المرور بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "حدث خطأ أثناء تغيير كلمة المرور",
      );
    },
  });
};
