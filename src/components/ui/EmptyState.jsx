import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { useRequireAuth } from "../../hooks/useRequireAuth.js";

export function EmptyState({
  title,
  description,
  actionText,
  actionPath = "/studio",
  showAction = true,
  onResetFilters,
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { requireAuth } = useRequireAuth();

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-lg mx-auto w-full">
      {/* Beautiful Frame Illustration using SVG and Framer Motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mb-8 flex justify-center items-center"
      >
        {/* Sparkles / Stars effect */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-6 -right-6 text-[#DFBC34] opacity-80"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8z" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-4 -left-6 text-[#DFBC34] opacity-60"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8z" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          {/* SVG representation of an empty elegant picture frame */}
          <svg
            width="170"
            height="170"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            {/* Minimalist easel or frame stand */}
            <path
              d="M65 160 L45 195 M135 160 L155 195 M100 160 L100 200"
              stroke="#231F20"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M35 160 L165 160"
              stroke="#231F20"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Outer Wood Frame */}
            <rect
              x="30"
              y="20"
              width="140"
              height="130"
              rx="10"
              fill="#231F20"
              stroke="#DFBC34"
              strokeWidth="4"
            />
            {/* Inner Matte Border */}
            <rect
              x="40"
              y="30"
              width="120"
              height="110"
              rx="5"
              fill="#FFFDF5"
              stroke="#C5C5C5"
              strokeWidth="1.5"
            />
            {/* Inner Canvas (Empty with dashed drawing line or abstract minimalist outline) */}
            <rect
              x="48"
              y="38"
              width="104"
              height="94"
              rx="3"
              fill="#F5F1E8"
            />

            {/* Dashed placeholder painting content (representing empty artwork) */}
            <path
              d="M70 95 C 80 82, 120 82, 130 95"
              stroke="#C5C5C5"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
            <circle cx="100" cy="72" r="7" stroke="#C5C5C5" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            
            {/* Elegant search glass icon overlay */}
            <g transform="translate(105, 95)">
              <circle cx="15" cy="15" r="9" fill="#FFFDF5" stroke="#DFBC34" strokeWidth="2.5" />
              <line x1="21.5" y1="21.5" x2="30" y2="30" stroke="#DFBC34" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold font-noto text-secondary mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-dark-gray text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
        {description || t("categories.noProductsDesc")}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
        {showAction && (
          <Button
            onClick={() => {
              if (actionPath === "/studio") {
                requireAuth(() => navigate(actionPath));
              } else {
                navigate(actionPath);
              }
            }}
            className="w-full sm:w-auto px-8 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition cursor-pointer"
          >
            {actionText || t("home.heroBtn2")}
          </Button>
        )}
        
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="text-primary hover:text-primary/80 font-bold text-sm underline cursor-pointer transition py-2"
          >
            {t("categories.resetFilters")}
          </button>
        )}
      </div>
    </div>
  );
}
