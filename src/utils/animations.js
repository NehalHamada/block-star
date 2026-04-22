/**
 * Shared Framer Motion animation variants for the entire app.
 * Import only what you need to keep bundles lean.
 */

/** Fade up — for cards and sections entering the viewport */
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/** Fade in from left */
export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/** Fade in from right */
export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/** Stagger container — wraps a list of animated children */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/** Card item — used as a child inside staggerContainer */
export const cardItem = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/** Slight scale on hover — for interactive cards */
export const hoverScale = {
  scale: 1.03,
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

/** Tap press feedback */
export const tapScale = { scale: 0.99 };

/** Page-level transition — wrap each page's root element */
export const pageTransition = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};
