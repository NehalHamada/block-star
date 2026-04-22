import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          "react-vendor": ["react", "react-dom", "react-router-dom"],

          // UI libraries
          "antd-vendor": ["antd"],

          // Canvas/Graphics
          "fabric-vendor": ["fabric"],

          // Animation
          "animation-vendor": ["framer-motion", "lottie-react"],

          // Forms and validation
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "yup"],

          // Data fetching
          "query-vendor": ["@tanstack/react-query", "axios"],

          // UI components
          "ui-vendor": [
            "swiper",
            "react-icons",
            "lucide-react",
            "react-otp-input",
          ],

          // Utilities
          "utils-vendor": ["react-toastify", "webfontloader"],
        },
      },
    },
    // Increase chunk size warning limit (default is 500kB)
    chunkSizeWarningLimit: 1000,
  },
});
