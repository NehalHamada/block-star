import { useContext } from "react";
import { SavedProductContext } from "./createContextRef.js";

export const useSavedProductContext = () => {
  const ctx = useContext(SavedProductContext);
  if (!ctx)
    throw new Error(
      "useSavedProductContext must be used inside SavedProductContextProvider",
    );
  return ctx;
};
