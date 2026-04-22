import { Outlet } from "react-router-dom";
import { Footer, Navbar, ScrollToTop, CartDrawer } from "../components";
import AuthContextProvider from "../context/AuthContext.jsx";
import { useLanguage } from "../context/useLanguage.js";

export default function MainLayout() {
  const { isRTL } = useLanguage();

  return (
    <AuthContextProvider>
      <div
        className="min-h-screen flex flex-col font-cairo"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <ScrollToTop />
        <CartDrawer />
        {/* جعل النافبار فوق المحتوى وبخلفية شفافة في البداية */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </AuthContextProvider>
  );
}
