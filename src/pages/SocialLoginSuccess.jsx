import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { consumeSocialAuthTokenFromUrl } from "../utils/socialAuth.js";

export default function SocialLoginSuccess() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Consume token into localStorage first
      consumeSocialAuthTokenFromUrl();
      // Then update context state
      login(token);
      // Clean up URL and navigate
      window.history.replaceState({}, document.title, "/");
      navigate("/", { replace: true });
    } else {
      navigate("/auth/login", { replace: true });
    }
  }, [location, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">جاري تسجيل الدخول...</p>
    </div>
  );
}
