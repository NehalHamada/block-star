import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button.jsx";

export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText, 
  cancelText,
  isLoading 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl pointer-events-auto relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-50" />
              
              <button
                onClick={onClose}
                className="absolute top-4 end-4 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center mt-2 relative z-10">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 border-4 border-red-100/50">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-cairo">
                  {title}
                </h3>
                
                <p className="text-gray-500 text-sm md:text-base mb-8 font-cairo leading-relaxed">
                  {message}
                </p>

                <div className="flex w-full gap-3 font-cairo">
                  <Button 
                    variant="outline" 
                    className="flex-1 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" 
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    {cancelText}
                  </Button>
                  <Button 
                    className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 border-red-500 text-white shadow-lg shadow-red-500/20" 
                    onClick={onConfirm}
                    disabled={isLoading}
                  >
                    {isLoading ? "..." : confirmText}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
