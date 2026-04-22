import React from "react";
import { Button, Header, ProductCard } from "../components";
import { useNavigate } from "react-router-dom";
import { useGetSavedProducts } from "../hooks/queries/useSavedProduct.js";
import { IoBookmarkOutline } from "react-icons/io5";
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
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        {/* Page heading */}
        <div className="flex flex-col gap-5 items-center justify-center py-5 mb-5">
          <p className="text-3xl font-bold font-noto py-3">
            {t("savedDesigns.title")}
          </p>
          <p className="max-w-2xl text-center text-lg text-dark-gray">
            {t("savedDesigns.subtitle")}
          </p>
          <div className="w-full max-w-xl border border-dashed border-secondary hover:bg-secondary/10 rounded-full mx-auto">
            <Button
              className="w-full"
              variant="ghost"
              onClick={() => navigate("/studio")}
            >
              {t("savedDesigns.startDesign")}
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="max-w-[350px] mx-auto w-full animate-pulse"
              >
                <div className="aspect-[3/4] rounded-2xl bg-light-gray/40" />
                <div className="mt-4 space-y-2 px-1">
                  <div className="h-4 bg-light-gray/40 rounded w-3/4" />
                  <div className="h-4 bg-light-gray/40 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="text-lg text-red-500 font-medium">
              {t("savedDesigns.loadError")}
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              {t("savedDesigns.retry")}
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
            <IoBookmarkOutline size={60} className="text-secondary/40" />
            <p className="text-xl font-bold font-noto">
              {t("savedDesigns.noDesigns")}
            </p>
            <p className="text-dark-gray max-w-sm">
              {t("savedDesigns.noDesignsDesc")}
            </p>
            <Button onClick={() => navigate("/categories")}>
              {t("savedDesigns.browseProducts")}
            </Button>
          </div>
        )}

        {/* Products grid */}
        {!isLoading && !isError && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{ ...product, is_saved: true }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
