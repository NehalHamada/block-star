import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { User, ShoppingCart, Globe, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import icon from "/icon.png";
import { DropdownMenu } from "./DropdownMenu.jsx";
import { useLanguage } from "../context/useLanguage.js";
import { useCart } from "../hooks/queries/useCart.js";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toggleLanguage, language } = useLanguage();
  const { data: cartData } = useCart();
  const cartCount = cartData?.data?.items_count || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.categories"), path: "/categories" },
    { name: t("nav.studio"), path: "/studio" },
    { name: t("nav.companyOrders"), path: "/company-orders" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <Motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-2 left-1/2 -translate-x-1/2 z-50
                  w-[95%] md:w-[90%] rounded-full transition-all duration-300
                  ${isScrolled ? "bg-[#B4b4b4] " : "bg-[#B4b4b4] "}
                  border border-white/10 shadow-xl px-4 md:px-8 py-1 md:py-2`}>
        <div className="flex items-center justify-between ">
          {/* Desktop Links - Hidden on Mobile */}
          <ul className="hidden lg:flex items-center gap-6">
            <div className="w-15 h-15 rounded-full shrink-0">
              <img
                src={icon}
                alt="icon"
                className="rounded-full w-full h-full object-cover cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-sm transition whitespace-nowrap
                    ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-white hover:text-primary"
                    }`
                  }>
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <Motion.span
                          layoutId="activeLink"
                          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="lg:hidden">
            <div className="w-16 h-16 flex items-center rounded-full">
              <img
                src={icon}
                alt="icon"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center text-white">
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Globe — Language Toggle */}
            <Motion.button
              whileHover={{ scale: 1.1 }}
              onClick={toggleLanguage}
              title={
                language === "ar" ? "Switch to English" : "التبديل إلى العربية"
              }
              className="w-8 h-8 md:w-10 md:h-10 rounded-full
                         border border-white/60
                         flex items-center justify-center gap-1
                         text-white hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors">
              <Globe size={16} />
              <span className="text-[10px] font-bold leading-none hidden md:inline">
                {language === "ar" ? "EN" : "AR"}
              </span>
            </Motion.button>

            {/* Cart */}
            <Motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/cart")}
              className="relative w-8 h-8 md:w-10 md:h-10 rounded-full
                         border border-white/60
                         flex items-center justify-center
                         text-white hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-secondary text-white text-[9px] md:text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Motion.button>

            <DropdownMenu />
          </div>
        </div>
      </Motion.nav>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Sidebar */}
            <Motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-black/95 backdrop-blur-xl z-[70] lg:hidden">
              {/* Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="w-32 h-12 rounded-full">
                  <img
                    src={icon}
                    alt="icon"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-secondary transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Links */}
              <ul className="flex flex-col p-6 gap-4">
                {links.map((link, index) => (
                  <Motion.li
                    key={link.path}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}>
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block py-3 px-4 rounded-lg transition
                        ${
                          isActive
                            ? "text-primary bg-primary/10 font-semibold"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`
                      }>
                      {link.name}
                    </NavLink>
                  </Motion.li>
                ))}
              </ul>

              {/* Mobile Language Toggle */}
              <div className="px-6 pt-2 border-t border-white/10">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 py-3 px-4 w-full rounded-lg text-white hover:text-primary hover:bg-transparent transition">
                  <Globe size={18} />
                  <span className="text-sm">
                    {language === "ar"
                      ? "Switch to English"
                      : "التبديل إلى العربية"}
                  </span>
                </button>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
