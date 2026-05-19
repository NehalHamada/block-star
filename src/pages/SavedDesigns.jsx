import React from "react";
import { Button, Header, ProductCard } from "../components";
import { useNavigate } from "react-router-dom";
import { useGetSavedProducts } from "../hooks/queries/useSavedProduct.js";
import { IoBookmarkOutline } from "react-icons/io5";
import { BookmarkX } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SavedDesigns() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const breadcrumbs = [
    { label: t("nav.home"), path: "/" },
    { label: t("savedDesigns.breadcrumb"), path: null },
  ];

  const { data: savedProducts, isLoading, isError } = useGetSavedProducts();
  const products = savedProducts?.data?.data ?? [];

  return (
    <div className="w-full font-cairo">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        {/* Page heading */}
        <div className="flex flex-col gap-5 items-center justify-center py-5 mb-5">
          <p className="text-3xl font-bold font-noto py-3 text-secondary">
            {t("savedDesigns.title")}
          </p>
          <p className="max-w-2xl text-center text-lg text-dark-gray">
            {t("savedDesigns.subtitle")}
          </p>
          <div className="w-full max-w-xl border border-dashed border-primary hover:bg-primary/5 rounded-full mx-auto transition-colors duration-300">
            <Button
              className="w-full text-secondary hover:text-primary transition-colors"
              variant="ghost"
              onClick={() => navigate("/studio")}
            >
              {t("savedDesigns.startDesign")}
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="max-w-[350px] mx-auto w-full animate-pulse bg-white p-4 rounded-3xl border border-secondary/5 shadow-sm"
              >
                <div className="aspect-[3/4] rounded-2xl bg-secondary/10" />
                <div className="mt-4 space-y-3 px-1">
                  <div className="h-5 bg-secondary/10 rounded-md w-3/4" />
                  <div className="h-4 bg-secondary/10 rounded-md w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="text-lg text-red-500 font-medium bg-red-50 px-6 py-3 rounded-xl border border-red-100">
              {t("savedDesigns.loadError")}
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              {t("savedDesigns.retry")}
            </Button>
          </div>
        )}

        {/* Empty state (Premium Design) */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto py-12 md:py-20 px-4">
            <div className="bg-white/80 backdrop-blur-sm border border-secondary/10 shadow-xl shadow-secondary/5 rounded-[2rem] p-8 sm:p-12 md:p-16 w-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full flex items-center justify-center mb-6 md:mb-8 relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75 duration-1000"></div>
                <BookmarkX className="w-12 h-12 md:w-16 md:h-16 text-primary z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-cairo text-secondary mb-4 tracking-tight">
                {t("savedDesigns.noDesigns")}
              </h3>
              <p className="text-dark-gray text-base md:text-lg mb-8 max-w-lg font-cairo leading-relaxed">
                {t("savedDesigns.noDesignsDesc")}
              </p>
              <Button
                onClick={() => navigate("/categories")}
                className="px-8 py-3 md:py-4 text-base md:text-lg font-cairo font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 rounded-xl"
              >
                {t("savedDesigns.browseProducts")}
              </Button>
            </div>
          </div>
        )}

        {/* Products grid */}
        {!isLoading && !isError && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <div key={product.id} className="transition-transform duration-300 hover:-translate-y-1">
                <ProductCard product={{ ...product, is_saved: true }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
