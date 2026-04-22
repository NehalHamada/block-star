import React, { useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import "swiper/css";

export function ProductList({ products = [] }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!products || products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 text-center">
        <p className="text-dark-gray">{t("products.noProductsAvailable")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        key={i18n.language}
        dir={isRTL ? "rtl" : "ltr"}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={products.length >= 3}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mb-8"
      >
        {products.map((product, index) => (
          <SwiperSlide key={product.id} className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.07,
                ease: "easeOut",
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col md:flex-row items-center gap-6 px-6">
        <div className="flex gap-3">
          {/* Prev button — points in the "back" direction based on RTL */}
          <motion.button
            onClick={() => swiperRef.current?.slidePrev()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all"
          >
            {isRTL ? (
              <ChevronRight className="w-6 h-6" />
            ) : (
              <ChevronLeft className="w-6 h-6" />
            )}
          </motion.button>
          {/* Next button */}
          <motion.button
            onClick={() => swiperRef.current?.slideNext()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all"
          >
            {isRTL ? (
              <ChevronLeft className="w-6 h-6" />
            ) : (
              <ChevronRight className="w-6 h-6" />
            )}
          </motion.button>
        </div>
        <div className="flex gap-2">
          {products.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: activeIndex === index ? 32 : 16,
                backgroundColor: activeIndex === index ? "#DFBC34" : "#d1d5db",
              }}
              transition={{ duration: 0.3 }}
              className="h-1 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
