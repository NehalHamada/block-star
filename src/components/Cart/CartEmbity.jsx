import cartEmpity from "../../assets/cartEmpity.png";
import { useTranslation } from "react-i18next";
import { Button } from "../ui";
import { useNavigate } from "react-router-dom";
export const CartEmbity = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      {/* التحكم في الحجم هنا */}
      <div className="w-20 h-20 mx-auto">
        <img
          src={cartEmpity}
          alt="cartEmpity"
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-xl font-bold">{t("cart.empty")}</p>
      <p className="text-lg text-dark-gray text-center">
        {t("cart.emptyDesc")}
      </p>
      <Button
        onClick={() => navigate("/categories")}
        className="py-3 px-10 md:px-14 rounded-full text-base md:text-lg bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto transform hover:-translate-y-1">
        {t("nav.shopNow")}
      </Button>
    </div>
  );
};
