import { Outlet } from "react-router-dom";
import { Footer, Navbar, ScrollToTop, CartDrawer, ScrollToggleButton } from "../components";
import { useLanguage } from "../context/useLanguage.js";

export default function MainLayout() {
  const { isRTL } = useLanguage();

  return (
    <div
      className="min-h-screen flex flex-col font-cairo"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <ScrollToTop />
      <CartDrawer />
      <ScrollToggleButton />
      {/* جعل النافبار فوق المحتوى وبخلفية شفافة في البداية */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
