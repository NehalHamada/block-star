import React, { useState, useEffect, useRef } from "react";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { Button } from "../ui";
import { useTranslation } from "react-i18next";
import { useDesignPageByAI } from "./hooks/useDesignPageByAI";
import EditPromptModal from "./EditPromptModal.jsx";
import { usePollinationsAI } from "./hooks/usePollinationsAI";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, RefreshCw, CheckCircle2, Brush } from "lucide-react";

/**
 * A robust image component with a loading indicator that works even with browser cached preloaded images.
 */
function ImageWithLoader({ src, alt, className, isAr }) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Reset states when src changes
    setLoaded(false);
    setHasError(false);
  }, [src]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gray-50 p-4">
      {hasError ? (
        <div className="flex flex-col items-center justify-center text-center gap-3 w-full h-full">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-red-600 font-cairo">
            {isAr ? "فشل تحميل لوحة الذكاء الاصطناعي" : "AI board failed to load"}
          </p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary underline hover:text-primary-dark font-cairo font-medium"
          >
            {isAr ? "افتح الرابط للتجربة ↗" : "Open link directly ↗"}
          </a>
        </div>
      ) : (
        <>
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setHasError(true);
              setLoaded(true);
            }}
          />
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 gap-3 px-4 text-center">
              <RefreshCw size={24} className="text-primary animate-spin" />
              <span className="text-xs text-dark-gray font-cairo animate-pulse">
                {isAr ? "جاري تحميل اللوحة..." : "Loading board..."}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/**
 * Renders the AI-powered canvas design page.
 * Strictly UI-only, utilizing the custom useDesignPageByAI hook for all logic.
 */
