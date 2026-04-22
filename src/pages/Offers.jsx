import React from "react";
import { Header } from "../components";
import { useTranslation } from "react-i18next";

export function Offers() {
  const { t } = useTranslation();
  const breadcrumbs = [
    { label: t("common.home"), path: "/" },
    { label: t("offers.title"), path: null },
  ];

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
    </div>
  );
}
