/**
 * Form options for the Design Page
 * Contains all dropdown and selection options for the design form
 */

export const getFontOptions = (t) => [
  // ===== كلاسيك / تراثي =====
  {
    value: "Cairo",
    label: (
      <span style={{ fontFamily: "Cairo" }}>
        Cairo – {t("studio.fonts.classic")}
      </span>
    ),
  },
  {
    value: "Amiri",
    label: (
      <span style={{ fontFamily: "Amiri" }}>
        Amiri – {t("studio.fonts.heritage")}
      </span>
    ),
  },
  {
    value: "Lateef",
    label: (
      <span style={{ fontFamily: "Lateef" }}>
        Lateef – {t("studio.fonts.soft")}
      </span>
    ),
  },
  {
    value: "Scheherazade New",
    label: (
      <span style={{ fontFamily: "Scheherazade New" }}>
        Scheherazade – {t("studio.fonts.mushaf")}
      </span>
    ),
  },

  // ===== مودرن / معاصر =====
  {
    value: "Tajawal",
    label: (
      <span style={{ fontFamily: "Tajawal" }}>
        Tajawal – {t("studio.fonts.modern")}
      </span>
    ),
  },
  {
    value: "Changa",
    label: (
      <span style={{ fontFamily: "Changa" }}>
        Changa – {t("studio.fonts.strong")}
      </span>
    ),
  },
  {
    value: "IBM Plex Sans Arabic",
    label: (
      <span style={{ fontFamily: "IBM Plex Sans Arabic" }}>
        IBM Plex – {t("studio.fonts.professional")}
      </span>
    ),
  },
  {
    value: "Noto Kufi Arabic",
    label: (
      <span style={{ fontFamily: "Noto Kufi Arabic" }}>
        Noto Kufi – {t("studio.fonts.balanced")}
      </span>
    ),
  },

  // ===== كوفي / زخرفي =====
  {
    value: "Reem Kufi",
    label: (
      <span style={{ fontFamily: "Reem Kufi" }}>
        Reem Kufi – {t("studio.fonts.kufi")}
      </span>
    ),
  },
  // {
  //   value: "El Messiri",
  //   label: (
  //     <span style={{ fontFamily: "El Messiri" }}>
  //       El Messiri – {t("studio.fonts.decorative")}
  //     </span>
  //   ),
  // },
  {
    value: "Aref Ruqaa",
    label: (
      <span style={{ fontFamily: "Aref Ruqaa" }}>
        Aref Ruqaa – {t("studio.fonts.ruqaa")}
      </span>
    ),
  },

  // ===== يدوي / فني =====
  {
    value: "Rakkas",
    label: (
      <span style={{ fontFamily: "Rakkas" }}>
        Rakkas – {t("studio.fonts.artistic")}
      </span>
    ),
  },
  // {
  //   value: "Lemonada",
  //   label: (
  //     <span style={{ fontFamily: "Lemonada" }}>
  //       Lemonada – {t("studio.fonts.fun")}
  //     </span>
  //   ),
  // },
  {
    value: "Harmattan",
    label: (
      <span style={{ fontFamily: "Harmattan" }}>
        Harmattan – {t("studio.fonts.light")}
      </span>
    ),
  },
];

/**
 * Canvas size dimensions mapping
 */
export const canvasSizes = {
  "20x30": { width: 200, height: 300 },
  "30x20": { width: 300, height: 200 },
  "30x30": { width: 300, height: 300 },
};
