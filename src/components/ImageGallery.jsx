import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export function ImageGallery({ images = [] }) {
  const { t } = useTranslation();

  if (images.length === 0) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-dark-gray text-lg">{t("product.noUsageIdeas")}</p>
      </div>
    );
  }

  // Get up to 6 images for the bento layout
  const displayImages = images.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full"
    >
      {/* Bento Grid Layout (Desktop) */}
      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px]">
        {/* Large featured item */}
        {displayImages[0] && (
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl cursor-pointer"
          >
            <img
              src={displayImages[0].image_path}
              alt={t("product.galleryImage")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        )}

        {/* Medium items */}
        {displayImages[1] && (
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer"
          >
            <img
              src={displayImages[1].image_path}
              alt={t("product.galleryImage")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        )}

        {displayImages[2] && (
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer"
          >
            <img
              src={displayImages[2].image_path}
              alt={t("product.galleryImage")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        )}

        {/* Small items at bottom */}
        {displayImages[3] && (
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer"
          >
            <img
              src={displayImages[3].image_path}
              alt={t("product.galleryImage")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        )}

        {displayImages[4] && (
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer"
          >
            <img
              src={displayImages[4].image_path}
              alt={t("product.galleryImage")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {displayImages.map((image, index) => (
          <motion.div
            key={image.id || index}
            variants={itemVariants}
            className="aspect-square relative overflow-hidden rounded-2xl"
          >
            <img
              src={image.image_path}
              alt={`${t("product.galleryImage")} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
