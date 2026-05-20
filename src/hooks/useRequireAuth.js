import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Hook that checks authentication before performing an action.
 * Instead of redirecting to login, it shows a toast notification.
 *
 * @returns {Function} requireAuth - Wraps a callback and checks auth first
 */
export const useRequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const requireAuth = (callback) => {
    if (!isAuthenticated) {
      // Show a toast notifying the user that login is required
      toast.warning("يجب تسجيل الدخول أولاً للقيام بهذا الإجراء.", {
        toastId: "auth-required",
      });
      // Redirect to login page
      navigate("/auth/login", { replace: true });
      return;
    }
    // If authenticated, execute the provided callback
    callback?.();
  };

  return { requireAuth, isAuthenticated };
};
