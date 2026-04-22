import { ProductItem } from "./ProductItem.jsx";
import { SummarySection } from "./SummarySection.jsx";
import { useCart, useCartMutations } from "../../hooks/queries/useCart.js";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export const ShoppingCart = ({ setCurrentSection, setCurrentStep }) => {
  const { data } = useCart();
  const { t } = useTranslation();
  const { clearCart } = useCartMutations();

  const cartItems = data?.data?.items || [];

  const handleClearCart = () => {
    clearCart.mutate(undefined, {
      onSuccess: () => toast.success(t("cart.cleared")),
      onError: () => toast.error(t("cart.clearError")),
    });
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold underline">
          {t("cart.shoppingCart")}
        </h1>
        <button
          onClick={handleClearCart}
          disabled={clearCart.isPending || cartItems.length === 0}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-500 border border-red-400 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 size={15} />
          {clearCart.isPending ? t("cart.clearing") : t("cart.clearCart")}
        </button>
      </div>

      {/* Cart Content */}
      <div className="w-full max-w-6xl mx-auto py-3 sm:py-5">
        {/* Products List */}
        <div className="flex flex-col">
          {cartItems.map((item, index) => (
            <div key={item.product_id}>
              <ProductItem item={item} />
              {/* Separator - don't show after last item */}
              {index < cartItems.length - 1 && (
                <div className="border-b-2 border-secondary/20" />
              )}
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <SummarySection
          setCurrentSection={setCurrentSection}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </div>
  );
};
