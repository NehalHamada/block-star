import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DesignEditingForm } from "./DesignEditingForm";
import { DesignConfirmation } from "./DesignConfirmation";
import { DesignSuccessModal } from "./DesignSuccessModal";
import { useCanvasOperations } from "./hooks/useCanvasOperations";
import { getFontOptions, canvasSizes } from "./constants/designFormOptions.jsx";
import { useTranslation } from "react-i18next";
import { loadFont } from "../../utils/utils";
import {
  useGetProductTypes,
  useGetWoodTypes,
} from "../../hooks/queries/useProducts.js";

/**
 * Main component for the custom design page
 * Allows users to create custom designs on canvas and add them to cart
 */
export function DesignPageByYourSelf({ onStepChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: productTypes } = useGetProductTypes();
  const { data: woodTypes } = useGetWoodTypes();

  const productTypeOptions = (productTypes?.data ?? []).map((t) => ({
    value: t.id,
    label: t.name,
  }));
  const woodTypeOptions = (woodTypes?.data ?? []).map((t) => ({
    value: t.id,
    label: t.name,
  }));

  // State management
  const [canvas, setCanvas] = useState(null);
  const [textObj, setTextObj] = useState(null);
  const [step, setStep] = useState("editing"); // 'editing' or 'confirming'
  const [capturedImage, setCapturedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productType: "",
    size: "30x30",
    woodType: "",
    color: "#ffffff",
    textColor: "#000000",
    text: "",
    font: "Cairo",
  });

  // Load fonts on mount
  useEffect(() => {
    ["Cairo", "Amiri", "Tajawal"].forEach(loadFont);
  }, []);

  // Canvas operations hook
  const {
    changeSize,
    changeBackground,
    updateText,
    changeFont,
    changeTextColor,
    captureCanvas,
  } = useCanvasOperations(canvas, textObj, setTextObj, formData);

  // Memoized canvas size dimensions
  const canvasSize = useMemo(() => {
    // Parse size string like "30x40" or "30 * 40"
    const parts = formData.size.split(/[x*]/).map((s) => s.trim());
    if (parts.length === 2) {
      const width = parseInt(parts[0], 10);
      const height = parseInt(parts[1], 10);
      if (!isNaN(width) && !isNaN(height)) {
        return { width: width * 10, height: height * 10 };
      }
    }
    return canvasSizes[formData.size] || canvasSizes["30x30"];
  }, [formData.size]);

  // Check if form is valid (user has made selections)
  const isFormValid = useMemo(() => {
    return (
      formData.productType !== "" &&
      formData.woodType !== "" &&
      (formData.text.trim() !== "" || canvas?.getObjects().length > 0)
    );
  }, [formData.productType, formData.woodType, formData.text, canvas]);

  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Apply changes based on field
      switch (field) {
        case "size":
          changeSize(value);
          break;
        case "color":
          changeBackground(value);
          break;
        case "textColor":
          changeTextColor(value);
          break;
        case "text":
          updateText(value);
          break;
        case "font":
          changeFont(value);
          break;
        default:
          break;
      }
    },
    [changeSize, changeBackground, changeTextColor, updateText, changeFont],
  );

  /* ---------- Step Navigation Handlers ---------- */

  /**
   * Capture canvas as image and move to confirmation step
   */
  const handleConfirmDesign = useCallback(() => {
    if (!canvas || !isFormValid) return;

    const imageData = captureCanvas();
    if (!imageData) {
      alert(t("studio.saveError"));
      return;
    }

    setCapturedImage(imageData);
    setStep("confirming");

    // Notify parent component
    if (onStepChange) onStepChange(true);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [canvas, isFormValid, captureCanvas, onStepChange, t]);

  /**
   * Add design to cart and show success modal
   */

  /* ---------- Modal Handlers ---------- */

  /**
   * Close modal and reset form to create another design
   */
  const handleTryAnother = useCallback(() => {
    setIsModalOpen(false);
    setStep("editing");
    setFormData({
      productType: "",
      size: "30x30",
      woodType: "",
      color: "#ffffff",
      textColor: "#000000",
      text: "",
      font: "Cairo",
    });
    setCapturedImage(null);
    setTextObj(null);
    setCanvas(null);

    if (onStepChange) onStepChange(false);
  }, [onStepChange]);

  /**
   * Navigate to products page
   */
  const handleBrowseProducts = useCallback(() => {
    navigate("/categories");
  }, [navigate]);

  /* ---------- Render ---------- */

  // Show confirmation section
  if (step === "confirming") {
    return (
      <React.Fragment>
        <DesignConfirmation
          formData={formData}
          setIsModalOpen={setIsModalOpen}
          capturedImage={capturedImage}
        />
        <DesignSuccessModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTryAnother={handleTryAnother}
          onBrowseProducts={handleBrowseProducts}
        />
      </React.Fragment>
    );
  }

  // Show editing form
  return (
    <DesignEditingForm
      formData={formData}
      canvasSize={canvasSize}
      isFormValid={isFormValid}
      productTypeOptions={productTypeOptions}
      woodTypeOptions={woodTypeOptions}
      fontOptions={getFontOptions(t)}
      onCanvasReady={setCanvas}
      onInputChange={handleInputChange}
      onConfirm={handleConfirmDesign}
    />
  );
}
