import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderServices } from "../../api/services/orders.api";
import { useTranslation } from "react-i18next";

// Re-fetch list every 30 seconds so status changes from dashboard appear automatically
export const useGetMyOrders = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["my-orders", lang],
    queryFn: () => orderServices.getMyOrders(lang),
    staleTime: 0,
    refetchInterval: 30_000, // poll every 30s
    refetchOnWindowFocus: true, // refetch when user switches back to tab
  });
};

// Re-fetch order details every 15 seconds (more frequent — user is watching the status)
export const useTrackOrder = (orderId) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["track-order", orderId, lang],
    queryFn: () => orderServices.trackOrder(orderId, lang),
    staleTime: 0,
    refetchInterval: 15_000, // poll every 15s
    refetchOnWindowFocus: true,
    enabled: !!orderId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => orderServices.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-orders"]);
      queryClient.invalidateQueries(["cart"]);
    },
  });
};
