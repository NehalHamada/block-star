import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInLeft } from "../utils/animations.js";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useRequireAuth } from "../hooks/useRequireAuth.js";

export const SectionCard = React.memo(function SectionCard({ category }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { requireAuth } = useRequireAuth();

  const isRtl = i18n.language === "ar";

  if (!category) return null;

  const handleClick = () => {
    if (category.isCTA) {
      requireAuth(() => {
        navigate("/studio");
      });
    } else {
      navigate(`/categories/${category.id}`);
    }
  };

  return (
    <motion.div
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="flex flex-col md:flex-row gap-6 py-5 border-b-2 border-secondary/20"
    >
      {/* Image */}
      <motion.div
        onClick={handleClick}
        className="w-full md:w-[400px] h-[250px] rounded-xl overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <img
          src={category.image}
          alt={category.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Text Content */}
      <div className="flex-1 py-0 md:py-5">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h2 className="text-2xl font-semibold mt-4">{category.name}</h2>
            {category.products_count && (
              <p className="text-secondary mt-2">
                {category.products_count} {t("sectionsList.products")}
              </p>
            )}
            {category.subtitle && (
              <p className="text-secondary mt-2">{category.subtitle}</p>
            )}
            {category.description && (
              <p className="text-dark-gray mt-4">{category.description}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <ArrowButton onClick={handleClick} isRtl={isRtl} />
      </div>
    </motion.div>
  );
});

const ArrowButton = ({ onClick, isRtl }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.15, rotate: -5 }}
      whileTap={{ scale: 0.9 }}
      className="w-9 h-9 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition cursor-pointer"
    >
      {isRtl ? <FaArrowLeftLong /> : <FaArrowRightLong />}
    </motion.button>
  );
};
