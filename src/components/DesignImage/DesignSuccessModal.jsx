import Lottie from "lottie-react";
import { SuccessModal } from "../modal/SuccessModal.jsx";
import { Button } from "../ui/Button.jsx";
import { useTranslation } from "react-i18next";
import successAnimation from "../../assets/lottie/application-completed.json";

/**
 * Success modal displayed after design is confirmed and added to cart
 */
export function DesignSuccessModal({
  open,
  onClose,
  onTryAnother,
  onBrowseProducts,
}) {
  const { t } = useTranslation();
  return (
    <SuccessModal open={open} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 text-center p-5">
        <Lottie animationData={successAnimation} loop={true} />

        <h2 className="text-xl font-medium text-white font-cairo">
          {t("studio.successTitle")}
        </h2>

        <p className="text-white/80 font-cairo">{t("studio.successMsg")}</p>

        <Button variant="primary" onClick={onTryAnother} className="w-full">
          {t("studio.tryAnother")}
        </Button>

        <Button variant="primary" onClick={onBrowseProducts} className="w-full">
          {t("studio.browseProducts")}
        </Button>
      </div>
    </SuccessModal>
  );
}
