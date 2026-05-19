import React from "react";
import { ProductList } from "./ProductList.jsx";
import { useQuery } from "@tanstack/react-query";
import { getProductsBySubcategory } from "../api/services/products.api.js";
import { useTranslation } from "react-i18next";

export function CategorySection({ subcategory, filters = {}, onResetFilters }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  // Exclude subcategory_id from filter params — CategorySection always scopes
  // to its own subcategory via getProductsBySubcategory.
  // Strip empty/undefined values too.
  const { subcategory_id: _ignored, ...otherFilters } = filters;
  const cleanFilters = Object.fromEntries(
    Object.entries(otherFilters).filter(
      ([, v]) => v !== "" && v !== undefined && v !== null,
    ),
  );

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products", subcategory.id, lang, cleanFilters],
    queryFn: () => getProductsBySubcategory(subcategory.id, lang, cleanFilters),
    enabled: !!subcategory.id,
  });

  const products = productsData?.data?.data || [];

  return (
    <div className="w-full">
      <div className="bg-secondary/5 w-full rounded-lg mb-2">
        <p className="font-semibold text-xl md:text-2xl p-4 md:p-6">
          {subcategory.name}
        </p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] rounded-xl bg-light-gray/40" />
              <div className="mt-3 space-y-2 px-1">
                <div className="h-3 bg-light-gray/40 rounded w-3/4" />
                <div className="h-3 bg-light-gray/40 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductList products={products} onResetFilters={onResetFilters} />
      )}
    </div>
  );
}
