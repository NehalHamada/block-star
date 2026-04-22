import { DesignCanvas } from "./DesignCanvas";
import { FormSelect } from "./FormSelect";
import { FormInput } from "./FormInput";
import { ColorPicker } from "./ColorPicker";
import { Button } from "../ui";
import { useTranslation } from "react-i18next";

export function DesignEditingForm({
  formData,
  canvasSize,
  isFormValid,
  productTypeOptions,
  woodTypeOptions,
  fontOptions,
  onCanvasReady,
  onInputChange,
  onConfirm,
}) {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Canvas Area */}
        <div className="mb-6 md:mb-8 flex justify-center">
          <DesignCanvas onReady={onCanvasReady} size={canvasSize} />
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
          <FormSelect
            label={t("studio.chooseProductType")}
            value={formData.productType}
            onChange={(value) => onInputChange("productType", value)}
            options={productTypeOptions}
          />

          <FormInput
            label={t("studio.enterSize")}
            value={formData.size}
            onChange={(value) => onInputChange("size", value)}
            placeholder={t("studio.sizeExample")}
          />

          <ColorPicker
            label={t("studio.chooseColor")}
            value={formData.color}
            onChange={(value) => onInputChange("color", value)}
          />

          <ColorPicker
            label={t("studio.chooseTextColor")}
            value={formData.textColor}
            onChange={(value) => onInputChange("textColor", value)}
          />
          <FormSelect
            label={t("studio.chooseWoodType")}
            value={formData.woodType}
            onChange={(value) => onInputChange("woodType", value)}
            options={woodTypeOptions}
          />
          <FormSelect
            label={t("studio.chooseFont")}
            value={formData.font}
            onChange={(value) => onInputChange("font", value)}
            options={fontOptions}
          />
          {/* Text Input and Font Selection */}
          <FormInput
            label={t("studio.enterText")}
            value={formData.text}
            onChange={(value) => onInputChange("text", value)}
            placeholder={t("studio.enterText")}
            maxLength={300}
            showCounter
            multiline
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6 md:mt-8 px-4">
          <Button
            onClick={onConfirm}
            disabled={!isFormValid}
            className={`py-3 px-12 md:px-16 rounded-full text-base md:text-lg transition shadow-sm w-full md:w-auto ${
              isFormValid
                ? "bg-secondary hover:bg-secondary/90 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {t("studio.confirmDesign")}
          </Button>
        </div>
      </div>
    </div>
  );
}
