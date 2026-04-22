import logoImg from "/icon.png";

/**
 * Full-page branded loader — shown during lazy-loaded route transitions.
 * Uses the site logo with a pulsing + spinning ring animation.
 */
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background gap-5">
      {/* Spinning ring + logo */}
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute w-24 h-24 rounded-full border-4 border-secondary/20 border-t-secondary animate-spin bg-black/10 -z-10" />
        {/* Logo inside */}
        <img
          src={logoImg}
          alt="شعار الموقع"
          className="w-40 h-40 object-contain rounded-full"
        />
      </div>

      {/* Animated dots */}
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
