import React, { useContext } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import { useAuth } from "../hooks/useAuth.js";
import { useRequireAuth } from "../hooks/useRequireAuth.js";
import { IoBookmark } from "react-icons/io5";
import { SavedProductContext, CartDrawerContext } from "../context/createContextRef.js";
import { useCartMutations } from "../hooks/queries/useCart.js";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { cardItem, hoverScale } from "../utils/animations.js";
import { CiBookmark } from "react-icons/ci";
import { useTranslation } from "react-i18next";

import { ImageWithFallback } from "./ui/ImageWithFallback.jsx";

export const ProductCard = React.memo(function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { requireAuth } = useRequireAuth();
  const { isSaved, toggleSaved } = useContext(SavedProductContext);
  const { openDrawer } = useContext(CartDrawerContext);
  const { addToCart } = useCartMutations();
  const { t } = useTranslation();

  const saved = isSaved(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    requireAuth(() => {
      addToCart.mutate(
        { productId: product.id, quantity: 1 },
        {
          onSuccess: () => {
            openDrawer();
          },
          onError: () => {
            toast.error(t("product.addToCartError"));
          },
        },
      );
    });
  };

  const handleToggleBookmark = (e) => {
    e.stopPropagation();
    requireAuth(() => {
      toggleSaved(product.id);
    });
  };

  const handleCardClick = () => {
    navigate(`/productsdetails/${product.id}`);
  };

  return (
    <motion.div
      variants={cardItem}
      whileHover={hoverScale}
      // whileTap={tapScale}
      className="max-w-[370px] mx-auto w-full group cursor-pointer p-3 "
      onClick={handleCardClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f5f5f5]">
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-primary/80 text-white px-4 py-1 rounded-bl-2xl backdrop-blur-sm text-sm md:text-base">
            {t("product.bestSelling")}
          </div>
        </div>

        <ImageWithFallback
          src={product.main_image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="mt-4 space-y-2 px-1">
        <div className="flex items-center justify-between gap-1 text-gray-500 text-sm cursor-pointer">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-sans pt-1">{product.average_rating}</span>
          </div>
          <div className="rounded-full p-1">
            {saved ? (
              <IoBookmark
                size={25}
                onClick={handleToggleBookmark}
                className="text-secondary transition-transform active:scale-75"
              />
            ) : (
              <CiBookmark
                size={25}
                onClick={handleToggleBookmark}
                className="text-secondary transition-transform active:scale-75"
              />
            )}
          </div>
        </div>

        <h3 className="text-xl text-dark-gray font-medium leading-tight">
          {product.name}
        </h3>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-baseline gap-2 font-noto">
            {product.has_discount && (
              <div className="flex items-baseline gap-1 text-gray-400 line-through decoration-gray-400">
                <span>
                  {product.original_price} {t("product.currency")}
                </span>
              </div>
            )}
            {product.has_discount ? (
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-red-600">
                  {product.price}
                </span>
                <span className="text-red-600 text-lg font-bold">
                  {t("product.currency")}
                </span>
                {product.discount_percent && (
                  <div className="bg-red-100 text-red-600 font-semibold p-2 rounded-full">
                    <p className="text-xs text-center pb-1">
                      -{product.discount_percent}%
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-baseline gap-1 text-secondary">
                <span className="text-2xl md:text-3xl font-bold">
                  {product.price}
                </span>
                <span className="text-lg font-bold">
                  {t("product.currency")}
                </span>
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-light-gray/30 p-3 rounded-full hover:bg-secondary/10 transition-colors group/btn"
            onClick={handleAddToCart}
          >
            <ShoppingCart
              color="var(--color-primary)"
              className="w-6 h-6 group-hover/btn:scale-110 transition-transform"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});
