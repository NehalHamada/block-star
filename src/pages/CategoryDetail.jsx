import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header, FilterBar, CategorySection, SkeletonLoader, EmptyState } from "../components";
import { useGetCategoryById } from "../hooks/queries/useCategories.js";
import { useTranslation } from "react-i18next";

export function CategoryDetail() {
  const { categoryName } = useParams();
  const { data: category, isLoading } = useGetCategoryById(categoryName);
  const [activeFilters, setActiveFilters] = useState({});
  const [filterKey, setFilterKey] = useState(0);
  const { t } = useTranslation();

  const homeCrumb = { label: t("nav.home"), path: "/" };
  const catsCrumb = { label: t("categories.breadcrumb"), path: "/categories" };

  const handleResetFilters = () => {
    setActiveFilters({});
    setFilterKey((prev) => prev + 1);
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (val) => val !== "" && val !== undefined && val !== null
  );

  if (isLoading) {
    return (
      <div className="w-full">
        <Header breadcrumbs={[homeCrumb, catsCrumb]} />
        <SkeletonLoader variant="default" />
      </div>
    );
  }

  if (!category?.data) {
    return (
      <div className="w-full">
        <Header breadcrumbs={[homeCrumb, catsCrumb]} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">{t("categories.notFound")}</h1>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    homeCrumb,
    catsCrumb,
    { label: category?.data?.name, path: null },
  ];

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16 flex flex-col gap-4 items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-noto mb-4 text-center">
          {category?.data?.name}
        </h1>
        <p className="text-dark-gray text-base md:text-lg text-center max-w-2xl">
          {category?.data?.description}
        </p>
      </div>

      <FilterBar key={filterKey} onFilterChange={setActiveFilters} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16 flex flex-col gap-3">
        {category?.data?.subcategories &&
        category?.data?.subcategories.length > 0 ? (
          category?.data?.subcategories
            .filter((sub) =>
              activeFilters.subcategory_id
                ? sub.id === activeFilters.subcategory_id
                : true,
            )
            .map((subcategory) => (
              <CategorySection
                key={subcategory.id}
                subcategory={subcategory}
                filters={activeFilters}
                onResetFilters={hasActiveFilters ? handleResetFilters : undefined}
              />
            ))
        ) : (
          <EmptyState
            title={t("categories.noProducts")}
            onResetFilters={hasActiveFilters ? handleResetFilters : undefined}
          />
        )}
      </div>
    </div>
  );
}
