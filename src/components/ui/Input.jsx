import React from "react";
import { Input as AntInput } from "antd";
export const Input = React.forwardRef(
  ({ label, error, icon, className = "", id, name, ...props }, ref) => {
    const inputId = id || name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1 text-sm font-medium text-dark-gray"
          >
            {label}
          </label>
        )}

        <AntInput
          ref={ref}
          id={inputId}
          name={name}
          prefix={icon}
          status={error ? "error" : undefined}
          className={`!bg-transparent !text-[16px] !px-4 !py-3 !border !shadow-none direction-rtl transition-all ${
            error
              ? "!border-red-500 focus:!border-red-500 focus:!shadow-[0_0_0_2px_rgba(239,68,68,0.15)]"
              : "!border-light-gray hover:!border-secondary focus:!border-secondary focus:!shadow-[0_0_0_2px_var(--color-secondary)]"
          } ${className || "!rounded-lg"}`}
          {...props}
        />

        {error && (
          <p className="mt-1 text-sm text-right text-red-600">{error}</p>
        )}
      </div>
    );
  },
);
