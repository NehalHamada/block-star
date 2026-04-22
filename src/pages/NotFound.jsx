import Lottie from "lottie-react";
import notFoundAnimation from "../assets/lottie/lonely-404.json";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="max-w-lg w-full text-center rounded-2xl p-6 md:p-10 shadow-lg"
        style={{
          border: "1px solid var(--color-light-beige)",
        }}
      >
        {/* Lottie */}
        <div className="max-w-xs mx-auto">
          <Lottie animationData={notFoundAnimation} loop />
        </div>

        {/* Title */}
        <h1
          className="text-2xl md:text-3xl font-bold mt-4 font-cairo"
          style={{ color: "var(--color-text-black)" }}
        >
          {t("notFound.title")}
        </h1>

        {/* Description */}
        <p
          className="mt-3 text-sm md:text-base font-cairo"
          style={{ color: "var(--color-dark-gray)" }}
        >
          {t("notFound.description")}
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full p-2 mt-4  rounded-xl font-cairo text-base transition-all duration-300 hover:scale-[1.02] text-secondary flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon />
          {t("notFound.backHome")}
        </button>
      </div>
    </div>
  );
}
