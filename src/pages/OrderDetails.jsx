import { Header, OrderCard, TrackingOrderComponent, SkeletonLoader } from "../components";
import { useParams, Link } from "react-router-dom";
import { useTrackOrder } from "../hooks/queries/useOrders.js";
import { useTranslation } from "react-i18next";

// Map API tracking_status to step index for TrackingOrderComponent
const trackingStatusToStep = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  ready: 3,
  shipped: 4,
  delivered: 5,
};

export function OrderDetails() {
  const { orderId } = useParams();
  const { t, i18n } = useTranslation();
  const { data, isLoading, isError } = useTrackOrder(orderId);

  const paymentLabels = {
    cash_on_delivery: t("orders.methods.cash_on_delivery"),
    credit_card: t("orders.methods.credit_card"),
    online: t("orders.methods.online"),
  };

  const paymentStatusLabels = {
    pending: t("orders.status.pending"),
    paid: t("orders.status.paid"),
    failed: t("orders.status.failed"),
  };

  const breadcrumbs = [
    { label: t("common.home"), path: "/" },
    { label: t("profile.orders"), path: "/orders" },
    { label: t("orders.details"), path: null },
  ];

  if (isLoading) {
    return (
      <div className="w-full">
        <Header breadcrumbs={breadcrumbs} />
        <SkeletonLoader variant="order" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="w-full">
        <Header breadcrumbs={breadcrumbs} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
          <div className="flex flex-col gap-5 items-center justify-center py-20">
            <p className="text-2xl font-bold text-dark-gray">
              {t("orders.orderNotFound")}
            </p>
            <Link to="/orders" className="text-secondary hover:underline">
              {t("orders.backToOrders")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const order = data.data;
  const currentStep = trackingStatusToStep[order.tracking_status] ?? 0;

  const orderDate = order.created_at
    ? new Date(order.created_at).toLocaleDateString(i18n.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : t("common.notAvailable");

  const orderInformation = [
    { id: 1, label: t("orders.orderDate"), value: orderDate },
    { id: 2, label: t("orders.orderNumber"), value: `#${order.order_number}` },
    {
      id: 3,
      label: t("orders.fullName"),
      value: order.billing?.name || t("common.notAvailable"),
    },
    {
      id: 4,
      label: t("common.email"),
      value: order.billing?.email || t("common.notAvailable"),
    },
    {
      id: 5,
      label: t("cart.phone"),
      value: order.billing?.phone || t("common.notAvailable"),
    },
    {
      id: 6,
      label: t("orders.shippingAddress"),
      value: order.shipping
        ? `${order.shipping.city} - ${order.shipping.area} - ${order.shipping.address}`
        : t("common.notAvailable"),
    },
    {
      id: 7,
      label: t("orders.paymentMethod"),
      value: paymentLabels[order.payment_method] || order.payment_method,
    },
    {
      id: 8,
      label: t("orders.paymentStatus"),
      value: paymentStatusLabels[order.payment_status] || order.payment_status,
    },
    {
      id: 9,
      label: t("orders.notes"),
      value: order.notes || t("orders.noNotes"),
    },
  ];

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        {/* Page Title */}
        <div className="flex flex-col gap-3 items-center justify-center py-5 mb-5">
          <p className="text-3xl font-bold font-noto">
            {t("orders.trackOrder")}
          </p>
          <p className="max-w-2xl text-center text-lg text-dark-gray">
            {order.tracking_label}
          </p>
        </div>

        {/* Order Summary Card */}
        <OrderCard order={order} showTracking={false} />

        {/* Tracking Steps */}
        {order.tracking_status === "cancelled" ? (
          <div className="my-8 max-w-5xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 text-xl font-bold font-cairo">
              {t("orders.orderCancelled")}
            </p>
          </div>
        ) : (
          <TrackingOrderComponent currentStep={currentStep} />
        )}

        {/* Order Information */}
        <div className="bg-secondary/10 rounded-2xl p-4 sm:p-8 max-w-5xl mx-auto mt-10">
          <p className="text-xl font-semibold underline mb-5">
            {t("orders.orderInfo")}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {orderInformation.map((info) => (
              <div key={info.id} className="flex flex-col gap-1">
                <p className="font-medium text-sm sm:text-base">{info.label}</p>
                <p className="text-xs sm:text-sm text-dark-gray break-words">
                  {info.value}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-secondary/20 mt-6 pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-dark-gray">{t("orders.subtotal")}</span>
              <span className="font-medium">
                {order.subtotal} {t("orders.sar")}
              </span>
            </div>
            {Number(order.discount) > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>{t("orders.discount")}</span>
                <span>
                  - {order.discount} {t("orders.sar")}
                </span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold border-t border-secondary/20 pt-2 mt-1">
              <span>{t("orders.total")}</span>
              <span>
                {order.total} {t("orders.sar")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
