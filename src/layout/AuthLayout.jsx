import React from "react";
import { Outlet } from "react-router-dom";
import authImage from "../assets/authImage.png";
import { ScrollToTop } from "../components/ScrollToTop";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen w-full mx-auto px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <ScrollToTop />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 py-4 md:py-8 max-w-7xl mx-auto">
        <div className="hidden md:flex items-center justify-center">
          <img
            src={authImage}
            alt="authImage"
            className="w-full h-[85vh] object-cover rounded-xl"
          />
        </div>

        {/* Form Content */}
        <main className="flex items-center justify-center min-h-[80vh] md:min-h-[85vh] w-full">
          <div className="w-full max-w-xl px-4 sm:px-0">
            <Outlet />
          </div>
        </main>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="text-secondary flex items-center gap-2 hover:text-secondary/80 transition-colors cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          العوده لصفحه الرئسيه
          <ArrowLeftIcon />
        </button>
      </div>
    </div>
  );
}
