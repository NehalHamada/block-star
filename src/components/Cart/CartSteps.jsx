import React from "react";
import { Steps, ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const CartSteps = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const currentStep = pathname.endsWith("/shipping")
    ? 1
    : pathname.endsWith("/payment-success")
      ? 2
      : 0;

  const items = [
    { title: t("cart.shoppingCart") },
    { title: t("cart.shippingAddress") },
    { title: t("cart.checkout") },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#DFBC34",
        },
        components: {
          Steps: {
            iconSize: 50,
          },
        },
      }}
    >
      <div className="w-full max-w-2xl mx-auto pb-8">
        <Steps
          current={currentStep}
          titlePlacement="vertical"
          items={items}
          size="default"
          responsive={false}
          className="[&_.ant-steps-item-title]:font-cairo [&_.ant-steps-item-title]:!text-md "
        />
      </div>
    </ConfigProvider>
  );
};
