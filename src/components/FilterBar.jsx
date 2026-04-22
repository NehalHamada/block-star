// FilterBar Component — uses live filter options from /products/filter API
import { useState } from "react";
import { Select, ConfigProvider } from "antd";
import { SlidersHorizontal } from "lucide-react";
import { DownOutlined } from "@ant-design/icons";
import { useGetProductFilters } from "../hooks/queries/useProducts";
import { useTranslation } from "react-i18next";



/**
 * FilterBar
 * - Fetches /products once (no filters) just to get the `filters` object
 *   that contains product_types and wood_types for the dropdowns.
 * - Calls onFilterChange(params) whenever any filter value changes.
 */
export const FilterBar = ({ onFilterChange }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    size: "",
    color: "",
    price: "",
    product_type_id: undefined,
    wood_type_id: undefined,
  });
  // Fetch filter options from the dedicated /products/filter endpoint
  const { data: filterData } = useGetProductFilters();
  const apiFilters = filterData?.data;

  // Convert API arrays into Ant Select option format
  const productTypeOptions = (apiFilters?.product_types ?? []).map((t) => ({
    value: t.id,
    label: t.name,
  }));
  const woodTypeOptions = (apiFilters?.wood_types ?? []).map((t) => ({
    value: t.id,
    label: t.name,
  }));
  const styleOptions = (apiFilters?.subcategories ?? []).map((t) => ({
    value: t.id,
    label: t.name,
  }));
  const colorsOptions = (apiFilters?.colors ?? []).map((c) => ({
    value: c,
    label: c,
  }));
  const sizeOptions = (apiFilters?.sizes ?? []).map((s) => ({
    value: s,
    label: s,
  }));
  const priceOptions = (apiFilters?.prices ?? []).map((p) => ({
    value: p,
    label: p,
  }));

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  const selectClassName =
    "w-full max-w-sm md:w-auto md:min-w-[130px] h-10 custom-filter-select !bg-transparent";

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#DFBC34" },
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 py-4 flex flex-col md:flex-row items-center gap-3 justify-center">
        {/* المقاس — dropdown from API */}
        <Select
          placeholder={t("filterBar.size")}
          allowClear
          suffixIcon={<DownOutlined className="text-[10px]" />}
          className={selectClassName}
          variant="outlined"
          style={{ borderRadius: "8px" }}
          options={sizeOptions}
          onChange={(val) => handleChange("size", val)}
        />

        {/* السعر — dropdown from API */}
        <Select
          placeholder={t("filterBar.price")}
          allowClear
          suffixIcon={<DownOutlined className="text-[10px]" />}
          className={selectClassName}
          variant="outlined"
          style={{ borderRadius: "8px" }}
          options={priceOptions}
          onChange={(val) => handleChange("price", val)}
        />
        {/* اللون — text input */}
        <Select
          placeholder={t("filterBar.color")}
          allowClear
          suffixIcon={<DownOutlined className="text-[10px]" />}
          className={selectClassName}
          variant="outlined"
          style={{ borderRadius: "8px" }}
          options={colorsOptions}
          onChange={(val) => handleChange("color", val)}
        />

        {/* نوع الخشب — dropdown from API */}
        <Select
          placeholder={t("filterBar.woodType")}
          allowClear
          suffixIcon={<DownOutlined className="text-[10px]" />}
          className={selectClassName}
          variant="outlined"
          style={{ borderRadius: "8px" }}
          options={woodTypeOptions}
          onChange={(val) => handleChange("wood_type_id", val)}
        />

        {/* نوع المنتج — dropdown from API */}
        <Select
          placeholder={t("filterBar.productType")}
          allowClear
          suffixIcon={<DownOutlined className="text-[10px]" />}
          className={selectClassName}
          variant="outlined"
          style={{ borderRadius: "8px" }}
          options={productTypeOptions}
          onChange={(val) => handleChange("product_type_id", val)}
        />
        {/* نوع المنتج — dropdown from API */}
        <Select
          placeholder={t("filterBar.style")}
          allowClear
          suffixIcon={<DownOutlined className="text-[10px]" />}
          className={selectClassName}
          variant="outlined"
          style={{ borderRadius: "8px" }}
          options={styleOptions}
          onChange={(val) => handleChange("subcategory_id", val)}
        />

        {/* Filter icon button */}
        <button className="flex items-center justify-center w-20 md:w-10 h-10 bg-secondary rounded-md text-white hover:bg-secondary/90 transition-colors cursor-pointer flex-shrink-0">
          <SlidersHorizontal size={20} />
        </button>
      </div>
    </ConfigProvider>
  );
};
