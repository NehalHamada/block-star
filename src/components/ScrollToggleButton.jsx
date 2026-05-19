import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import icon from "/icon.png";

export function ScrollToggleButton() {
  const [isAtBottomHalf, setIsAtBottomHalf] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Only show the toggle scroll button if the page has significant scrollable content
      if (totalHeight > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine if current position is closer to bottom half
      if (scrollY > totalHeight / 2) {
        setIsAtBottomHalf(true);
      } else {
        setIsAtBottomHalf(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Listen to window size changes and DOM updates to handle dynamic heights
    const observer = new ResizeObserver(handleScroll);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleScrollToggle = () => {
    const totalHeight = document.documentElement.scrollHeight;
    if (isAtBottomHalf) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: totalHeight, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleScrollToggle}
      className="fixed bottom-6 end-6 md:bottom-8 md:end-8 z-50 rounded-full bg-[#231F20] p-1 shadow-[0_4px_20px_rgba(223,188,52,0.35)] hover:shadow-[0_4px_25px_rgba(223,188,52,0.6)] border-2 border-primary hover:scale-108 active:scale-95 transition-all duration-300 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center cursor-pointer group"
      aria-label={isAtBottomHalf ? "Scroll to Top" : "Scroll to Bottom"}
    >
      {/* Website Logo Image */}
      <img
        src={icon}
        alt="Block Star Logo"
        className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:rotate-12"
      />

      {/* Floating Scroll Badge */}
      <div
        className={`absolute w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-secondary flex items-center justify-center shadow-md border border-secondary/10 transition-all duration-300 ${
          isAtBottomHalf
            ? "-top-1.5 -end-1.5 md:-top-2 md:-end-2"
            : "-bottom-1.5 -end-1.5 md:-bottom-2 md:-end-2"
        }`}
      >
        {isAtBottomHalf ? (
          <ArrowUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary transition-transform group-hover:-translate-y-0.5" />
        ) : (
          <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary transition-transform group-hover:translate-y-0.5" />
        )}
      </div>
    </button>
  );
}
