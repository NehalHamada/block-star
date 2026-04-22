import { Eye, Repeat2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button.jsx";

export const OrderCard = ({ order, showTracking = true }) => {
  const { t, i18n } = useTranslation();
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
    <div className="border border-light-gray rounded-2xl p-4 sm:p-6 mb-4">
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

export const OrderProductCard = ({ item }) => {
  const { t } = useTranslation();
  const productImage =
    item?.product?.main_image || "https://placehold.co/400x400?text=Product";

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 py-4 border-b border-light-gray last:border-0">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1 w-full">
        <img
          src={productImage}
          alt={item.product_name}
          className="w-full sm:w-24 md:w-32 h-48 sm:h-24 md:h-32 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-dark">
            {item.product_name}
          </h3>
          <div className="flex gap-4 text-xs sm:text-sm text-dark-gray">
            <p>
              {t("cart.quantity")}: {item.quantity}
            </p>
            <p>
              {t("product.price")}: {item.price} {t("product.currency")}
            </p>
          </div>
          {item.original_price && (
            <p className="text-xs text-light-gray line-through">
              {item.original_price} {t("product.currency")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
