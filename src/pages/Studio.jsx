import { useState } from "react";
import { DesignPageByAI, Header } from "../components";
import { useTranslation } from "react-i18next";

export function Studio() {
  const [isConfirming, setIsConfirming] = useState(false);
  const { t } = useTranslation();

  const breadcrumbs = [
    { label: t("nav.home"), path: "/" },
    { label: t("studio.title"), path: null },
  ];

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      {!isConfirming && (
        <div className="max-w-7xl mx-auto px-4 py-10 ">
          <div className="flex flex-col items-center gap-2 px-4 sm:px-6 md:px-8 lg:px-10 mb-6 my-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-noto mb-2">
              {t("studio.designWithAI")}
            </h1>
            <p className="text-dark-gray text-sm sm:text-base md:text-lg text-center">
              {t("studio.chooseDesc")}
            </p>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <DesignPageByAI onStepChange={setIsConfirming} />
      </div>
    </div>
  );
}
