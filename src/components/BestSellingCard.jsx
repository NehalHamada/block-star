import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { cardItem, hoverScale, tapScale } from "../utils/animations.js";
import { ImageWithFallback } from "./ui/ImageWithFallback.jsx";

export const BestSellingCard = React.memo(function BestSellingCard({
  product,
}) {
  const finalPrice = product.discount
    ? product.price - product.discount
    : product.price;

  return (
    <motion.div
      variants={cardItem}
      whileHover={hoverScale}
      whileTap={tapScale}
      className="w-full max-w-85 mx-auto group cursor-pointer font-cairo rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 p-2">
      <div className="relative aspect-4/5 overflow-hidden p-2">
        {product.isBestSeller && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-secondary/60 text-white px-4 py-1.5 rounded-bl-2xl backdrop-blur-sm text-sm font-medium">
              الأكثر مبيعاً
            </div>
          </div>
        )}

        <ImageWithFallback src={product.image} alt={product.title} loading="lazy" />
      </div>

      <div className="p-2 space-y-3 flex flex-col">
        <div className="flex flex-row justify-between items-center gap-1">
          <h3 className="text-lg leading-tight line-clamp-2">
            {product.title}
          </h3>
          <div className="flex  items-center gap-1">
            <span className="text-gray-500 font-sans text-sm pt-0.5">
              {product.rating || "4.8"}
            </span>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <ShoppingCart color="var(--color-primary)" />
          <div className="flex items-baseline gap-2 font-noto">
            {product.discount && (
              <div className="flex items-baseline gap-0.5 text-gray-400 line-through decoration-gray-400 opacity-70">
                <span className="text-lg font-medium">{product.price}</span>
                <span className="text-xs font-bold">ريال</span>
              </div>
            )}

            <div
              className={`flex items-baseline gap-0.5 ${product.discount ? "text-red-600" : "text-primary"}`}>
              <span className="text-2xl md:text-3xl font-bold">
                {finalPrice}
              </span>
              <span className="text-sm font-bold">ريال</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
