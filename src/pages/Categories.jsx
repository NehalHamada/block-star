import React from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { GoCircle } from "react-icons/go";
import { Header, SectionsList } from "../components";
import Islamic1 from "../assets/design-1.jpg";
import Islamic2 from "../assets/design-2.jpg";
import { useGetCategories } from "../hooks/queries/useCategories.js";
import { useTranslation } from "react-i18next";

// Main Categories Component
export function Categories() {
  const { t } = useTranslation();
  const breadcrumbs = [
    { label: t("nav.home"), path: "/" },
    { label: t("categories.breadcrumb"), path: null },
  ];

  const { data: categories } = useGetCategories();

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <MainContent categories={categories?.data} />
    </div>
  );
}

// Main Content Component
const MainContent = ({ categories }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
    <CategoriesSection categories={categories} />
    <HowToChooseSection />
  </div>
);

// Categories Section Component
const CategoriesSection = ({ categories }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-8 sm:mb-12 md:mb-16">
      <div className="flex flex-col gap-2 px-4 sm:px-6 md:px-8 lg:px-10 mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-noto mb-2">
          {t("categories.chooseFav")}
        </h1>
        <p className="text-dark-gray text-sm sm:text-base md:text-lg">
          {t("categories.subtitle")}
        </p>
      </div>
      <SectionsList categories={categories} />
    </div>
  );
};

// How to Choose Section Component
const HowToChooseSection = () => {
  const { t } = useTranslation();
  const features = [
    t("categories.feature1"),
    t("categories.feature2"),
    t("categories.feature3"),
    t("categories.feature4"),
  ];

  return (
    <div className="flex flex-col items-center w-full py-8 sm:py-10 md:py-12">
      <div className="max-w-5xl flex flex-col items-center gap-3 sm:gap-4 text-center px-4 mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-noto">
          {t("categories.howToChoose")}
        </h2>
        <p className="text-dark-gray text-sm sm:text-base md:text-lg">
          {t("categories.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 w-full">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 order-2 lg:order-1 px-4 sm:px-0">
          {features.map((feature, index) => (
            <FeatureItem key={index} item={feature} />
          ))}
        </div>
        <div className="order-1 lg:order-2">
          <ImageStack />
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ item }) => (
  <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
    <div className="bg-secondary/10 rounded-full p-2 sm:p-3 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 shadow-lg flex items-center justify-center flex-shrink-0">
      <GoCircle className="text-secondary w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
    </div>
    <p className="text-sm sm:text-base md:text-lg font-medium">{item}</p>
  </div>
);

const ImageStack = () => (
  <div className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] overflow-visible rounded-lg">
    <img
      src={Islamic1}
      alt="Islamic Design 1"
      className="absolute right-3 sm:right-4 md:right-5 top-12 sm:top-14 md:top-16 lg:top-20 w-[48%] sm:w-[50%] h-[75%] sm:h-[80%] md:h-[85%] lg:h-full object-cover shadow-lg rounded-lg z-10"
    />
    <img
      src={Islamic2}
      alt="Islamic Design 2"
      className="absolute left-3 sm:left-4 md:left-5 top-0 w-[48%] sm:w-[50%] h-[75%] sm:h-[80%] md:h-[85%] lg:h-full object-cover shadow-lg rounded-lg"
    />
  </div>
);
