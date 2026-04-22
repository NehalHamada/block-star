import { IncrementAndDegrementBtns } from "../IncrementAndDegrementBtns.jsx";
import { ChevronDown, Trash } from "lucide-react";
import { useCartMutations } from "../../hooks/queries/useCart.js";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const ProductItem = ({ item }) => {
  const { t } = useTranslation();
  const {
    product_id,
    name,
    price,
    original_price,
    has_discount,
    quantity,
    main_image,
    size,
  } = item;
  const { updateCart, removeFromCart } = useCartMutations();

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    updateCart.mutate({ productId: product_id, quantity: newQuantity });
  };

  const handleRemove = () => {
    removeFromCart.mutate(product_id, {
      onSuccess: () => {
        toast.success(t("cart.removeSuccess"));
      },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6 py-4">
      {/* Product Info Section */}
      <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
        {/* Product Image */}
        <img
          src={main_image}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover flex-shrink-0"
          alt={name}
        />

        {/* Product Details */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-cairo font-medium text-text-black line-clamp-2">
            {name}
          </h3>

          {/* Size Selector */}
          {size && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-dark-gray">
              <span className="font-cairo">{size}</span>
              <ChevronDown size={16} className="text-dark-gray flex-shrink-0" />
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
            {/* Current Price */}
            <span className="text-base sm:text-lg font-noto font-bold text-red-600">
              {price} {t("product.currency")}
            </span>

            {/* Original Price - only show if discount exists */}
            {has_discount && original_price && (
              <span className="text-xs sm:text-sm font-noto text-dark-gray line-through">
                {original_price} {t("product.currency")}
              </span>
            )}

            {/* Discount Badge - only show if discount exists */}
            {has_discount && original_price && (
              <span className="text-xs font-cairo text-red-600">
                {t("product.discount")}{" "}
                {Math.round(
                  ((parseFloat(original_price) - parseFloat(price)) /
                    parseFloat(original_price)) *
                    100,
                )}
                %
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity and Delete Section */}
      <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
        {/* Quantity Controls */}
        <IncrementAndDegrementBtns
          counter={quantity}
          setCounter={handleUpdateQuantity}
        />

        {/* Delete Button */}
        <button
          className="flex items-center gap-1 text-dark-gray hover:text-red-600 transition-colors"
          aria-label={t("cart.remove")}
          onClick={handleRemove}
        >
          <Trash size={18} sm:size={20} strokeWidth={2} />
          <span className="text-xs sm:text-sm font-cairo">
            {t("cart.remove")}
          </span>
        </button>
      </div>
    </div>
  );
};
