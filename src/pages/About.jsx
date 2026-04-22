import React from "react";
import { Header } from "../components";
import { useGetAboutUs } from "../hooks/queries/useGetAboutUs.js";
import { useTranslation } from "react-i18next";

export function About() {
  const { data: aboutUs } = useGetAboutUs();
  const { t } = useTranslation();
  const d = aboutUs?.data;

  const breadcrumbs = [
    { label: t("nav.home"), path: "/" },
    { label: t("about.breadcrumb"), path: null },
  ];

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />

      <div className="max-w-7xl mx-auto my-10 px-4">
        {/* Title + Description */}
        <div className="flex flex-col gap-5 items-center justify-center py-5">
          <p className="text-xl md:text-3xl font-bold font-noto">{d?.title}</p>
          <p className="max-w-2xl text-center text-lg text-dark-gray">
            {d?.description}
          </p>
        </div>

        {/* Main Image */}
        <div className="relative group overflow-hidden rounded-3xl h-[300px]">
          <img
            src={d?.image_url}
            alt={t("about.altText")}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Intro */}
        <div className="flex flex-col md:flex-row items-center my-0 md:my-10 ">
          <p className="text-xl p-3 font-bold  flex-1">{d?.intro?.title}</p>
          <div className="flex flex-col gap-3 flex-5">
            <p>{d?.intro?.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-2xl mx-auto text-2xl">
          {d?.stats &&
            Object.values(d.stats).map((item, index) => (
              <div
                key={index}
                className={
                  index % 2 !== 0 ? "flex justify-end" : "flex justify-start"
                }
              >
                <StatItem item={item} />
              </div>
            ))}
        </div>
      </div>

      {/* Store Representation */}
      <div className="bg-secondary/10 p-5 my-10 py-10 w-full mx-auto ">
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-around">
          <div className="flex flex-col gap-5 p-5">
            <p className="text-2xl font-medium underline">
              {t("about.whatWeRepresent")}
            </p>

            {d?.store_representation?.vision && (
              <FeatureItem feature={d.store_representation.vision} index={0} />
            )}
            {d?.store_representation?.mission && (
              <FeatureItem feature={d.store_representation.mission} index={1} />
            )}
          </div>

          <div className="relative group overflow-hidden rounded-3xl h-[400px] w-full sm:w-[400px] lg:w-[600px]">
            <img
              src={d?.store_representation?.image_url}
              alt={t("about.representationAlt")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const StatItem = ({ item }) => (
  <div className="flex flex-col items-start gap-2 mt-3">
    <p className="font-bold text-secondary text-3xl">{item.value}</p>
    <p className="text-dark-gray max-w-sm">{item.description}</p>
  </div>
);

const FeatureItem = ({ feature, index }) => (
  <div className="flex flex-col items-start gap-2">
    <p className="font-medium text-2xl">
      {index + 1}- {feature.title}
    </p>
    <p className="text-dark-gray max-w-sm">{feature.description}</p>
  </div>
);
