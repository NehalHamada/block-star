import { useContext } from "react";
import LanguageContext from "./LanguageContext.jsx";

/**
 * Hook to access the current language state and toggle function.
 * Must be used inside LanguageContextProvider.
 */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used inside LanguageContextProvider");
  return ctx;
}
