import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import PaymentIcon from "../../assets/paymentDone.png";
import { useTranslation } from "react-i18next";
import { useTrackOrder } from "../../hooks/queries/useOrders";

export const Payment = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("order_id");
  const invoiceId = searchParams.get("invoice_id");
  const isSuccess = searchParams.get("success") === "true";

  const { data: orderResponse, isLoading: isOrderLoading } = useTrackOrder(orderId);
  const order = orderResponse?.data;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 px-4 sm:px-6 lg:px-8 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Illustration */}
      <motion.div
        className="relative w-full max-w-sm flex justify-center"
        variants={imageVariants}
      >
        <img
          src={PaymentIcon}
          alt={t("cart.paymentSuccess")}
          className="w-64 h-64 sm:w-80 sm:h-80 object-contain"
        />
      </motion.div>

      {/* Thank you message */}
      <motion.div className="text-center space-y-2" variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          {isSuccess ? t("cart.paymentSuccess") : t("cart.paymentFailed")}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto">
          {isSuccess
            ? t("cart.paymentSuccessDesc")
            : t("cart.paymentFailedDesc")}
        </p>
      </motion.div>

      {/* Order details card */}
      {isSuccess && (
        <motion.div
          className="w-full rounded-2xl shadow-lg border border-light-gray p-6 sm:p-8 space-y-4"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-light-gray">
            <div className="text-right">
              <p className="text-sm text-dark-gray mb-1">
                {t("cart.orderNumber")}:
              </p>
              <p className="text-lg font-bold text-dark-gray">
                #{orderId || "---"}
              </p>
            </div>
            <div className="text-right sm:text-left">
              <p className="text-sm text-dark-gray mb-1">
                {t("cart.orderDate")}:
              </p>
              <p className="text-lg font-medium text-dark-gray">
                {new Date().toLocaleDateString(
                  i18n.language === "en" ? "en-GB" : "ar-EG",
                )}
              </p>
            </div>
          </div>

          {invoiceId && (
            <div className="text-right pt-2 border-b border-light-gray pb-4">
              <p className="text-sm text-dark-gray mb-1">
                {t("cart.invoiceId")}:
              </p>
              <p className="text-base font-medium text-dark-gray">
                {invoiceId}
              </p>
            </div>
          )}

          {/* Purchased Products List */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pt-2 pr-1">
            {isOrderLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
              </div>
            ) : (
              order?.items?.map((item, index) => (
                <PaymentProductCard
                  key={`${item.product_id}-${index}`}
                  item={{
                    name: item.product_name,
                    main_image: item.product?.main_image || "https://placehold.co/400x400?text=Product",
                    price: item.price,
                    original_price: item.original_price,
                    has_discount: !!item.original_price,
                    size: item.size
                  }}
                />
              ))
            )}
          </div>

          {/* Order Summary Totals */}
          {order && (
            <div className="pt-4 space-y-2 border-t border-light-gray">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("cart.subtotal")}</span>
                <span className="font-semibold">{order.subtotal} {t("common.currency")}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>{t("cart.discount")}</span>
                  <span>-{order.discount} {t("common.currency")}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-light-gray">
                <span>{t("cart.total")}</span>
                <span className="text-secondary">{order.total} {t("common.currency")}</span>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Go to orders button */}
      <motion.div variants={itemVariants}>
        <Link
          to="/orders"
          className="inline-block bg-secondary text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          {t("cart.viewOrders")}
        </Link>
      </motion.div>
    </motion.div>
  );
};

import { ImageWithFallback } from "../ui/ImageWithFallback.jsx";

const PaymentProductCard = ({ item }) => {
  const { t } = useTranslation();
  const { name, main_image, price, original_price, has_discount, size } = item;

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
      {/* Product image */}
      <motion.div
        className="w-full sm:w-40 h-40 rounded-xl overflow-hidden bg-light-gray shrink-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <ImageWithFallback
          src={main_image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Product info */}
      <div className="flex-1 text-right space-y-2">
        <h3 className="text-base sm:text-lg font-semibold text-dark-gray leading-relaxed">
          {name}
        </h3>
        {size && <p className="text-sm text-gray-600">{size}</p>}

        {/* Price section */}
        <div className="flex items-center justify-end gap-3 pt-2 font-noto">
          <span className="text-2xl font-bold text-red-500">
            {price} {t("product.currency")}
          </span>
          {has_discount && original_price && (
            <span className="text-lg text-gray-400 line-through">
              {original_price} {t("product.currency")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
