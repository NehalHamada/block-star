import { IncrementAndDegrementBtns } from "./IncrementAndDegrementBtns.jsx";
import { Button } from "./ui";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { TbPencilDiscount } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCartMutations } from "../hooks/queries/useCart.js";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ThumbsSwiper } from "./ThumbsSwiper.jsx";
import { useState } from "react";

export const ProductDetailComponent = ({ product, counter, setCounter }) => {
  const { addToCart } = useCartMutations();
  const { t } = useTranslation();
  const [selectedColor, setSelectedColor] = useState(null);

  const handleAddToCart = () => {
    addToCart.mutate(
      { productId: product.id, quantity: counter },
      {
        onSuccess: () => {
          toast.success(t("product.addedToCart", { name: product.name }));
        },
        onError: () => {
          toast.error(t("product.addToCartError"));
        },
      },
    );
  };

  // Stock status helpers
  const stockMap = {
    in_stock: { label: t("product.inStock"), color: "text-green-600" },
    limited: { label: t("product.limited"), color: "text-orange-500" },
    out_of_stock: { label: t("product.outOfStock"), color: "text-red-500" },
  };
  const stock = stockMap[product.stock_status] ?? stockMap.in_stock;
  const isOutOfStock = product.stock_status === "out_of_stock";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
      {/* Right Side - Product Info */}
      <div className="flex flex-col gap-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl leading-relaxed">{product.name}</h1>

        {/* Description */}
        <p className="text-dark-gray text-base md:text-lg leading-relaxed">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-4 font-noto">
          {product.has_discount ? (
            <>
              <span className="text-light-gray line-through text-xl">
                {product.original_price} {t("product.currency")}
              </span>
              <span className="text-xl font-bold text-red-600">
                {product.price} {t("product.currency")}
              </span>
              {product.discount_percent && (
                <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-0.5 rounded-full">
                  {t("product.discount")} {product.discount_percent}%
                </span>
              )}
            </>
          ) : (
            <span className="text-xl font-bold text-secondary">
              {product.price} {t("product.currency")}
            </span>
          )}
        </div>

        {/* Availability & Quantity */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className={`font-semibold text-lg ${stock.color}`}>
              {stock.label}
            </span>
          </div>

          {/* Quantity selector — hidden when out of stock */}
          {!isOutOfStock && (
            <div className="flex items-center gap-3">
              <IncrementAndDegrementBtns
                counter={counter}
                setCounter={setCounter}
              />
            </div>
          )}
        </div>

        {/* Usage Info */}
        {product.usage && (
          <div className="bg-secondary/5 border border-secondary/10 rounded-xl p-5 mt-2">
            <h3 className="font-semibold text-lg mb-2 text-secondary flex items-center gap-2">
              <TbPencilDiscount size={22} />
              {t("product.usage")}
            </h3>
            <p className="text-dark-gray leading-relaxed text-sm md:text-base italic">
              "{product.usage}"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock || addToCart.isPending}
            className={`w-full ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {addToCart.isPending ? (
              <AiOutlineLoading3Quarters className="animate-spin text-xl" />
            ) : (
              <HiOutlineShoppingCart />
            )}
            {isOutOfStock ? t("product.outOfStock") : t("product.addToCart")}
          </Button>

          <Button variant="outline">
            <TbPencilDiscount />
            {t("product.designNow")}
          </Button>
        </div>
      </div>

      {/* Left Side - Image Gallery */}
      <div className="rounded-xl overflow-hidden flex flex-col gap-6">
        <ThumbsSwiper images={product.images} />

        {/* Colors Section */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg text-dark-gray border-b border-secondary/10 pb-2">
              {t("product.availableColors", "الألوان المتاحة")}
            </h3>

            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() =>
                    setSelectedColor(
                      selectedColor?.id === color.id ? null : color,
                    )
                  }
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all border ${
                    selectedColor?.id === color.id
                      ? "border-secondary bg-secondary/10 shadow-sm"
                      : "border-gray-200 hover:border-secondary/50 bg-white"
                  }`}
                  type="button"
                >
                  <span
                    className="w-5 h-5 rounded-xl shadow-sm border border-gray-300"
                    style={{ backgroundColor: color.hex_code }}
                  />
                  <span className="font-medium text-sm text-gray-700">
                    {t(`colors.${color.name}`, color.name)}
                  </span>
                </button>
              ))}
            </div>

            {/* Display Selected Color Image Fully */}
            {selectedColor && selectedColor.image_path && (
              <div className="mt-2 relative rounded-xl overflow-hidden border border-gray-200 shadow-md bg-white animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md z-10 flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: selectedColor.hex_code }}
                  />
                  <span className="font-bold text-gray-800 text-sm">
                    {t(`colors.${selectedColor.name}`, selectedColor.name)}
                  </span>
                </div>
                <img
                  src={selectedColor.image_path}
                  alt={selectedColor.name}
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
