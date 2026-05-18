import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../../api/services/cart.api.js";
import { useTranslation } from "react-i18next";

export const useCart = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["cart", lang],
    queryFn: () => cartService.getCart(lang),
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
};
// export const useAddToCart = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ productId, quantity }) =>
//       cartService.addToCart(productId, quantity),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });
// };

// export const useRemoveFromCart = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (productId) => cartService.removeFromCart(productId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });
// };

// export const useUpdateCart = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ productId, quantity }) =>
//       cartService.updateCart(productId, quantity),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });
// };

// export const useClearCart = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: () => cartService.clearCart(),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });
// };

// export const useAddCoupon = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (couponCode) => cartService.addCoupon(couponCode),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });
// };

// export const useRemoveCoupon = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: () => cartService.removeCoupon(),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });
// };

export const useCartMutations = () => {
  const queryClient = useQueryClient();

  const addToCart = useMutation({
    mutationFn: ({ productId, quantity, productColorId }) =>
      cartService.addToCart(productId, quantity, productColorId),
    onMutate: async ({ productId, quantity, productColorId }) => {
      await queryClient.cancelQueries(["cart"]);
      const previousCart = queryClient.getQueryData(["cart"]);
      queryClient.setQueryData(["cart"], (old) => {
        const currentData = old?.data || {};
        const items = Array.isArray(currentData.items) ? currentData.items : [];
        return {
          ...old,
          data: {
            ...currentData,
            items: [
              ...items,
              {
                product_id: productId,
                quantity,
                // RATIONALE: Optimistically include product_color_id if defined for immediate UI reactivity
                ...(productColorId && { product_color_id: productColorId }),
              },
            ],
          },
        };
      });
      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(["cart"], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const removeFromCart = useMutation({
    mutationFn: (productId) => cartService.removeFromCart(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries(["cart"]);
      const previousCart = queryClient.getQueryData(["cart"]);
      queryClient.setQueryData(["cart"], (old) => {
        const currentData = old?.data || {};
        const items = Array.isArray(currentData.items) ? currentData.items : [];
        return {
          ...old,
          data: {
            ...currentData,
            items: items.filter((item) => item.product_id !== productId),
          },
        };
      });
      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(["cart"], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const updateCart = useMutation({
    mutationFn: ({ productId, quantity }) =>
      cartService.updateCart(productId, quantity),
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries(["cart"]);
      const previousCart = queryClient.getQueryData(["cart"]);
      queryClient.setQueryData(["cart"], (old) => {
        const currentData = old?.data || {};
        const items = Array.isArray(currentData.items) ? currentData.items : [];
        return {
          ...old,
          data: {
            ...currentData,
            items: items.map((item) =>
              item.product_id === productId ? { ...item, quantity } : item,
            ),
          },
        };
      });
      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(["cart"], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const clearCart = useMutation({
    mutationFn: () => cartService.clearCart(),
    onMutate: async () => {
      await queryClient.cancelQueries(["cart"]);
      const previousCart = queryClient.getQueryData(["cart"]);
      queryClient.setQueryData(["cart"], { items: [] });
      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(["cart"], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const addCoupon = useMutation({
    mutationFn: (couponCode) => cartService.addCoupon(couponCode),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const removeCoupon = useMutation({
    mutationFn: () => cartService.removeCoupon(),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  return {
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
    addCoupon,
    removeCoupon,
  };
};
