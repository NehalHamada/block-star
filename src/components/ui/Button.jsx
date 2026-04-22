import React from "react";

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  className = "",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  // استخدام الألوان من index.css
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "var(--color-primary)",
          color: "#ffffff",
          borderColor: "var(--color-primary)",
        };
      case "secondary":
        return {
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-white)",
          borderColor: "var(--color-secondary)",
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: "var(--color-secondary)",
          borderColor: "var(--color-secondary)",
          borderWidth: "1px",
          borderStyle: "solid",
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: "var(--color-secondary)",
        };
      case "status":
        return {
          backgroundColor: "rgba(223, 188, 52, 0.1)",
          color: "var(--color-primary)",
        };
      case "danger":
        return {
          backgroundColor: "#dc2626",
          color: "var(--color-white)",
          borderColor: "#dc2626",
        };
      default:
        return {
          backgroundColor: "var(--color-primary)",
          color: "var(--color-secondary)",
        };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      style={getVariantStyles()}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && !loading && <span>{icon}</span>}
      {children}
    </button>
  );
}
