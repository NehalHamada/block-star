import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import savedProductService from "../api/services/savedProduct.api.js";
import { SavedProductContext } from "./createContextRef.js";
import { toast } from "react-toastify";

export default function SavedProductContextProvider({ children }) {
  // Set of saved product IDs for O(1) lookup
  const [savedIds, setSavedIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const token = localStorage.getItem("userToken");

  // Fetch saved products whenever the user is authenticated
  useEffect(() => {
    if (!token) {
      setSavedIds(new Set());
      return;
    }

    setIsLoading(true);
    savedProductService
      .getSavedProducts()
      .then((res) => {
        const products = res?.data?.data ?? [];
        setSavedIds(new Set(products.map((p) => p.id)));
      })
      .catch(() => {
        // If fetch fails, start with empty set — UI degrades gracefully
        setSavedIds(new Set());
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  /** Returns true if the given product ID is currently saved */
  const isSaved = useCallback(
    (productId) => savedIds.has(productId),
    [savedIds],
  );

  /**
   * Optimistically toggles the saved state:
   * 1. Immediately flip the local Set.
   * 2. Call the API in the background.
   * 3. If the API fails, roll back to the previous state.
   */
  const toggleSaved = useCallback(
    async (productId) => {
      if (!token) return;

      const wasSaved = savedIds.has(productId);

      // Optimistic update — instant UI change
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (wasSaved) {
          next.delete(productId);
        } else {
          next.add(productId);
        }
        return next;
      });

      try {
        await savedProductService.toggleSavedProduct(productId);

        // Notify React Query to refresh the saved products list
        queryClient.invalidateQueries({ queryKey: ["saved-products"] });

        if (wasSaved) {
          toast.success("تم إلغاء حفظ المنتج");
        } else {
          toast.success("تم حفظ المنتج");
        }
      } catch {
        // Roll back on failure
        setSavedIds((prev) => {
          const next = new Set(prev);
          if (wasSaved) {
            next.add(productId);
          } else {
            next.delete(productId);
          }
          return next;
        });
      }
    },
    [savedIds, token, queryClient],
  );

  return (
    <SavedProductContext.Provider value={{ isSaved, toggleSaved, isLoading }}>
      {children}
    </SavedProductContext.Provider>
  );
}
