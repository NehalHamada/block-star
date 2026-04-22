import WebFont from "webfontloader";

/**
 * Load a Google Font dynamically
 * @param {string} font - The font family name to load
 * @returns {Promise} - Promise that resolves when the font is loaded
 */
export const loadFont = (font) =>
  new Promise((resolve) => {
    WebFont.load({
      google: {
        families: [font],
      },
      active: resolve,
    });
  });
