import React from "react";
import { Pencil, Trash2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { cardItem } from "../utils/animations.js";

export const HeadlineCard = ({ headline, onEdit, onDelete }) => {
  return (
    <motion.div
      variants={cardItem}
      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.09)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="border border-light-gray rounded-2xl p-4 sm:p-6 transition-shadow"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
        {/* Name and Status */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-dark">
            {headline.full_name}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 items-center">
          <span className="inline-flex items-center justify-center px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium w-fit">
            {headline.type?.name}
          </span>
          <motion.button
            onClick={() => onEdit(headline)}
            whileTap={{ scale: 0.85 }}
            className="p-2 hover:bg-secondary/10 rounded-lg transition-colors"
            aria-label="تعديل العنوان"
          >
            <Pencil size={20} className="text-secondary" />
          </motion.button>
          <motion.button
            onClick={() => onDelete(headline.id)}
            whileTap={{ scale: 0.85 }}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="حذف العنوان"
          >
            <Trash2 size={20} className="text-red-500" />
          </motion.button>
        </div>
      </div>

      {/* Address Details */}
      <div className="flex flex-col gap-2">
        <p className="text-dark-gray text-sm sm:text-base">
          {headline.city} , {headline.area} , {headline.details}
        </p>
        <p className="text-dark-gray text-sm sm:text-base">{headline.phone}</p>
      </div>
    </motion.div>
  );
};
