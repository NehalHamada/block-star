import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import { X, ShoppingBag, Trash, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartDrawerContext } from "../../context/createContextRef.js";
import { useCart, useCartMutations } from "../../hooks/queries/useCart.js";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ImageWithFallback } from "../ui/ImageWithFallback.jsx";

export function CartDrawer() {
  const { isOpen, closeDrawer } = useContext(CartDrawerContext);
  const { data } = useCart();
  const { removeFromCart } = useCartMutations();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isRtl = i18n.language === "ar";
  const cartItems = data?.data?.items || [];
  const total = data?.data?.total_price ?? data?.data?.total ?? null;

  const handleCheckout = () => {
    closeDrawer();
    navigate("/cart");
  };

  const handleRemove = (productId) => {
    removeFromCart.mutate(productId, {
      onSuccess: () => toast.success(t("cart.removeSuccess")),
    });
  };

  /* ── slide direction based on language ── */
  const side = isRtl ? "left" : "right";
  const translateFrom = isRtl ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: translateFrom }}
            animate={{ x: 0 }}
            exit={{ x: translateFrom }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className={`fixed top-0 ${side}-0 h-full w-full max-w-sm bg-background shadow-2xl z-50 flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-secondary" />
                <h2 className="text-base font-semibold text-gray-800">
                  {t("cart.shoppingCart")}
                </h2>
                {cartItems.length > 0 && (
                  <span className="bg-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
                  <ShoppingBag size={48} strokeWidth={1.2} />
                  <p className="text-sm">{t("cart.empty")}</p>
                </div>
              ) : (
                cartItems.map((item) => {
                  const resolvedImage = item.color_image || item.main_image;
                  return (
                    <div
                      key={item.product_id}
                      className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      {/* Image or premium fallback */}
                      <ImageWithFallback
                        src={resolvedImage}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
                          {item.name}
                        </p>
                        
                        {/* Selected Color - RATIONALE: Render color name in quick slide drawer as well */}
                        {item.color_name && (
                          <p className="text-xs text-gray-500 font-cairo mt-0.5">
                            {t("cart.color")}: <span className="font-semibold text-secondary">{item.color_name}</span>
                          </p>
                        )}

                        <p className="text-xs text-gray-400 mt-0.5">
                          {t("cart.quantity")}: {item.quantity}
                        </p>
                        
                        {/* Price Details - Unit & Line Total */}
                        <div className="flex flex-col gap-0.5 mt-1">
                          <p className="text-sm font-bold text-secondary">
                            {item.price} {t("product.currency")}
                          </p>
                          {item.item_total && (
                            <p className="text-[11px] text-gray-500 font-cairo">
                              {t("cart.itemTotal")}: {item.item_total} {t("product.currency")}
                            </p>
                          )}
                        </div>
                      </div>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(item.product_id)}
                      className="p-1.5 rounded-full hover:bg-red-50 transition-colors flex-shrink-0 mt-0.5"
                      aria-label={t("cart.remove")}
                    >
                      <Trash size={15} className="text-red-400" />
                    </button>
                  </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                {/* Total */}
                {total !== null && (
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                    <span>{t("cart.total")}</span>
                    <span className="text-base text-secondary">
                      {total} {t("product.currency")}
                    </span>
                  </div>
                )}

                {/* CTAs */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
                >
                  {t("cart.checkout")}
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={closeDrawer}
                  className="w-full border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm py-2.5 rounded-full transition-colors"
                >
                  {t("cart.continueShopping")}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