export function DesignPageByAI({ onStepChange }) {
  const { t, i18n } = useTranslation();
    // Obtain UI state and actions from the custom hook
  const {
    step,
    prompt,
    setPrompt,
    selectedOptionIndex,
    setSelectedOptionIndex,
    generatedOptions,
    approvedBoardData,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    errorJoke,
    pollinationError,
    handleGenerate,
    handleApprove,
    handleRegenerate,
    handleBackToInput,
    handleSelectSuggestion,
    isPendingApprove,
    isPendingGenerate,
  } = useDesignPageByAI(onStepChange);


    const isAr = i18n.language === "ar";

  const { translatePrompt } = usePollinationsAI();
const [editOpen, setEditOpen] = useState(false);

  // Creative pre-filled prompt suggestions for wooden designs
  const SUGGESTIONS = [
    {
      ar: "زخرفة إسلامية عريقة بألوان ذهبية",
      en: "Ancient Islamic ornament in golden colors",
    },
    {
      ar: "لوحة جدارية ثلاثية الأبعاد بأسلوب مودرن",
      en: "3D modern abstract wall painting",
    },
    {
      ar: "خط عربي كوفي متداخل مع عناصر الطبيعة",
      en: "Kufic calligraphy integrated with nature",
    },
    {
      ar: "رسمة أطفال كرتونية لطيفة لحيوانات الغابة",
      en: "Cute cartoon animals for kids room",
    },
    {
      ar: "لوحة زيتية دافئة لمشهد غروب الشمس في الصحراء",
      en: "Warm oil painting of a desert sunset",
    },
  ];

  // RATIONALE: Framer motion variants for clean fade-in and slide-up transitions
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  // RATIONALE: Keep opacity at 1 for child items so they do not render completely invisible (opacity: 0) 
  // if the parent's animation propagation is out-of-sync or intercepted by AnimatePresence. 
  // The parent container (cardVariants) already provides a beautiful global fade-in and slide-up transition, 
  // so the cards will still fade in perfectly as part of the overall page entry.
  const itemVariants = {
    hidden: { opacity: 1, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  // --- LOADING STATE ---
  if (step === "loading") {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-6 bg-transparent">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="max-w-md w-full text-center space-y-8 p-8 bg-white/70 backdrop-blur-md border border-primary/20 rounded-3xl shadow-xl"
        >
          {/* AI Canvas Scanner Loader Effect */}
          <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-light-beige to-gray-100 border border-gray-200 flex items-center justify-center shadow-inner">
            {/* Pulsing AI core */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="text-primary/10 absolute inset-0 flex items-center justify-center"
            >
              <Sparkles size={160} />
            </motion.div>

            {/* Rotating central spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="relative z-10 p-4 bg-white/95 rounded-full shadow-md text-primary"
            >
              <RefreshCw size={36} className="animate-pulse" />
            </motion.div>

            {/* Vertical scanning laser line */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 z-20 shadow-[0_0_8px_var(--color-primary)]"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-secondary font-cairo flex items-center justify-center gap-2">
              <Sparkles className="text-primary animate-pulse" size={20} />
              <span>{t("studio.generating")}</span>
            </h2>
            <p className="text-sm text-dark-gray font-cairo max-w-xs mx-auto">
              {t("studio.generatingDesc")}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- RESULT STATE ---
  if (step === "result") {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={cardVariants}
          className="space-y-6"
        >
          {/* Prompt Review Banner */}
          <div className="bg-gradient-to-br from-white/90 to-light-beige/50 border border-primary/20 rounded-2xl p-5 shadow-sm">
            <div className="flex gap-3 items-start">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary mt-1">
                <Wand2 size={20} />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {isAr ? "فكرتك الحالية" : "Your Current Idea"}
                </span>
                <p className="text-secondary font-medium font-cairo text-base leading-relaxed">
                  {prompt}
                </p>
              </div>
            </div>
          </div>

          {/* Generated Designs Selection Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-secondary font-cairo flex items-center gap-2">
              <Sparkles className="text-primary animate-pulse" size={18} />
              <span>
                {isAr
                  ? "اختر التصميم المفضل لديك:"
                  : "Select your favorite design:"}
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {generatedOptions.map((option, index) => {
                  const isSelected = selectedOptionIndex === index;
                  // RATIONALE: Using specific transition-colors and transition-shadow instead of transition-all. 
                  // transition-all conflicts with Framer Motion's inline opacity/transform style updates, causing the cards 
                  // to render invisible (opacity: 0) on load until an event like hover forces a repaint/reflow.
                  return (
                    <motion.div
                      key={option.board.id}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedOptionIndex(index)}
                      className={`relative cursor-pointer rounded-2xl overflow-hidden bg-white border-2 transition-colors transition-shadow duration-300 shadow-sm hover:shadow-lg ${
                        isSelected
                          ? "border-primary ring-4 ring-primary/20 shadow-primary/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {/* Canvas Image Container */}
                      <div className="relative aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden">
                        <ImageWithLoader
                          src={option.board.image_url}
                          alt={
                            option.style_name ??
                            t("studio.finalDesign") + " " + (index + 1)
                          }
                          className="w-full h-full object-cover"
                          isAr={isAr}
                        />
                      </div>

                      {/* Info Panel */}
                      <div className="p-4 bg-white flex justify-between items-center border-t border-gray-100">
                        <span className="font-semibold text-secondary font-cairo text-sm">
                          {option.style_name ??
                            `${t("studio.option")} ${option.option}`}
                        </span>

                        <div className="flex items-center gap-1 text-xs text-dark-gray font-cairo">
                          <span>{isAr ? "ستايل" : "Style"}</span>
                          <span className="font-bold text-secondary">
                            #{option.option}
                          </span>
                        </div>
                      </div>

                      {/* Selected State Ring Indicator */}
                      {isSelected && (
                        <div className="absolute top-4 left-4 bg-primary text-white rounded-full p-1.5 shadow-md">
                          <CheckCircle2 size={18} strokeWidth={3} />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
                onClick={() => setEditOpen(true)}
              variant="outline"
              className="flex-1 font-cairo !rounded-xl !py-3 hover:bg-gray-50 transition-colors"
            >
              {t("studio.editDesign")}
            </Button>
            <Button
              onClick={handleRegenerate}
              variant="outline"
              className="flex-1 font-cairo !rounded-xl !py-3 hover:bg-gray-50 transition-colors"
            >
              {t("studio.regenerate")}
            </Button>
            <Button
              onClick={handleApprove}
              variant="primary"
              disabled={isPendingApprove}
              className="flex-1 font-cairo !rounded-xl !py-3 bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/20"
            >
              {isPendingApprove ? (
                <RefreshCw className="animate-spin text-xl" />
              ) : (
                t("studio.approveDesign")
              )}
            </Button>
            <Button
              onClick={async () => {
                const imgUrl = generatedOptions[selectedOptionIndex]?.board?.image_url;
                if (imgUrl) {
                  try {
                    const response = await fetch(imgUrl);
                    const blob = await response.blob();
                    const localUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = localUrl;
                    a.download = `blockstar-design-${Date.now()}.png`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(localUrl);
                    document.body.removeChild(a);
                  } catch (e) {
                    console.error("Failed to download image", e);
                  }
                }
              }}
              variant="outline"
              className="flex-1 font-cairo !rounded-xl !py-3 hover:bg-gray-50 transition-colors"
            >
              {t('studio.download', { defaultValue: 'Download' })}
            </Button>
            </div>
            {/* Edit Prompt Modal */}
            <EditPromptModal
              isOpen={editOpen}
              currentPrompt={prompt}
              onClose={() => setEditOpen(false)}
              onSave={async (newPrompt) => {
                const translated = await translatePrompt(newPrompt);
                setPrompt(translated);
                setEditOpen(false);
                handleGenerate(translated);
              }}
            />
        </motion.div>
      </div>
    );
  }

  // --- CONFIRM STATE ---
  if (step === "confirm") {
    const boardSvg =
      approvedBoardData?.image_url ??
      generatedOptions[selectedOptionIndex]?.board?.image_url;
    const boardTitle =
      approvedBoardData?.title ??
      generatedOptions[selectedOptionIndex]?.board?.title;
    const boardPrompt = approvedBoardData?.prompt ?? prompt;

    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-10 space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold border border-green-100">
              <CheckCircle2 size={14} />
              <span>{t("studio.designSaved")}</span>
            </span>
            <h1 className="text-2xl font-extrabold text-secondary font-cairo">
              {t("studio.confirmTitle")}
            </h1>
            {boardTitle && (
              <p className="text-sm font-semibold text-primary font-cairo">
                {boardTitle}
              </p>
            )}
          </div>

          {/* Render Final Canvas Image */}
          <div className="relative aspect-[4/3] max-w-md mx-auto overflow-hidden rounded-2xl border-4 border-white shadow-lg bg-gray-50 flex items-center justify-center">
            <img
              src={boardSvg}
              alt={boardTitle ?? t("studio.finalDesign")}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Details & Metadata Card */}
          <div className="bg-light-beige/30 rounded-2xl p-5 border border-gray-200/50 space-y-3">
            <h4 className="text-sm font-bold text-secondary font-cairo flex items-center gap-2">
              <Brush size={16} className="text-primary" />
              <span>
                {isAr ? "مواصفات التوليد السحري" : "Magic Generation Details"}
              </span>
            </h4>
            <p className="text-sm text-dark-gray font-cairo leading-relaxed">
              {boardPrompt}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-gray-100 flex justify-center">
            <Button
              onClick={handleBackToInput}
              variant="outline"
              className="w-full max-w-sm font-cairo !py-3.5 !rounded-2xl transition-all duration-300 text-base font-bold border border-primary text-primary hover:bg-primary/10 shadow-sm hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Brush size={18} />
              <span>{t("studio.backToDesign", { defaultValue: "Back to design" })}</span>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (step === "error" && errorJoke) {
    const jokeTitle = isAr ? errorJoke.ar.title : errorJoke.en.title;
    const jokeDesc = isAr ? errorJoke.ar.desc : errorJoke.en.desc;

    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white/95 backdrop-blur-md border border-red-500/10 shadow-2xl rounded-3xl p-8 md:p-12 text-center space-y-8 relative overflow-hidden"
        >
          {/* Subtle warm red/orange accent glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-500/5 rounded-full filter blur-3xl pointer-events-none" />

          {/* Custom SVG combining Wooden Block and Gold Star (Indirect representation of Block-Star logo) */}
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            {/* Pulsing glow behind the block-star */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-36 h-36 bg-primary/20 rounded-full filter blur-xl pointer-events-none"
            />

            {/* Custom SVG combining Wooden Block and Gold Star */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="relative z-10"
              animate={{
                y: [0, -4, 0],
                rotate: [0, -1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Left Face of the Wooden Block */}
              <polygon
                points="20,50 60,72 60,110 20,88"
                fill="#C5A43A" // Golden oak tone
                stroke="#B5942A"
                strokeWidth="1.5"
              />
              {/* Right Face of the Wooden Block */}
              <polygon
                points="60,72 100,50 100,88 60,110"
                fill="#9E7F1C" // Shadowed golden oak
                stroke="#8E6F0C"
                strokeWidth="1.5"
              />
              {/* Top Face of the Wooden Block */}
              <polygon
                points="60,25 100,50 60,72 20,50"
                fill="#DFBC34" // Primary Gold brand color
                stroke="#CFAC24"
                strokeWidth="1.5"
              />

              {/* The "Star" of Block-Star engraved on top face (drawn in perspective) */}
              <polygon
                points="60,33 63,44 73,43 66,50 69,60 60,53 51,60 54,50 47,43 57,44"
                fill="#FFF"
                opacity="0.9"
                className="animate-pulse"
                style={{ transformOrigin: "60px 48px" }}
              />

              {/* Bandage plaster stuck diagonally on the block to represent the repair/error */}
              <rect
                x="35"
                y="55"
                width="50"
                height="12"
                rx="3"
                fill="#E2C9A1"
                stroke="#C1A77E"
                strokeWidth="1"
                transform="rotate(-25 60 61)"
                opacity="0.95"
              />
              {/* Plaster holes */}
              <circle cx="55" cy="59" r="1" fill="#A88B60" />
              <circle cx="60" cy="57" r="1" fill="#A88B60" />
              <circle cx="65" cy="55" r="1" fill="#A88B60" />
            </motion.svg>

            {/* Floating Hammer that strikes the Block-Star */}
            <motion.div
              animate={{
                rotate: [0, -35, 10, -5, 0],
                x: [0, 15, -5, 0, 0],
                y: [0, -15, 5, 0, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute -top-2 -right-2 z-20 text-4xl select-none"
              style={{ transformOrigin: "bottom left" }}
            >
              🔨
            </motion.div>

            {/* Little floating stars shooting out from the strike */}
            <motion.span
              animate={{
                y: [0, -30, -40],
                x: [0, -25, -35],
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              className="absolute top-12 left-10 text-primary text-sm z-30"
            >
              ✨
            </motion.span>
            <motion.span
              animate={{
                y: [0, -40, -50],
                x: [0, 20, 30],
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: 0.2,
                ease: "easeOut",
              }}
              className="absolute top-10 right-12 text-purple-400 text-xs z-30"
            >
              ⭐
            </motion.span>
          </div>

          {/* Error Message */}
          <div className="space-y-3 relative z-10">
            <h2 className="text-2xl font-black text-secondary font-cairo leading-tight">
              {jokeTitle}
            </h2>
            <p className="text-sm md:text-base text-dark-gray font-cairo leading-relaxed max-w-md mx-auto">
              {jokeDesc}
            </p>
          </div>

          {/* Action Button */}
                    {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex justify-center gap-4 relative z-10">
            <Button
              onClick={handleBackToInput}
              variant="primary"
              className="flex-1 max-w-xs font-cairo !py-3.5 !rounded-2xl transition-all duration-300 text-base font-bold bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/20 hover:-translate-y-0.5"
            >
              {isAr ? "العودة للورشة والتجربة مجدداً" : "Return to workshop & try again"}
            </Button>
            <Button
              onClick={handleGenerate}
              variant="outline"
              className="flex-1 max-w-xs font-cairo !py-3.5 !rounded-2xl transition-all duration-300 text-base font-bold border border-primary text-primary hover:bg-primary/10 shadow-sm hover:-translate-y-0.5"
            >
              {isAr ? "إعادة المحاولة" : "Retry"}
            </Button>
          </div>

          
        </motion.div>
      </div>
    );
  }

  // --- INPUT STATE (DEFAULT) ---
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-white/90 backdrop-blur-md border border-primary/10 shadow-2xl rounded-3xl p-6 md:p-8 space-y-8 relative overflow-hidden"
      >
        {/* Decorative background glow for card */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none" />

        {/* Title Block */}
        <div className="text-center space-y-3 relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-primary/10 via-purple-500/10 to-indigo-500/10 text-secondary rounded-full text-xs font-semibold border border-primary/20"
          >
            <Sparkles size={14} className="text-primary animate-pulse" />
            <span className="font-cairo font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {isAr ? "ذكاء اصطناعي فائق السرعة" : "Ultra-fast AI Generator"}
            </span>
          </motion.div>

          <h2 className="text-3xl font-black font-cairo tracking-tight bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
            {t("studio.writeIdea")}
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-primary via-purple-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="space-y-6 relative z-10">
          {/* Category Dropdown */}
          <div className="space-y-2">
            <FormSelect
              label={t("studio.chooseCategory")}
              value={selectedCategoryId}
              onChange={setSelectedCategoryId}
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              className="w-full font-cairo"
            />
          </div>

          {/* Interactive Sparkle Prompt Input Box */}
          <div className="space-y-2">
            <label className="text-base font-bold text-secondary font-cairo flex items-center gap-2">
              <Brush size={18} className="text-primary" />
              <span>
                {isAr
                  ? "تفاصيل الفكرة الفنية:"
                  : "Details of the artistic idea:"}
              </span>
            </label>

            {/* Glowing focus-ring styling using custom css-gradient frame around FormInput wrapper */}
            <div className="relative group rounded-2xl p-[1.5px] transition-all duration-300">
              {/* Backglow portal effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-indigo-500 rounded-2xl blur-lg opacity-25 group-focus-within:opacity-50 transition-opacity duration-300 pointer-events-none" />

              <div className="relative bg-white rounded-[14px] p-1.5 border border-gray-100 shadow-inner group-focus-within:border-primary transition-colors duration-300">
                <FormInput
                  value={prompt}
                  onChange={setPrompt}
                  placeholder={
                    isAr
                      ? "مثال: لوحة خشبية فيها خط عربي مميز يعبر عن السلام بلمسة ذهبية..."
                      : "Example: A wooden board with distinct Arabic calligraphy expressing peace with a golden touch..."
                  }
                  prefix={
                    <Sparkles
                      className="text-primary/70 group-focus-within:text-primary animate-pulse"
                      size={20}
                    />
                  }
                  maxLength={300}
                  showCounter
                  multiline
                  className="border-none shadow-none focus:shadow-none"
                />
              </div>
            </div>
          </div>

          {/* Smart Tips banner */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-3.5 bg-primary/5 rounded-2xl border border-primary/10 flex gap-2.5 items-start"
          >
            <span className="text-base mt-0.5">💡</span>
            <p className="text-xs text-dark-gray font-cairo leading-relaxed">
              {isAr
                ? "نصيحة ذكية: اكتب تفاصيل أكثر مثل الألوان المفضلة، نمط الإضاءة، والمشهد للحصول على لوحة غاية في الدقة والجمال."
                : "Smart Tip: Add details like preferred colors, lighting style, and background setting for highly accurate and breathtaking results."}
            </p>
          </motion.div>

          {/* Creative Suggestions Chips */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-dark-gray font-cairo flex items-center gap-1.5 opacity-90">
              <Wand2 size={14} className="text-primary" />
              <span>
                {isAr ? "أفكار ملهمة للتجربة:" : "Inspiring ideas to try:"}
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((sug, idx) => {
                const suggestionLabel = isAr ? sug.ar : sug.en;
                return (
                  <motion.button
                    key={idx}
                    type="button"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelectSuggestion(suggestionLabel)}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-primary/20 text-secondary bg-gradient-to-br from-white to-light-beige/50 hover:from-primary hover:to-amber-500 hover:text-white hover:border-transparent cursor-pointer shadow-sm transition-all duration-300 flex items-center gap-1 font-cairo"
                  >
                    <Sparkles size={11} className="text-primary opacity-80" />
                    <span>{suggestionLabel}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Generate Action Button */}
        <div className="pt-6 border-t border-gray-100 flex justify-center relative z-10">
          <div className="relative w-full max-w-sm">
            {prompt.trim() && selectedCategoryId && (
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-amber-500 rounded-2xl blur opacity-30 animate-pulse pointer-events-none" />
            )}
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || !selectedCategoryId}
              className={`w-full font-cairo !py-3.5 !rounded-2xl transition-all duration-300 text-base font-bold flex items-center justify-center gap-2 shadow-lg relative ${
                prompt.trim() && selectedCategoryId
                  ? "bg-gradient-to-r from-primary to-amber-500 text-white hover:shadow-primary/30 hover:-translate-y-0.5 cursor-pointer border-none"
                  : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none"
              }`}
            >
              <Sparkles
                size={18}
                className={
                  prompt.trim() && selectedCategoryId
                    ? "animate-bounce text-white"
                    : ""
                }
              />
              <span>{t("studio.generate")}</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
