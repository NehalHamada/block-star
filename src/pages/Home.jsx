import hiroImage from "../assets/homeBg.jpg";
import {
  Button,
  FeatureSection,
  ProductList,
  SwiperCaroursel,
  VideoAboutAs,
} from "../components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import posterImage from "../assets/posterImage.jpg";
import {
  useBestSellingProducts,
  useCompanyCard,
  useHomeCard,
  useHomeData,
  useLatestCategories,
  useLatestProducts,
  useOffersProducts,
} from "../hooks/queries/useHome";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { data: homeData } = useHomeData();
  const { data: latestCategories } = useLatestCategories();
  const { data: bestSellingProducts } = useBestSellingProducts();
  const { data: latestProducts } = useLatestProducts();
  const { data: offersProducts } = useOffersProducts();
  const { data: homeCard } = useHomeCard();
  const { data: companyCard } = useCompanyCard();

  // ── Hero Slider ──────────────────────────────────────────────
  const mediaItems = homeData?.data?.media ?? [];
  const videoRefs = useRef({});

  const handleSlideChange = (swiper) => {
    // pause all videos, play the active one
    Object.values(videoRefs.current).forEach((v) => v?.pause());
    const activeVideo = videoRefs.current[swiper.realIndex];
    activeVideo?.play().catch(() => {});
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] md:h-[600px] overflow-hidden">
        {mediaItems.length === 0 ? (
          /* fallback static image */
          <>
            <img
              src={hiroImage}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            onSlideChange={handleSlideChange}
            className="w-full h-full hero-swiper">
            {mediaItems.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-full">
                  {item.type === "video" ? (
                    <video
                      ref={(el) => (videoRefs.current[i] = el)}
                      src={item.url}
                      autoPlay={i === 0}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={`slide-${i}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Content — sits above Swiper */}
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-8 px-4 text-center pt-20 z-10 pointer-events-none">
          <h1 className="text-3xl md:text-5xl font-noto text-white leading-tight max-w-3xl">
            {homeData?.data?.main_title}
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl">
            {homeData?.data?.main_description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 pointer-events-auto">
            <Button
              className="px-8 py-3 rounded-md"
              onClick={() => navigate("/categories")}>
              {t("home.heroBtn1")}
            </Button>
            <Button
              variant="secondary"
              className="px-8 py-3 rounded-md"
              onClick={() => navigate("/studio")}>
              {t("home.heroBtn2")}
            </Button>
          </div>
        </div>

        {/* Hero Swiper custom styles */}
        <style>{`
          .hero-swiper { position: absolute; inset: 0; }
          .hero-swiper .swiper-pagination {
            bottom: 20px;
            z-index: 20;
          }
          .hero-swiper .swiper-pagination-bullet {
            background: rgba(255,255,255,0.5);
            opacity: 1;
            width: 10px;
            height: 10px;
            transition: all 0.3s;
          }
          .hero-swiper .swiper-pagination-bullet-active {
            background: #DFBC34;
            width: 28px;
            border-radius: 5px;
          }
        `}</style>
      </div>

      {/* Categories Grid Section */}
      {latestCategories?.data?.length > 0 &&
        (() => {
          const categories = latestCategories.data.slice(0, 3);
          const count = categories.length;

          const CategoryCard = ({
            category,
            className = "",
            titleSize = "text-xl",
          }) => (
            <div
              className={`relative group overflow-hidden rounded-xl cursor-pointer ${className}`}
              onClick={() => navigate(`/categories/${category.id}`)}>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-8">
                <h3 className={`text-white ${titleSize} font-bold mb-2`}>
                  {category.name}
                </h3>
                <button className="text-white flex items-center gap-2 text-sm hover:underline">
                  {t("home.viewProducts")}{" "}
                  <div className="bg-primary rounded-full p-3">
                    {isRTL ? (
                      <FaArrowLeft size={15} />
                    ) : (
                      <FaArrowRight size={15} />
                    )}
                  </div>
                </button>
              </div>
            </div>
          );

          return (
            <div className="max-w-7xl mx-auto px-4 py-16">
              {/* 1 category — full width */}
              {count === 1 && (
                <CategoryCard
                  category={categories[0]}
                  className="h-[280px] md:h-[450px] w-full"
                  titleSize="text-2xl"
                />
              )}

              {/* 2 categories — side by side */}
              {count === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categories.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      className="h-[240px] md:h-[400px]"
                      titleSize="text-2xl"
                    />
                  ))}
                </div>
              )}

              {/* 3 categories — large left + 2 stacked right */}
              {count === 3 && (
                <div className="flex flex-col md:flex-row w-full gap-6">
                  <CategoryCard
                    category={categories[0]}
                    className="h-[240px] md:h-[500px] w-full md:w-1/2"
                    titleSize="text-2xl"
                  />
                  <div className="flex flex-row md:flex-col gap-6 w-full md:w-1/2">
                    {categories.slice(1).map((cat) => (
                      <CategoryCard
                        key={cat.id}
                        category={cat}
                        className="h-[240px] w-full"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-end itemy-center mt-4">
                <button
                  className="text-secondary hover:underline flex items-center gap-2 font-bold transition-all active:scale-95"
                  onClick={() => navigate("/categories")}>
                  {t("common.seeAll")}
                  <div className="bg-primary rounded-full p-2 text-white">
                    {isRTL ? (
                      <FaArrowLeft size={12} />
                    ) : (
                      <FaArrowRight size={12} />
                    )}
                  </div>
                </button>
              </div>
            </div>
          );
        })()}

      <div className="max-w-7xl mx-auto px-4  ">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="font-noto text-2xl font-bold ">
            {t("home.readyProducts")}
          </p>
          <p className="text-lg md:text-xl text-dark-gray max-w-2xl pb-3 text-center">
            {t("home.readyProductsDesc")}
          </p>
        </div>
        <ProductList products={latestProducts?.data} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 ">
        <div className="relative group overflow-hidden rounded-xl  h-[400px] md:h-[350px]">
          <img
            src={homeCard?.data?.images[0].url}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 ">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-8 px-4 text-center z-10">
              <h1 className="text-3xl font-noto text-white leading-tight max-w-3xl">
                {isRTL ? homeCard?.data?.title_ar : homeCard?.data?.title_en}
              </h1>
              <p className="text-white/90 text-lg md:text-xl  max-w-2xl">
                {isRTL
                  ? homeCard?.data?.description_ar
                  : homeCard?.data?.description_en}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  className=" px-8 py-3 rounded-md "
                  onClick={() => navigate("/categories")}>
                  {isRTL
                    ? homeCard?.data?.buttons[0].text_ar
                    : homeCard?.data?.buttons[0].text_en}
                </Button>
                <Button
                  variant="secondary"
                  className="  px-8 py-3 rounded-md "
                  onClick={() => navigate("/studio")}>
                  {isRTL
                    ? homeCard?.data?.buttons[1].text_ar
                    : homeCard?.data?.buttons[1].text_en}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4  ">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="font-noto text-2xl font-bold text-center">
            {t("home.designExperienceTitle")}
          </p>
          <p className="text-lg md:text-xl text-dark-gray text-center max-w-2xl pb-2">
            {t("home.designExperienceDesc")}
          </p>
        </div>
        <FeatureSection cards={homeData?.data?.rows} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 ">
        <div className="flex flex-col gap-7 items-center justify-center">
          <p className="font-noto text-2xl font-bold ">
            {t("home.bestSellingTitle")}
          </p>
          <p className="text-lg md:text-xl text-dark-gray max-w-2xl pb-3 text-center">
            {t("home.bestSellingDesc")}
          </p>
        </div>

        <ProductList products={bestSellingProducts?.data} />
      </div>

      <SwiperCaroursel />
      <VideoAboutAs
        posterImage={posterImage}
        videoSrc={homeData?.data?.video_url}
      />

      {offersProducts?.data?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16 ">
          <div className="flex flex-col gap-7 items-center justify-center">
            <p className="font-noto text-2xl font-bold ">
              {t("home.offersTitle")}
            </p>
            <p className="text-lg md:text-xl text-dark-gray max-w-2xl pb-3 text-center">
              {t("home.offersDesc")}
            </p>
          </div>
          <ProductList products={offersProducts?.data} />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 pb-16 ">
        <div className="relative group overflow-hidden rounded-3xl h-[300px] md:h-[350px]">
          <img
            src={companyCard?.data?.images[0].url}
            alt={
              isRTL ? companyCard?.data?.title_ar : companyCard?.data?.title_en
            }
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute bottom-0 right-6 left-6  md:w-[70%] mx-auto bg-black/60 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-white/10">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-noto text-white font-bold">
                {isRTL
                  ? companyCard?.data?.title_ar
                  : companyCard?.data?.title_en}
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                {isRTL
                  ? companyCard?.data?.description_ar
                  : companyCard?.data?.description_en}
              </p>
              <div className="pt-2">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-black/20"
                  onClick={() => navigate("/company-orders")}>
                  {isRTL
                    ? companyCard?.data?.buttons[0].text_ar
                    : companyCard?.data?.buttons[0].text_en}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
