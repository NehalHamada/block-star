import React from "react";
import { Header } from "../components";
import { useGetAboutUs } from "../hooks/queries/useGetAboutUs.js";
import { useTranslation } from "react-i18next";
import { ShoppingBag, Users, Globe, Eye, Target } from "lucide-react";
import { useDocumentMetadata } from "../hooks";

export function About() {
  const { data: aboutUs } = useGetAboutUs();
  const { t, i18n } = useTranslation();
  const d = aboutUs?.data;

  useDocumentMetadata(
    d?.title || t("about.breadcrumb"),
    d?.description || "تعرف على بلوك ستار وقصة نجاحنا ورؤيتنا المستقبلية في تقديم أفضل الألواح الخشبية."
  );

  const breadcrumbs = [
    { label: t("nav.home"), path: "/" },
    { label: t("about.breadcrumb"), path: null },
  ];

  return (
    <div className="w-full font-cairo">
      <Header breadcrumbs={breadcrumbs} />

      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 md:px-8">
        {/* Title + Description */}
        <div className="flex flex-col gap-5 items-center justify-center py-5">
          <p className="text-xl md:text-3xl font-bold font-noto">{d?.title}</p>
          <p className="max-w-2xl text-center text-lg text-dark-gray font-cairo">
            {d?.description}
          </p>
        </div>

        {/* Main Image */}
        <div className="relative group overflow-hidden rounded-3xl h-[200px] sm:h-[300px] md:h-[400px] shadow-md border border-secondary/5">
          <img
            src={d?.image_url}
            alt={t("about.altText")}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-12 items-center">
          <div className="lg:col-span-5 relative pb-3">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary font-cairo leading-snug">
              {d?.intro?.title}
            </h3>
            <div
              className={`absolute bottom-0 w-20 h-1 bg-primary rounded-full ${
                i18n.language === "en" ? "left-0" : "right-0"
              }`}
            />
          </div>
          <div className="lg:col-span-7 text-dark-gray text-base leading-relaxed font-cairo">
            <p>{d?.intro?.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 my-10 md:my-16 max-w-5xl mx-auto px-1 sm:px-4">
          {d?.stats &&
            Object.values(d.stats).map((item, index) => (
              <StatCard key={index} item={item} index={index} />
            ))}
        </div>
      </div>

      {/* Store Representation */}
      <div className="bg-light-beige/50 border-y border-secondary/5 p-6 md:p-10 my-12 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="relative pb-3">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary font-cairo">
                {t("about.whatWeRepresent")}
              </h2>
              <div
                className={`absolute bottom-0 w-24 h-1 bg-primary rounded-full ${
                  i18n.language === "en" ? "left-0" : "right-0"
                }`}
              />
            </div>

            <div className="flex flex-col gap-4 mt-2">
              {d?.store_representation?.vision && (
                <FeatureItem feature={d.store_representation.vision} index={0} />
              )}
              {d?.store_representation?.mission && (
                <FeatureItem feature={d.store_representation.mission} index={1} />
              )}
            </div>
          </div>

          <div className="lg:col-span-6 relative group overflow-hidden rounded-3xl h-[300px] sm:h-[400px] w-full shadow-lg border border-secondary/10">
            <img
              src={d?.store_representation?.image_url}
              alt={t("about.representationAlt")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

const getStatIcon = (index, sizeClass = "w-6 h-6") => {
  switch (index) {
    case 0:
      return <ShoppingBag className={`${sizeClass} text-primary`} />;
    case 1:
      return <Users className={`${sizeClass} text-primary`} />;
    default:
      return <Globe className={`${sizeClass} text-primary`} />;
  }
};

const StatCard = ({ item, index }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-secondary/5 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-300 hover:-translate-y-1 w-[calc(50%-8px)] sm:w-[280px] shrink-0">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 sm:mb-4">
      {getStatIcon(index, "w-5 h-5 sm:w-6 sm:h-6")}
    </div>
    <p className="font-bold text-secondary text-2xl sm:text-4xl mb-1 sm:mb-2 font-cairo tracking-tight">
      {item.value}
    </p>
    <p className="text-dark-gray text-xs sm:text-sm font-cairo leading-relaxed max-w-[200px]">
      {item.description}
    </p>
  </div>
);

const FeatureItem = ({ feature, index }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl border border-secondary/5 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 w-full">
    <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center">
      {index === 0 ? (
        <Eye className="w-5 h-5 text-primary" />
      ) : (
        <Target className="w-5 h-5 text-primary" />
      )}
    </div>
    <div className="flex flex-col gap-1 text-start">
      <h4 className="font-bold text-lg text-secondary font-cairo">
        {feature.title}
      </h4>
      <p className="text-dark-gray text-sm font-cairo leading-relaxed">
        {feature.description}
      </p>
    </div>
  </div>
);
