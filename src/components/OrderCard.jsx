import React, { useState } from "react";
import {
  Eye,
  Repeat2,
  ChevronDown,
  ChevronUp,
  MapPin,
  User,
  CreditCard,
  FileText,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button.jsx";
import { ImageWithFallback } from "./ui/ImageWithFallback.jsx";

export const OrderCard = ({ order, showTracking = true }) => {
  const { t, i18n } = useTranslation();
  const [showFullDetails, setShowFullDetails] = useState(false);

  // Format creation date
  const orderDate = order.created_at
    ? new Date(order.created_at).toLocaleDateString(
        i18n.language === "ar" ? "ar-EG" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      )
    : t("common.notAvailable");

  return (
    <div className="border border-light-gray rounded-xl p-4 sm:p-6 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* القسم العلوي - معلومات الطلب */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-light-gray">
        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16 w-full sm:w-auto">
          <InfoItem title={`${t("cart.orderDate")} :`} value={orderDate} />
          <InfoItem
            title={`${t("cart.orderNumber")} :`}
            value={`#${order.order_number}`}
          />
          <InfoItem
            title={`${t("cart.total")} :`}
            value={`${order.total} ${t("product.currency")}`}
          />
          <InfoItem
            title={`${t("cart.shippedTo")} :`}
            value={order.shipping?.city || t("common.notAvailable")}
          />
        </div>
        <div className="flex flex-row gap-3 sm:gap-4 items-center w-full lg:w-auto justify-start sm:justify-end ">
          {showTracking && (
            <Link
              to={`/orders/${order.id}`}
              className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors"
            >
              <Eye size={20} />
              <span className="text-xs sm:text-sm font-medium">
                {t("orderTrack.title")}
              </span>
            </Link>
          )}
          <Button
            variant="status"
            size="sm"
            className="whitespace-nowrap self-start sm:self-auto rounded-lg"
          >
            {order.tracking_label || order.status}
          </Button>
        </div>
      </div>

      {/* القسم الأوسط - قائمة المنتجات */}
      <div className="flex flex-col gap-6">
        {order.items?.map((item, index) => (
          <OrderProductCard
            key={`${order.id}-${item.product_id}-${index}`}
            item={item}
            orderId={order.id}
            showTracking={showTracking}
          />
        ))}
      </div>

      {/* RATIONALE: Displaying all returned details (Billing, Shipping, payment status, subtotal breakdowns, and notes) as collapsible drawer panel inside the card for premium user dashboard experience */}
      {showFullDetails && (
        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-secondary/5 border border-secondary/10 flex flex-col gap-5 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-cairo">
            {/* 1. Shipping Details */}
            <div className="flex flex-col gap-2">
              <p className="font-bold text-dark flex items-center gap-2 border-b border-secondary/15 pb-1.5">
                <MapPin size={16} className="text-secondary flex-shrink-0" />
                {t("orders.shippingAddress")}
              </p>
              <div className="text-dark-gray text-xs sm:text-sm space-y-1">
                <p>
                  <span className="text-gray-400">{t("orders.fullName")}:</span>{" "}
                  <span className="font-medium text-dark">
                    {order.shipping?.full_name || t("common.notAvailable")}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">{t("cart.phone")}:</span>{" "}
                  <span className="font-medium text-dark">
                    {order.shipping?.phone || t("common.notAvailable")}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">{t("forms.cityLabel")}:</span>{" "}
                  <span className="font-medium text-dark">
                    {order.shipping?.city || t("common.notAvailable")}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">{t("forms.areaLabel")}:</span>{" "}
                  <span className="font-medium text-dark">
                    {order.shipping?.area || t("common.notAvailable")}
                  </span>
                </p>
                <p className="break-words">
                  <span className="text-gray-400">
                    {t("forms.addressDetailsLabel")}:
                  </span>{" "}
                  <span className="font-medium text-dark">
                    {order.shipping?.address || t("common.notAvailable")}
                  </span>
                </p>
              </div>
            </div>

            {/* 2. Billing Details */}
            <div className="flex flex-col gap-2">
              <p className="font-bold text-dark flex items-center gap-2 border-b border-secondary/15 pb-1.5">
                <User size={16} className="text-secondary flex-shrink-0" />
                {t("cart.billingDetails")}
              </p>
              <div className="text-dark-gray text-xs sm:text-sm space-y-1">
                <p>
                  <span className="text-gray-400">{t("orders.fullName")}:</span>{" "}
                  <span className="font-medium text-dark">
                    {order.billing?.name || t("common.notAvailable")}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">{t("common.email")}:</span>{" "}
                  <span className="font-medium text-dark break-all">
                    {order.billing?.email || t("common.notAvailable")}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">{t("cart.phone")}:</span>{" "}
                  <span className="font-medium text-dark">
                    {order.billing?.phone || t("common.notAvailable")}
                  </span>
                </p>
                {order.billing?.phone2 && (
                  <p>
                    <span className="text-gray-400">
                      {t("forms.phoneExtraLabel")}:
                    </span>{" "}
                    <span className="font-medium text-dark">
                      {order.billing.phone2}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* 3. Payment & Notes */}
            <div className="flex flex-col gap-2">
              <p className="font-bold text-dark flex items-center gap-2 border-b border-secondary/15 pb-1.5">
                <CreditCard
                  size={16}
                  className="text-secondary flex-shrink-0"
                />
                {t("orders.paymentMethod")} & {t("orders.paymentStatus")}
              </p>
              <div className="text-dark-gray text-xs sm:text-sm space-y-2">
                <p>
                  <span className="text-gray-400">
                    {t("orders.paymentMethod")}:
                  </span>{" "}
                  <span className="font-medium text-dark bg-gray-200/60 px-2 py-0.5 rounded text-xs">
                    {t(
                      `orders.methods.${order.payment_method}`,
                      order.payment_method,
                    )}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">
                    {t("orders.paymentStatus")}:
                  </span>{" "}
                  <span
                    className={`font-semibold px-2 py-0.5 rounded text-xs ${
                      order.payment_status === "paid"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : order.payment_status === "pending"
                          ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    {t(
                      `orders.status.${order.payment_status}`,
                      order.payment_status,
                    )}
                  </span>
                </p>
                {order.notes && (
                  <div className="mt-2 p-2 rounded bg-white border border-gray-150 text-xs text-dark-gray">
                    <p className="font-semibold text-gray-500 mb-0.5 flex items-center gap-1">
                      <FileText size={12} className="flex-shrink-0" />
                      {t("orders.notes")}:
                    </p>
                    <p className="break-words">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Totals Breakdown */}
          <div className="border-t border-secondary/10 mt-3 pt-3 flex flex-col gap-1.5 text-xs sm:text-sm font-cairo w-full max-w-xs ml-auto mr-0 rtl:mr-auto rtl:ml-0 bg-white p-3 rounded-lg border border-gray-100">
            <div className="flex justify-between text-gray-500">
              <span>{t("orders.subtotal")}</span>
              <span className="font-semibold text-dark">
                {order.subtotal} {t("orders.sar")}
              </span>
            </div>
            {Number(order.discount) > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>{t("orders.discount")}</span>
                <span>
                  - {order.discount} {t("orders.sar")}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm sm:text-base font-bold text-secondary border-t border-gray-100 pt-2 mt-1">
              <span>{t("orders.total")}</span>
              <span>
                {order.total} {t("orders.sar")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Details Button & Actions */}
      <div className="mt-4 pt-4 border-t border-light-gray flex justify-between items-center flex-wrap gap-3">
        <button
          onClick={() => setShowFullDetails(!showFullDetails)}
          className="flex items-center gap-1 text-xs sm:text-sm font-cairo font-semibold text-secondary hover:underline cursor-pointer"
        >
          {showFullDetails ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
          {showFullDetails
            ? t("orders.hideDetails", "إخفاء التفاصيل")
            : t("orders.showDetails", "عرض التفاصيل بالكامل")}
        </button>

        {/* If unpaid and has payment url, show Pay Now button */}
        {order.payment_status !== "paid" && order.payment_url && (
          <a
            href={order.payment_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm font-cairo"
          >
            <CreditCard size={15} />
            {t("orders.payNow", "إتمام الدفع الآن")}
          </a>
        )}
      </div>
    </div>
  );
};

export const InfoItem = ({ title, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-light-gray text-xs sm:text-sm">{title}</p>
      <p className="text-dark font-medium text-sm sm:text-base">{value}</p>
    </div>
  );
};

// Helper to map color hex codes or English names to user friendly localizations
const getColorFriendlyName = (colorObj, t) => {
  if (!colorObj) return "";
  const name = colorObj.name || "";
  const hex = (colorObj.hex_code || "").toLowerCase();

  // If the name is already a friendly name (doesn't start with #), use it!
  if (name && !name.startsWith("#")) {
    return t(`colors.${name}`, name);
  }

  // Map known hex codes to friendly names
  const hexMap = {
    "#684e31": t("colors.بني غامق", "بني غامق"),
    "#684e30": t("colors.بني غامق", "بني غامق"),
    "#8b5a2b": t("colors.بني", "بني"),
    "#d2b48c": t("colors.بني فاتح", "بني فاتح"),
    "#000000": t("colors.اسود", "أسود"),
    "#ffffff": t("colors.ابيض", "أبيض"),
    "#ff0000": t("colors.احمر", "أحمر"),
    "#0000ff": t("colors.ازرق", "أزرق"),
    "#008000": t("colors.اخضر", "أخضر"),
    "#ffff00": t("colors.اصفر", "أصفر"),
    "#808080": t("colors.رمادي", "رمادي"),
    "#ffc0cb": t("colors.وردي", "وردي"),
  };

  return hexMap[hex] || name || hex || t("common.notAvailable");
};

export const OrderProductCard = ({ item }) => {
  const { t } = useTranslation();

  // RATIONALE: Display color image variant with comprehensive fallbacks, fallback to main image
  const resolvedImage =
    item?.color_image ||
    item?.color_image_path ||
    item?.product?.color?.image_path ||
    item?.product?.color?.image ||
    item?.product?.main_image;

  const colorImageUrl =
    item?.product?.color?.image_path ||
    item?.product?.color?.image ||
    item?.color_image ||
    item?.color_image_path;

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 py-4 border-b border-light-gray last:border-0">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1 w-full">
        {/* Product Image or Premium Fallback */}
        <ImageWithFallback
          src={resolvedImage}
          alt={item.product_name}
          className="w-24 sm:w-24 md:w-32 h-24 sm:h-24 md:h-32 object-cover rounded-lg flex-shrink-0"
        />

        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <h3 className="text-base font-bold text-dark leading-snug">
            {item.product_name}
          </h3>

          {/* RATIONALE: Render selected color variant swatches/labels inside the Order Product list */}
          {item.product?.color && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs text-gray-400 font-cairo">
                {t("cart.color")}:
              </span>
              <div className="flex items-center gap-2 bg-secondary/5 px-2 py-0.5 rounded border border-secondary/10 w-fit">
                {item.product.color.hex_code && (
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: item.product.color.hex_code }}
                  />
                )}
                {/* RATIONALE: Display color variant thumbnail inside the badge to visualize wood texture */}
                {colorImageUrl && (
                  <img
                    src={colorImageUrl}
                    alt=""
                    className="w-5 h-5 rounded border border-secondary/20 object-cover flex-shrink-0"
                  />
                )}
                <span className="text-xs font-semibold text-secondary font-cairo">
                  {getColorFriendlyName(item.product.color, t)}
                </span>
              </div>
            </div>
          )}

          {/* Details Row: Quantity, Unit Price and Subtotal */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-dark-gray mt-1 font-cairo">
            <p>
              <span className="text-gray-400">{t("cart.quantity")}:</span>{" "}
              <span className="font-semibold text-dark">{item.quantity}</span>
            </p>
            <p>
              <span className="text-gray-400">{t("product.price")}:</span>{" "}
              <span className="font-semibold text-dark">
                {item.price} {t("product.currency")}
              </span>
            </p>
            {item.item_total && (
              <p>
                <span className="text-gray-400">{t("cart.itemTotal")}:</span>{" "}
                <span className="font-bold text-secondary">
                  {item.item_total} {t("product.currency")}
                </span>
              </p>
            )}
          </div>

          {/* Original price discount struck out */}
          {item.original_price &&
            parseFloat(item.original_price) !== parseFloat(item.price) && (
              <p className="text-xs text-light-gray line-through font-noto">
                {item.original_price} {t("product.currency")}
              </p>
            )}
        </div>
      </div>
    </div>
  );
};
