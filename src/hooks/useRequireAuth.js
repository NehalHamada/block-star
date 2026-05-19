import { useAuth } from "./useAuth";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

/**
 * Hook that checks authentication before performing an action.
 * Instead of redirecting to login, it shows a toast notification.
 *
 * @returns {Function} requireAuth - Wraps a callback and checks auth first
 */
export const useRequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const requireAuth = (callback) => {
    if (!isAuthenticated) {
      toast.warning(t("auth.loginRequired", "يجب تسجيل الدخول أولاً للقيام بهذا الإجراء."), {
        toastId: "auth-required",
      });
      return;
    }
    callback?.();
  };

  return { requireAuth, isAuthenticated };
};
