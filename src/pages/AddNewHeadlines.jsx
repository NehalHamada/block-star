import React from "react";
import { AddNewHeadlinesFrom, Header } from "../components";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AddNewHeadlines = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isEditing = !!location.state?.headline;

  const breadcrumbs = [
    { label: t("common.home"), path: "/" },
    { label: t("headlines.title"), path: "/headlines" },
    {
      label: isEditing ? t("headlines.editTitle") : t("headlines.addNew"),
      path: null,
    },
  ];

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col gap-5 items-center justify-center py-5 mb-5">
          <p className="text-3xl font-bold font-noto">
            {isEditing ? t("headlines.editTitle") : t("headlines.addNewTitle")}
          </p>
          <p className="max-w-2xl text-center text-lg text-dark-gray">
            {isEditing ? t("headlines.editDesc") : t("headlines.addNewDesc")}
          </p>
        </div>
        <AddNewHeadlinesFrom />
      </div>
    </div>
  );
};
