import useStudio from "../../hooks/queries/useStudio.js";
import { Button } from "../ui";
import { useTranslation } from "react-i18next";

export function DesignConfirmation({
  formData,
  capturedImage,
  setIsModalOpen,
}) {
  const { approveArtisticBoardCustom } = useStudio();
  const { t } = useTranslation();

  const handleApproveCustomDesign = () => {
    approveArtisticBoardCustom.mutate({ ...formData, image: capturedImage });
    setIsModalOpen(true);
  };

  const isPending = approveArtisticBoardCustom.isPending;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 py-10">
          <h1 className="text-2xl md:text-3xl font-bold font-noto mb-2 ">
            {t("studio.reviewTitle")}
          </h1>
          <p className="text-dark-gray text-sm md:text-base py-5">
            {t("studio.reviewDesc")}
          </p>
        </div>

        <div className="rounded-lg shadow-md p-4 md:p-6 lg:p-8">
          {/* Canvas Image */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              {t("studio.finalDesign")}
            </h2>
            <div className="flex justify-center rounded-lg p-4">
              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt={t("studio.finalDesign")}
                  className="max-w-full h-auto rounded"
                />
              ) : (
                <p className="text-dark-gray">{t("studio.noImage")}</p>
              )}
            </div>
          </div>

          {/* Design Details */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              {t("studio.designDetails")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-dark-gray">
                  {t("studio.productType")}
                </span>
                <span>{formData.productType || t("studio.unspecified")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-dark-gray">
                  {t("studio.size")}
                </span>
                <span>{formData.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-dark-gray">
                  {t("studio.woodType")}
                </span>
                <span>{formData.woodType || t("studio.unspecified")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-dark-gray">
                  {t("studio.color")}
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-light-gray"
                    style={{ backgroundColor: formData.color }}
                  />
                  <span>{formData.color}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <span className="font-medium text-dark-gray">
                  {t("studio.text")}
                </span>
                <span>{formData.text || t("studio.noText")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-dark-gray">
                  {t("studio.font")}
                </span>
                <span>{formData.font}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleApproveCustomDesign}
              disabled={isPending}
              className="py-3 px-8 md:px-12 rounded-full text-base md:text-lg bg-secondary hover:bg-secondary/90 text-white transition w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending
                ? t("studio.approvingDesign")
                : t("studio.approveDesign")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
