import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export function MapIframe({ lat, lng, zoom = 15 }) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative group"
    >
      <div className="absolute inset-0 bg-secondary shadow-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl" />
      <iframe
        src={src}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-3xl border-2 border-white shadow-xl relative z-10 min-h-[300px]"
        title="Map"
      />
    </motion.div>
  );
}
