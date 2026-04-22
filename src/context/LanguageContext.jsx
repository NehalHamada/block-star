import { createContext, useState, useEffect, useCallback } from "react";
import i18n from "../i18n/index.js";

const LanguageContext = createContext(null);

export function LanguageContextProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "ar",
  );

  const isRTL = language === "ar";

  // Keep document attributes and i18n in sync
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  }, [language, isRTL]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
