import React from "react";
import { OrderSummary } from "./SummarySection.jsx";
import { useCart } from "../../hooks/queries/useCart.js";
import { ProductItem } from "./ProductItem.jsx";
import { OrderForm } from "./OrderForm.jsx";
import { useTranslation } from "react-i18next";

export const Shipping = ({ setCurrentSection, setCurrentStep }) => {
  const { t } = useTranslation();
  const { data: response } = useCart();
  const data = response?.data || {};
  const cartItems = data?.items || [];

  // Get first 2 products for display
  const displayItems = cartItems.slice(0, 2);

  return (
    <div className="w-full flex flex-col gap-5 px-4 sm:px-6 lg:px-8 ">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto w-full bg-secondary/5 p-5 ">
        {/* Right Side - Products List */}
        <div className="flex flex-col flex-1 order-1 lg:order-2">
          <h2 className="text-xl font-semibold underline mb-6 font-cairo">
            {t("cart.shoppingCart")}
          </h2>
          {displayItems.map((item, index) => (
            <React.Fragment key={item.product_id}>
              <ProductItem item={item} />
              {/* Separator - don't show after last item */}
              {index < displayItems.length - 1 && (
                <div className="border-b-2 border-secondary/20 my-2" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Left Side - Order Summary */}

        {/* Order Summary Details */}
        <div className="max-w-lg mx-auto w-full p-5 order-2 lg:order-1">
          <OrderSummary />
        </div>
      </div>
      <OrderForm
        setCurrentSection={setCurrentSection}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};
