import React, { useState } from "react";
import { Header, OrderCard } from "../components";
import { useGetMyOrders } from "../hooks/queries/useOrders.js";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Orders() {
  const [activeTab, setActiveTab] = useState("all");
  const { t } = useTranslation();
  const { data: ordersResponse, isLoading: ordersLoading } = useGetMyOrders();
  const orders = React.useMemo(
    () => ordersResponse?.data?.data || [],
    [ordersResponse],
  );

  const filteredOrders = React.useMemo(() => {
    if (activeTab === "all") return orders;
    if (activeTab === "received") {
      return orders.filter((order) => order.status === "delivered");
    }
    if (activeTab === "cancelled") {
      return orders.filter((order) => order.status === "cancelled");
    }
    return orders;
  }, [orders, activeTab]);

  const breadcrumbs = [
    { label: t("nav.home"), path: "/" },
    { label: t("orders.breadcrumb"), path: null },
  ];

  const tabs = [
    { id: "all", label: t("orders.allOrders") },
    { id: "received", label: t("orders.received") },
    { id: "cancelled", label: t("orders.cancelled") },
  ];

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8">
        <div className="flex flex-col gap-5 items-center justify-center py-5 mb-5">
          <p className="text-3xl font-bold font-noto">{t("orders.title")}</p>
          <p className="max-w-2xl text-center text-lg text-dark-gray">
            {t("orders.subtitle")}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
          <div className="flex flex-row gap-2 rounded-lg p-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 rounded-md cursor-pointer text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-secondary/10 text-secondary shadow-sm"
                    : "bg-transparent text-dark-gray hover:text-dark"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-6">
          {ordersLoading ? (
            <div className="py-20 text-center font-cairo">
              {t("orders.loading")}
            </div>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <p className="text-xl text-dark-gray font-cairo">
                {t("orders.noOrders")}
              </p>
              <Link to="/" className="text-secondary underline font-cairo">
                {t("orders.startShopping")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
