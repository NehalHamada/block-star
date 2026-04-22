import React, { useState } from "react";
import { SkeletonLoader } from "../components";
import { useParams } from "react-router-dom";
import {
  Button,
  Header,
  ImageGallery,
  ProductDetailComponent,
  ProductList,
  ReviewSection,
  VideoAboutAs,
} from "../components";
import { FaCarSide, FaSquare } from "react-icons/fa";
import posterImage from "../assets/posterImage.jpg";
import { MessageSquareText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/services/products.api.js";
import { useTranslation } from "react-i18next";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [counter, setCounter] = useState(1);

  const { data: productData, isLoading } = useQuery({
    queryKey: ["product", id, lang],
    queryFn: () => getProductById(id, lang),
    enabled: !!id,
  });

  const product = productData?.data;

  if (isLoading) {
    return <SkeletonLoader variant="product" />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">{t("product.notFound")}</h1>
      </div>
    );
  }

  const breadcrumbs = [
    { label: t("common.home"), path: "/" },
    { label: t("product.breadcrumb"), path: null },
  ];

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16 flex flex-col gap-4 items-center">
        <ProductDetailComponent
          product={product}
          counter={counter}
          setCounter={setCounter}
        />

        {/* Product Features Section */}
        <div className="w-full flex flex-col gap-6 py-8">
          <h2 className="text-center text-2xl font-semibold relative pb-2">
            <span className="relative inline-block">
              {t("product.features")}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features &&
              product.features.map((feature, index) => (
                <FeatureItem key={index} feature={feature} />
              ))}
          </div>

          {/* Product Specifications Section */}
          <h2 className="text-2xl font-semibold relative pb-2 mt-4">
            <span className="inline-block underline">
              {t("product.specifications")}
            </span>
          </h2>

          <div className="w-full flex flex-col gap-3">
            {product.specifications &&
              Object.entries(product.specifications).map(
                ([key, value], index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 p-4 rounded-lg text-lg border border-secondary/10"
                  >
                    <span className="text-dark-gray font-medium">{key}</span>
                    <span className="text-dark-gray">{value}</span>
                  </div>
                ),
              )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 bg-primary text-white p-6 md:p-8 rounded-lg">
        <div className="flex items-center gap-3">
          <FaCarSide size={24} />
          <span className="text-base md:text-lg">
            {t("product.shippingInfo")}
          </span>
        </div>

        {/* Divider - horizontal on mobile, vertical on desktop */}
        <div className="w-full h-0.5 md:w-0.5 md:h-16 bg-secondary"></div>

        <div className="flex items-center gap-3">
          <FaCarSide size={24} />
          <span className="text-base md:text-lg">
            {t("product.returnPolicy")}
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h2 className="text-2xl font-semibold underline mb-6">
          {t("product.watchCloser")}
        </h2>
        {product.videos && product.videos.length > 0 && (
          <VideoAboutAs
            posterImage={posterImage}
            videoSrc={product.videos[0].video_url}
          />
        )}

        {/* Product Showcase Grid */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm h-[400px]">
            <img
              src={transformedProduct.image}
              alt={transformedProduct.name || "منتج"}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col gap-4 col-span-1 sm:col-span-2">
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm h-[193px]">
              <img
                src={
                  transformedProduct.images?.[1]?.image_path ||
                  transformedProduct.image
                }
                alt={`${transformedProduct.name || "منتج"} - عرض 1`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm h-[193px]">
              <img
                src={
                  transformedProduct.images?.[2]?.image_path ||
                  transformedProduct.image
                }
                alt={`${transformedProduct.name || "منتج"} - عرض 2`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div> */}
      </div>

      <div className="max-w-7xl mx-auto my-10 px-4">
        <h2 className="text-2xl font-semibold my-6 underline">
          {" "}
          {t("product.usageIdeas")}
        </h2>
        <ImageGallery images={product.usage_ideas || []} />
      </div>
      <div className="max-w-7xl mx-auto  px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          {t("product.customerReviews")}
        </h2>
        <ReviewSection reviews={product.reviews || []} />
        <div className="w-full flex items-center justify-center">
          <Button
            className=" mx-auto w-full max-w-xs rounded-lg"
            variant="outline"
            onClick={() =>
              navigate("/add-comment", { state: { productId: product.id } })
            }
          >
            <MessageSquareText size={20} />
            {t("product.addComment")}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-10  font-cairo">
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-semibold  text-center ">
            {t("product.similarProducts")}
          </p>
        </div>
        <ProductList products={product.similar_products || []} />
      </div>
    </div>
  );
}

const FeatureItem = ({ feature }) => {
  return (
    <div className="flex items-center gap-3 bg-secondary/10 p-4 rounded-lg text-dark-gray">
      <FaSquare size={5} />
      <span className=" text-base">{feature}</span>
    </div>
  );
};
