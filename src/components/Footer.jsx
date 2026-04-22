import React, { useState } from "react";
import footerImage from "../assets/footerImage.png";
import commercial from "/commercial.png";
import tax from "/tax.png";
import address from "/address.png";
import { Button } from "./ui";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContactInfo } from "../hooks/queries/useContactInfo.js";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { X } from "lucide-react";

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
  youtube: FaYoutube,
};

export function Footer() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");
  const { t } = useTranslation();
  const { data: contactInfoData } = useContactInfo();
  const contactInfo = contactInfoData?.data;
  const socialLinks = contactInfo?.social_links || [];

  const navLinks = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.categories"), path: "/categories" },
    { label: t("nav.studio"), path: "/studio" },
    { label: t("nav.companyOrders"), path: "/company-orders" },
    { label: t("nav.about"), path: "/about" },
  ];

  const images = [
    { src: commercial, text: "Commercial Details" },
    { src: tax, text: "Tax Info" },
    { src: address, text: "Address Details" },
  ];

  return (
    <footer className="relative w-full overflow-hidden">
      {/* ═══════════════ TOP SECTION: Full-bleed image CTA ═══════════════ */}
      <div className="relative">
        <img
          src={footerImage}
          alt="footer"
          className="w-full h-[240px] sm:h-[280px] object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm" />

        {/* CTA centered content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Golden decorative line */}
          <div className="w-12 h-[2px] bg-primary mb-5" />

          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            {t("footer.needMoreInfo")}
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-6 max-w-md">
            {t("footer.infoDesc")}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="px-8 py-3" onClick={() => navigate("/contact")}>
              {t("footer.contactUs")}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════════ MAIN FOOTER ═══════════════ */}
      <div className="bg-secondary">
        {/* Golden accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {/* ─── Brand ─── */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-primary font-bold text-lg mb-3">
                {t("footer.tagline")}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed max-w-xs">
                {t("footer.infoDesc")}
              </p>

              {/* Social icons inline */}
              <div className="flex gap-2 mt-5">
                {socialLinks.length > 0
                  ? socialLinks.map((link) => {
                      const key = link.name?.toLowerCase();
                      const Icon = SOCIAL_ICONS[key];
                      if (!Icon) return null;
                      return (
                        <motion.a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={link.name}
                          whileHover={{ y: -4 }}
                          className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/45 hover:bg-primary hover:text-secondary transition-all duration-300">
                          <Icon size={14} />
                        </motion.a>
                      );
                    })
                  : [FaFacebookF, FaInstagram].map((Icon, i) => (
                      <div
                        key={i}
                        className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center opacity-30">
                        <Icon className="text-white" size={14} />
                      </div>
                    ))}
              </div>

              <div>
                <div className="flex mt-10">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img.src}
                      alt=""
                      className="w-20 h-10 rounded-full m-3 cursor-pointer hover:scale-105 transition"
                      onClick={() => setSelectedImage(img.src)}
                    />
                  ))}
                </div>
                {selectedImage && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                    onClick={() => setSelectedImage(null)}>
                    <div
                      className="relative"
                      onClick={(e) => e.stopPropagation()}>
                      <img
                        src={selectedImage}
                        alt=""
                        className="max-w-[90vw] max-h-[80vh] rounded-lg"
                      />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute cursor-pointer -top-3 -right-3 bg-white text-black rounded-full w-8 h-8">
                        <X />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ─── Navigation ─── */}
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">
                {t("nav.home")}
              </h4>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className="text-white/45 hover:text-primary text-sm cursor-pointer transition-colors duration-200 w-fit">
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* ─── Services ─── */}
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">
                {t("nav.studio")}
              </h4>
              <nav className="flex flex-col gap-3">
                {[{ label: t("studio.designYourself"), path: "/studio" }].map(
                  (link, i) => (
                    <a
                      key={i}
                      onClick={() => navigate(link.path)}
                      className="text-white/45 hover:text-primary text-sm cursor-pointer transition-colors duration-200 w-fit">
                      {link.label}
                    </a>
                  ),
                )}
              </nav>
            </div>

            {/* ─── Contact ─── */}
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">
                {t("footer.contactUs")}
              </h4>
              <div className="flex flex-col gap-4">
                {contactInfo?.email && (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-start gap-3 text-white/45 hover:text-primary text-sm transition-colors group">
                    <MdOutlineEmail
                      size={18}
                      className="text-primary/80 mt-0.5 shrink-0"
                    />
                    <span>{contactInfo.email}</span>
                  </a>
                )}
                {contactInfo?.phones?.map((phone, i) => (
                  <a
                    key={i}
                    href={`tel:${phone}`}
                    className="flex items-start gap-3 text-white/45 hover:text-primary text-sm transition-colors group">
                    <MdOutlinePhone
                      size={18}
                      className="text-primary/80 mt-0.5 shrink-0"
                    />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════ BOTTOM BAR ═══════════════ */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-white/25 text-xs">
              © {new Date().getFullYear()} {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              {navLinks.slice(0, 3).map((link) => (
                <a
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="text-white/20 hover:text-white/50 text-xs cursor-pointer transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
