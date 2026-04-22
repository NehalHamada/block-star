import React from "react";
import OTPInput from "react-otp-input";

const OTPInputField = ({
  value,
  onChange,
  numInputs = 6,
  containerClass = "flex gap-2 sm:gap-4 justify-center  mb-6",
  inputClass = "w-10 h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl border-2 bg-transparent text-center text-lg sm:text-xl focus:outline-none transition-all",
}) => {
  return (
    <div dir="ltr" className={containerClass}>
      <OTPInput
        value={value}
        onChange={(otp) => {
          if (/^\d*$/.test(otp)) {
            onChange(otp);
          }
        }}
        numInputs={numInputs}
        inputType="tel"
        renderInput={(props) => (
          <input
            {...props}
            className={inputClass}
            style={{
              borderColor: props.value
                ? "var(--color-primary)"
                : "var(--color-light-gray)",
              color: "var(--color-text-black)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--color-primary)";
              e.target.style.boxShadow = "0 0 0 2px rgba(223, 188, 52, 0.1)";
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                e.target.style.borderColor = "var(--color-light-gray)";
              }
              e.target.style.boxShadow = "none";
            }}
          />
        )}
      />
    </div>
  );
};

export default OTPInputField;
