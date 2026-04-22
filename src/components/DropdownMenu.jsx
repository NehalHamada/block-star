import {
  ChevronLeft,
  UserCircle,
  Package,
  Save,
  LogInIcon,
  LogOutIcon,
  User,
  ChevronRight,
} from "lucide-react";
import { Dropdown, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

// Menu Item Component - Reusable
const MenuItem = ({
  icon,
  label,
  hasArrow = true,
  isHighlighted = false,
  isArabic = false,
}) => {
  const Icon = icon;

  return isArabic ? (
    <div
      className={`flex items-center justify-between py-2 px-2 ${isHighlighted ? "text-primary" : ""}`}>
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span className="font-cairo">{label}</span>
      </div>
      {hasArrow && <ChevronLeft size={16} className="text-white/50" />}
    </div>
  ) : (
    <div
      className={`flex items-center justify-between py-2 px-2 ${isHighlighted ? "text-primary" : ""}`}>
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span className="font-cairo">{label}</span>
      </div>
      {hasArrow && <ChevronRight size={16} className="text-white/50" />}
    </div>
  );
};

// Dropdown Theme Configuration
const DROPDOWN_THEME = {
  components: {
    Dropdown: {
      colorBgElevated: "rgba(0, 0, 0, 0.90)",
      colorText: "rgba(255, 255, 255, 0.9)",
      controlItemBgHover: "rgba(255, 255, 255, 0.05)",
      borderRadiusLG: 16,
      colorBorder: "transparent",
      boxShadowSecondary:
        "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
      paddingBlock: 8,
    },
  },
};

// Main Component
export const DropdownMenu = () => {
  const navigate = useNavigate();
  const { logOut, isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Handle logout
  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  // Menu Configuration - Base items for authenticated users
  const authenticatedMenuItems = [
    {
      key: "profile",
      icon: UserCircle,
      label: t("dropdown.editProfile"),
      path: "/profile",
      hasArrow: true,
    },
    {
      key: "orders",
      icon: Package,
      label: t("dropdown.orders"),
      path: "/orders",
      hasArrow: true,
    },
    {
      key: "saved",
      icon: Save,
      label: t("dropdown.savedDesigns"),
      path: "/saved-designs",
      hasArrow: true,
    },
    {
      key: "headlines",
      icon: Save,
      label: t("dropdown.headlines"),
      path: "/headlines",
      hasArrow: true,
    },
    {
      key: "logout",
      icon: LogOutIcon,
      label: t("dropdown.logout"),
      hasArrow: false,
      isHighlighted: true,
      action: handleLogout,
    },
  ];

  const unauthenticatedMenuItems = [
    {
      key: "headlines",
      icon: Save,
      label: t("dropdown.headlines"),
      path: "/headlines",
      hasArrow: true,
    },
    {
      key: "orders",
      icon: Package,
      label: t("dropdown.orders"),
      path: "/orders",
      hasArrow: true,
    },
    {
      key: "login",
      icon: LogInIcon,
      label: t("dropdown.login"),
      path: "/auth/login",
      hasArrow: false,
      isHighlighted: true,
    },
  ];

  // Select menu items based on authentication state
  const MENU_CONFIG = isAuthenticated
    ? authenticatedMenuItems
    : unauthenticatedMenuItems;

  // Transform config to Ant Design menu items
  const menuItems = MENU_CONFIG.map((item) => ({
    key: item.key,
    label: (
      <MenuItem
        icon={item.icon}
        label={item.label}
        hasArrow={item.hasArrow}
        isHighlighted={item.isHighlighted}
        isArabic={isArabic}
      />
    ),
    onClick: () => {
      if (item.action) {
        item.action();
      } else if (item.path) {
        navigate(item.path);
      }
    },
  }));

  return (
    <ConfigProvider theme={DROPDOWN_THEME}>
      <Dropdown
        menu={{ items: menuItems }}
        trigger={["click"]}
        placement="bottomRight"
        styles={{ root: { minWidth: "240px" } }}>
        <Motion.button
          whileHover={{ scale: 1.1 }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full
                     border border-white/60
                     flex items-center justify-center
                     text-white hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors">
          <User size={18} />
        </Motion.button>
      </Dropdown>
    </ConfigProvider>
  );
};
