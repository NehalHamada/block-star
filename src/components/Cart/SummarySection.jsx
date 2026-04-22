import React, { useState } from "react";
import { Button } from "../ui/Button";
import { useCart, useCartMutations } from "../../hooks/queries/useCart.js";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const SummarySection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleConfirmOrder = () => {
    navigate("/cart/shipping");
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 bg-secondary/5 p-4 sm:p-6 lg:p-8 rounded-lg max-w-5xl mx-auto items-center my-6 sm:my-10">
      {/* Section Title */}
      <h2 className="text-lg sm:text-xl font-semibold underline">
        {t("cart.orderSummary")}
      </h2>

      {/* Coupon Input */}
      <CouponInput />

      {/* Order Summary Details */}
      <div className="max-w-3xl mx-auto w-full p-5">
        <OrderSummary />
      </div>

      {/* Confirm Button */}
      <Button className="w-full sm:w-3/4 md:w-1/2" onClick={handleConfirmOrder}>
        {t("cart.confirmOrder")}
      </Button>
    </div>
  );
};

// Order Summary Component
export const OrderSummary = () => {
  const { t } = useTranslation();
  const { data: response } = useCart();
  const data = response?.data || {};
  const cartItems = data?.items || [];

  // Calculate totals from dynamic data
  const itemsCount = cartItems.length;
  const shippingCost = data?.shipping_cost || 0;
  const totalDiscount = data?.discount || 0;
  const total = data?.total || 0;

  return (
    <div className="flex flex-col gap-2 sm:gap-5  w-full  py-4 sm:py-5 px-4 sm:px-6 lg:px-10 bg-secondary/10 rounded-lg">
      <ItemSummary title={t("cart.itemsCount")} number={itemsCount} />
      <ItemSummary
        title={t("cart.shipping")}
        number={`${shippingCost} ${t("product.currency")}`}
        className="text-dark-gray/70"
      />
      <ItemSummary
        title={t("cart.discount")}
        number={`${totalDiscount} ${t("product.currency")}`}
        className="text-dark-gray/70"
      />
      <div className="border-t border-secondary/20 my-1" />
      <ItemSummary
        title={t("cart.total")}
        number={`${total} ${t("product.currency")}`}
      />
    </div>
  );
};

// Item Summary Row Component
export const ItemSummary = ({ title, number, className = "" }) => {
  const { t } = useTranslation();
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <p className="text-base sm:text-lg font-semibold font-cairo">{title}</p>
      <p className="text-base sm:text-lg font-semibold font-noto">
        {number || `0 ${t("product.currency")}`}
      </p>
    </div>
  );
};

// Coupon Input Component
export const CouponInput = () => {
  const { t } = useTranslation();
  const [couponCode, setCouponCode] = useState("");
  const { addCoupon, removeCoupon } = useCartMutations();
  const { data: response } = useCart();
  const data = response?.data || {};

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.warning(t("validation.enterCoupon"));
      return;
    }
    addCoupon.mutate(couponCode, {
      onSuccess: () => {
        toast.success(t("validation.couponApplied"));
        setCouponCode("");
      },
      onError: (err) => {
        toast.error(
          err.response?.data?.message || t("validation.couponInvalid"),
        );
      },
    });
  };

  const handleRemoveCoupon = () => {
    removeCoupon.mutate(undefined, {
      onSuccess: () => {
        toast.success(t("validation.couponRemoved"));
      },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-1/2">
      {data?.coupon ? (
        <div className="flex items-center gap-2 bg-secondary/10 p-2 rounded-lg border border-secondary/20">
          <span className="font-cairo font-medium">{data.coupon.code}</span>
          <button
            onClick={handleRemoveCoupon}
            className="text-red-600 font-cairo text-sm hover:underline"
          >
            {t("cart.removeCoupon")}
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder={t("cart.coupon")}
            className="border-2 border-secondary/20 p-2 sm:p-3 rounded-lg font-cairo text-sm sm:text-base focus:outline-none focus:border-secondary transition-colors w-full "
          />
          <button
            onClick={handleApplyCoupon}
            disabled={addCoupon.isLoading}
            className="bg-secondary text-white p-2 sm:p-3 rounded-lg font-cairo text-sm sm:text-base hover:bg-secondary/90 transition-colors whitespace-nowrap disabled:opacity-50"
          >
            {addCoupon.isLoading ? t("cart.applying") : t("cart.apply")}
          </button>
        </>
      )}
    </div>
  );
};
