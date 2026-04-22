import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

export const ThumbsSwiper = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main large image */}
      <div className="relative group w-full aspect-square md:aspect-[4/5] lg:aspect-square overflow-hidden rounded-3xl shadow-sm border border-secondary/5">
        <Swiper
          style={{
            "--swiper-navigation-color": "var(--color-secondary)",
            "--swiper-navigation-size": "20px",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs, EffectFade, Autoplay]}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.image_path}
                alt={`product-${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails gallery */}
      <div className="px-1">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false} // Better for predictable thumbnail navigation
          spaceBetween={12}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full"
          style={{ height: "80px" }}
          breakpoints={{
            640: { slidesPerView: 5 },
            1024: { slidesPerView: 4 },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="rounded-xl overflow-hidden cursor-pointer opacity-50 grayscale-[30%] transition-all duration-300 hover:opacity-80"
              style={{ height: "80px" }}
            >
              <img
                src={image.image_path}
                alt={`thumb-${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-slide-thumb-active {
          opacity: 1 !important;
          grayscale: 0 !important;
          outline: 2px solid var(--color-secondary);
          outline-offset: 2px;
          transform: scale(0.95);
          border-radius: 12px;
        }
        
        /* Premium custom navigation styling if needed */
        .mySwiper2 .swiper-button-next,
        .mySwiper2 .swiper-button-prev {
          background: rgba(255, 255, 255, 0.8);
          width: 35px;
          height: 35px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1;
        }

        .swiper-button-next:after, 
        .swiper-button-prev:after {
          font-size: 14px !important;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

