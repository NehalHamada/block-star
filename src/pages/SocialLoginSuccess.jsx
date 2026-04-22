import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function SocialLoginSuccess() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      login(token);
      window.history.replaceState({}, document.title, "/");
      navigate("/");
    } else {
      navigate("/auth/login");
    }
  }, [location, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">جاري تسجيل الدخول...</p>
    </div>
  );
}
