import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllSubCategories } from "../api/services/categories.api.js";
import { useTranslation } from "react-i18next";

export const SwiperCaroursel = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { data: slides } = useQuery({
    queryKey: ["slides", i18n.language],
    queryFn: () => getAllSubCategories(i18n.language),
  });

  const renderSlides = slides?.data || [];

  // loop mode requires at least 3 slides to avoid Swiper warnings
  const canLoop = renderSlides.length >= 3;

  if (renderSlides.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto mb-10 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center font-noto">
        {t("home.decorReflectsTaste")}
      </h2>

      <Swiper
        key={i18n.language}
        dir={isRTL ? "rtl" : "ltr"}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={canLoop}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="swiper-container"
      >
        {renderSlides.map((slide, index) => (
          <SwiperSlide key={slide.id ?? index} className="swiper-slide-custom">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={slide.image}
                alt={slide.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 bg-black/10 backdrop-blur-xl mx-10 rounded-xl">
                <p className="text-white text-xl md:text-2xl font-semibold text-center font-cairo">
                  {slide.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles */}
      <style>
        {`
        .swiper-container {
          width: 100%;
          padding: 50px 0;
        }

        .swiper-slide-custom {
          background-position: center;
          background-size: cover;
          width: 300px;
          height: 300px;
        }

        @media (min-width: 668px) {
          .swiper-slide-custom {
            width: 600px;
            height: 400px;
          }
        }

        .swiper-slide-custom img {
          display: block;
          width: 100%;
        }

        /* Pagination styling */
        .swiper-pagination-bullet {
          background: #DFBC34;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          background: #DFBC34;
          opacity: 1;
        }

        /* Navigation buttons styling */
        .swiper-button-next,
        .swiper-button-prev {
          color: #DFBC34;

       
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }
      `}
      </style>
    </div>
  );
};
