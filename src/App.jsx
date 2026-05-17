import "./App.css";
import "./i18n/index.js"; // Initialize i18n
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routes";
import SavedProductContextProvider from "./context/savedProductContext.jsx";
import { LanguageContextProvider } from "./context/LanguageContext.jsx";
import { useLanguage } from "./context/useLanguage.js";
import { OfflineBanner } from "./components";
import { CartDrawerProvider } from "./context/cartDrawerContext.jsx";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 2000,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnReconnect: true,
    },
  },
});

function AppContent() {
  const { isRTL } = useLanguage();

  return (
    <>
      <OfflineBanner />
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={isRTL}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContextProvider>
        <CartDrawerProvider>
          <SavedProductContextProvider>
            <AppContent />
          </SavedProductContextProvider>
        </CartDrawerProvider>
      </LanguageContextProvider>
    </QueryClientProvider>
  );
}

export default App;
