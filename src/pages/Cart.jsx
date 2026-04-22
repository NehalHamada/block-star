import { CartPage, Header } from "../components";
import { useTranslation } from "react-i18next";

export const Cart = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    { label: t("nav.home"), path: "/" },
    { label: t("cart.shoppingCart"), path: null },
  ];
  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        <CartPage />
      </div>
    </div>
  );
};
