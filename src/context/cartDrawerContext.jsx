import { useState, useCallback } from "react";
import { CartDrawerContext } from "./createContextRef.js";

export function CartDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return (
    <CartDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
    </CartDrawerContext.Provider>
  );
}
