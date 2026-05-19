import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

export const PdfModal = ({ isOpen, onClose, pdfUrl, title }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-2 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="bg-white rounded-xl sm:rounded-xl w-full max-w-5xl h-[90vh] sm:h-[85vh] shadow-2xl pointer-events-auto flex flex-col overflow-hidden border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg font-cairo leading-none">
                      {title || t("product.catalog")}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Download Button */}
                  <a
                    href={pdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all text-xs sm:text-sm font-cairo cursor-pointer"
                  >
                    <Download size={16} />
                    <span className="hidden sm:inline">
                      {t("common.download", "تحميل")}
                    </span>
                  </a>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* PDF Content */}
              <div className="flex-1 bg-gray-100 relative p-1 sm:p-2">
                <iframe
                  src={`${pdfUrl}#toolbar=1`}
                  className="w-full h-full rounded-xl border-0 bg-white"
                  title="PDF Viewer"
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
