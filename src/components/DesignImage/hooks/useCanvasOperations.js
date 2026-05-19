import { useCallback } from "react";
import * as fabric from "fabric";
import { loadFont } from "../../../utils/utils";
import { canvasSizes } from "../constants/designFormOptions.jsx";

/**
 * Custom hook for managing canvas operations
 * Handles all fabric.js canvas interactions including size, background, text, and font changes
 */
export function useCanvasOperations(canvas, textObj, setTextObj, formData) {
  /**
   * Shared helper: shrink font size until text fits inside the canvas,
   * then shift the object so it's fully visible.
   */
  const fitTextInCanvas = useCallback(
    (obj) => {
      if (!obj || !canvas) return;

      // obj.height is in LOGICAL space. Divide canvas height by zoom to match.
      const zoom = canvas.getZoom() || 1;
      const ch = canvas.getHeight() / zoom; // logical height

      let fontSize = obj.fontSize;
      while (fontSize > 8) {
        obj.set("fontSize", fontSize);
        obj.initDimensions();
        if (obj.height <= ch * 0.9) break;
        fontSize -= 2;
      }

      obj.setCoords();
    },
    [canvas],
  );

  /**
   * Change canvas size based on selected size option
   */
  const changeSize = useCallback(
    (size) => {
      if (!canvas) return;

      let width = 300;
      let height = 300;

      // Parse size string like "30x40" or "30 * 40"
      const parts = size.split(/[x*]/).map((s) => s.trim());
      if (parts.length === 2) {
        const w = parseInt(parts[0], 10);
        const h = parseInt(parts[1], 10);
        if (!isNaN(w) && !isNaN(h)) {
          width = w * 10;
          height = h * 10;
        }
      } else {
        const dims = canvasSizes[size] || canvasSizes["30x30"];
        width = dims.width;
        height = dims.height;
      }

      canvas.setDimensions({ width, height });

      // Recenter text object if it exists
      if (textObj) {
        textObj.set({
          left: width / 2,
          top: height / 2,
        });
      }

      canvas.renderAll();
    },
    [canvas, textObj],
  );

  /**
   * Change canvas background color
   */
  const changeBackground = useCallback(
    (color) => {
      if (!canvas) return;
      canvas.set("backgroundColor", color);
      canvas.renderAll();
    },
    [canvas],
  );

  /**
   * Update or add text to canvas — also re-fits text in canvas after each keystroke
   */
  const updateText = useCallback(
    async (value) => {
      if (!canvas) return;

      // Logical coords (pre-zoom) — Textbox width & position must be in logical space
      const zoom = canvas.getZoom() || 1;
      const cw = canvas.getWidth()  / zoom; // logical width
      const ch = canvas.getHeight() / zoom; // logical height

      if (!textObj && value) {
        await loadFont(formData.font);

        // Textbox: fixed width → Arabic text wraps automatically, no horizontal overflow
        const text = new fabric.Textbox(value, {
          left: cw / 2,
          top: ch / 2,
          width: cw * 0.9,
          originX: "center",
          originY: "center",
          textAlign: "center",
          fill: formData.textColor || "#000000",
          fontFamily: formData.font,
          fontSize: 40,
          splitByGrapheme: false,
          lockScalingFlip: true,
          lockSkewingX: true,
          lockSkewingY: true,
        });

        canvas.add(text);
        setTextObj(text);
        fitTextInCanvas(text);
        canvas.renderAll();
      } else if (textObj) {
        textObj.set({
          text: value,
          dirty: true,
        });

        textObj.initDimensions();
        fitTextInCanvas(textObj);
        canvas.requestRenderAll();
      }
    },
    [
      canvas,
      textObj,
      formData.font,
      formData.textColor,
      setTextObj,
      fitTextInCanvas,
    ],
  );

  /**
   * Change text font — loads font then re-fits text in canvas
   */
  const changeFont = useCallback(
    async (font) => {
      if (!textObj || !canvas) return;

      await loadFont(font);
      textObj.set("fontFamily", font);
      textObj.initDimensions(); // يعيد حساب عرض النص
      textObj.setCoords();

      fitTextInCanvas(textObj);
      canvas.renderAll();
    },
    [textObj, canvas, fitTextInCanvas],
  );

  /**
   * Change text fill color
   */
  const changeTextColor = useCallback(
    (color) => {
      if (!textObj || !canvas) return;
      textObj.set("fill", color);

      canvas.renderAll();
    },
    [textObj, canvas],
  );

  /**
   * Capture canvas as high-quality image
   */
  const captureCanvas = useCallback(() => {
    if (!canvas) return null;

    try {
      const multiplier = 2 / canvas.getZoom();
      return canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: multiplier,
      });
    } catch (error) {
      return null;
    }
  }, [canvas]);

  return {
    changeSize,
    changeBackground,
    updateText,
    changeFont,
    changeTextColor,
    captureCanvas,
  };
}
