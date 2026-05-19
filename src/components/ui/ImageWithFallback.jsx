import React, { useState } from "react";

// RATIONALE: Reusable image component that displays a premium site logo placeholder when the image fails to load or is not provided.
export const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 border border-gray-200/50 p-4 select-none ${className}`}
        style={{ minHeight: "100%", ...props.style }}
      >
        <div className="relative w-1/3 h-1/3 max-w-[64px] max-h-[64px] aspect-square flex items-center justify-center">
          <img
            src="/icon.png"
            alt="Block Star"
            className="w-full h-full object-contain filter drop-shadow-md opacity-80 animate-pulse"
          />
        </div>
        <span className="text-[10px] sm:text-xs font-semibold text-dark-gray/60 mt-2 font-cairo tracking-wide">
          Block Star
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};
