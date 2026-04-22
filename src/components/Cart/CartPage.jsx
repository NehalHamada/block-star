import { Routes, Route, useSearchParams } from "react-router-dom";
import { CartSteps } from "./CartSteps";
import { ShoppingCart } from "./ShoppingCart";
import { Shipping } from "./Shipping";
import { Payment } from "./Payment";
import { CartEmbity } from "./CartEmbity.jsx";
import { useCart } from "../../hooks/queries/useCart.js";
import { SkeletonLoader } from "../SkeletonLoader.jsx";

export const CartPage = () => {
  const { data, isLoading } = useCart();
  const [searchParams] = useSearchParams();

  // General check: any payment gateway redirects back with a "success" param
  const isPaymentCallback = searchParams.has("success");

  if (isLoading && !isPaymentCallback) {
    return <SkeletonLoader variant="cart" />;
  }

  if (!isPaymentCallback && (!data || data?.data?.items?.length === 0)) {
    return <CartEmbity />;
  }

  return (
    <div className="w-full">
      <CartSteps />
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment-success" element={<Payment />} />
      </Routes>
    </div>
  );
};
