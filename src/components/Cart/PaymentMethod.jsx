import React from "react";
import { FaApplePay, FaHandHoldingUsd } from "react-icons/fa";
import { Radio } from "antd";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import MADAIcon from "../../assets/MADA.png";

const PaymentOptions = () => {
  const { t } = useTranslation();
  return [
    {
      label: t("cart.fawry"),
      value: "myfatoorah",
      description: t("cart.fawryDesc"),
      icon: (
        <img
          src="https://logowik.com/content/uploads/images/fawry3233.jpg"
          alt="Fawry"
          className="w-25 h-15"
        />
      ),
    },
  ];
};

export const PaymentMethod = ({ control, name = "payment_method" }) => {
  const { t } = useTranslation();
  const options = PaymentOptions();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg sm:text-xl font-semibold underline py-5">
        {t("orders.paymentMethod")}
      </h2>

      <Controller
        name={name}
        control={control}
        defaultValue="cash"
        render={({ field }) => (
          <Radio.Group {...field} className="w-full">
            <div className="flex flex-col gap-4">
              {options.map((option) => (
                <PaymentMethodItem
                  key={option.value}
                  option={option}
                  isSelected={field.value === option.value}
                  onSelect={() => field.onChange(option.value)}
                />
              ))}
            </div>
          </Radio.Group>
        )}
      />
    </div>
  );
};

const PaymentMethodItem = ({ option, isSelected, onSelect }) => {
  return (
    <label
      onClick={onSelect}
      className={`
        flex items-center gap-2 justify-between 
        p-5 px-10 rounded-lg cursor-pointer w-full
        border-2 transition-all
        ${
          isSelected
            ? "border-secondary bg-secondary/10"
            : "border-light-gray bg-secondary/5 hover:border-secondary/50"
        }
      `}
    >
      <div className="flex flex-col gap-2">
        <span
          className={`text-lg font-medium ${isSelected ? "text-secondary" : ""}`}
        >
          {option.label}
        </span>
        <span className="text-sm text-dark-gray">{option.description}</span>
      </div>
      <div className="flex items-center gap-4">
        <div>{option.icon}</div>
        <Radio value={option.value} className="radio-custom" />
      </div>
    </label>
  );
};
