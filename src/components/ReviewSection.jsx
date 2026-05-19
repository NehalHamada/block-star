import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const ReviewSection = ({ reviews = [] }) => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const { t } = useTranslation();

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // If no reviews, show a message
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-dark-gray text-lg">{t("reviews.noReviews")}</p>
      </div>
    );
  }

  return (
    <div className="relative px-12 max-w-4xl mx-auto">
      {/* Navigation Buttons */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={isBeginning}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 ${
          isBeginning
            ? "bg-gray-400 cursor-not-allowed opacity-50"
            : "bg-secondary hover:bg-secondary/80 active:scale-95"
        } text-white`}
        aria-label={t("common.previous")}
      >
        <FaChevronRight size={20} />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={isEnd}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 ${
          isEnd
            ? "bg-gray-400 cursor-not-allowed opacity-50"
            : "bg-secondary hover:bg-secondary/80 active:scale-95"
        } text-white`}
        aria-label={t("common.next")}
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          handleSlideChange(swiper);
        }}
        onSlideChange={handleSlideChange}
        className="py-8"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={review.id || index}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const { t } = useTranslation();

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `https://wooden.ahdafweb.com/public/${cleanPath}`;
  };

  const reviewImage = review.image || review.image_path || review.image_url || review.review_image;
  const imageUrl = getImageUrl(reviewImage);

  return (
    <div className="bg-primary/5 rounded-2xl mx-auto max-w-3xl relative flex flex-col md:flex-row items-stretch gap-6 p-6 md:p-8 shadow-lg my-5">
      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Quote Icon */}
        <div className="text-5xl text-primary/20 mb-4">
          <FaQuoteLeft />
        </div>

        {/* Stars */}
        <div className="flex justify-start gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-xl ${
                i < (review.rating || 0) ? "text-primary" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-lg md:text-xl text-dark-gray mb-6 leading-relaxed font-cairo flex-1">
          {review.comment || review.review}
        </p>

        {/* Divider */}
        <div className="w-20 h-0.5 bg-primary/30 mb-4"></div>

        {/* Customer Name */}
        <p className="text-base text-gray-600 font-medium">
          {review.user_name || review.name || t("reviews.customer")}
        </p>
      </div>

      {/* Image Section - Only show if image exists */}
      {imageUrl && (
        <div className="flex items-center justify-center md:justify-end">
          <div className="relative group overflow-hidden rounded-2xl w-[180px] h-[180px] md:w-[200px] md:h-[200px] flex-shrink-0 shadow-md">
            <img
              src={imageUrl}
              alt={review.user_name || review.name || t("reviews.customer")}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
