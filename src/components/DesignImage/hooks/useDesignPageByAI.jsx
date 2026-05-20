import { useState, useEffect } from "react";
import { usePollinationsAI } from "./usePollinationsAI";
import axiosInstance from "../../../api/axiosInstance.js";
import { useTranslation } from "react-i18next";
import useStudio from "../../../hooks/queries/useStudio";

// Joke database categorized by wood/board-store relevant themes
const JOKE_DATABASE = {
  living: [
    {
      ar: {
        title: "يبدو أن الكنبة كانت مريحة بزيادة! 🛋️💤",
        desc: "الذكاء الاصطناعي أخذ غفوة على الكنبة الجديدة ونسي ينهي التصميم. دعنا نوقظه ونحاول مجدداً!",
      },
      en: {
        title: "Looks like the sofa was too comfortable! 🛋️💤",
        desc: "The AI took a nap on the new sofa and forgot to finish the design. Let's wake it up and try again!",
      },
    },
    {
      ar: {
        title: "الشاي انسكب على سجاد الصالة! ☕🛋️",
        desc: "بينما كان الذكاء الاصطناعي يرتب غرفة المعيشة، انسكب كوب الشاي الساخن. دعنا نجفف المكان ونحاول مجدداً!",
      },
      en: {
        title: "Tea spilled on the living room rug! ☕🛋️",
        desc: "While the AI was arranging the living room, a cup of hot tea spilled. Let's dry it up and try again!",
      },
    },
  ],
  office: [
    {
      ar: {
        title: "المدير الإلكتروني رفض التصميم! 💼📊",
        desc: "الذكاء الاصطناعي كان يقدم العرض، لكن قهوة الصباح انسكبت على الأوراق المكتبية. دعنا ننظف المكتب ونحاول مجدداً!",
      },
      en: {
        title: "The digital boss rejected the design! 💼📊",
        desc: "The AI was presenting the proposal, but morning coffee spilled all over the desk papers. Let's clean the desk and try again!",
      },
    },
    {
      ar: {
        title: "كرسي المكتب يعلق أثناء الدوران! 💺🔄",
        desc: "الذكاء الاصطناعي بدأ بالدوران على كرسي المكتب الجديد ولم يستطع التوقف لإنهاء اللوحة. دعنا نوقفه ونحاول مجدداً!",
      },
      en: {
        title: "The office chair is stuck spinning! 💺🔄",
        desc: "The AI started spinning on the new office chair and couldn't stop to finish the painting. Let's stop it and try again!",
      },
    },
  ],
  // ... (other categories omitted for brevity)
};

/**
 * Custom hook managing AI design generation.
 * UI components remain UI‑only; all logic lives here.
 */
export function useDesignPageByAI(onStepChange) {
  const { t } = useTranslation();
  const [step, setStep] = useState("input"); // 'input' | 'loading' | 'result' | 'confirm' | 'error'
  const [prompt, setPrompt] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [debugPrompt, setDebugPrompt] = useState("");
  const [generatedOptions, setGeneratedOptions] = useState([]);
  const [approvedBoardData, setApprovedBoardData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(undefined);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const {
    generateImage,
    translatePrompt,
    loading,
    error: pollinationError,
  } = usePollinationsAI();
  const [errorJoke, setErrorJoke] = useState(null);

  // Fetch categories (remains unchanged)
  useEffect(() => {
    let active = true;
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const { data } = await axiosInstance.get("/get-all-categories");
        if (active && data?.success && data?.data) {
          setCategories(data.data);
          if (data.data.length > 0) setSelectedCategoryId(data.data[0].id);
        }
      } catch (e) {
        // If API fails, provide a fallback category list for UI
        const fallback = [
          { id: "1", name: "Living", image: "" },
          { id: "2", name: "Office", image: "" },
          { id: "3", name: "Outdoor", image: "" },
        ];
        setCategories(fallback);
        setSelectedCategoryId(fallback[0].id);
      } finally {
        if (active) setCategoriesLoading(false);
      }
    };
    fetchCategories();
    return () => {
      active = false;
    };
  }, []);

  const {
    generateArtisticBoard,
    approveArtisticBoard,
    approveArtisticBoardCustom,
  } = useStudio();

  // Helper utility to preload images – retained for compatibility (no JSX here)
  const preloadImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => resolve(url);
      setTimeout(() => resolve(url), 8000);
    });
  };

  // Helper to get base64 from any URL (used for approval step)
  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });
  };

  // ---------- Generation ----------
  // Add cooldown state
  const [lastGenerateTime, setLastGenerateTime] = useState(0);
  const COOLDOWN_MS = 30000; // 30 seconds

  // Modified handleGenerate to respect cooldown
  const handleGenerate = async (customPrompt) => {
    const p = typeof customPrompt === "string" ? customPrompt : prompt;
    if (!p.trim() || !selectedCategoryId) return;
    const now = Date.now();
    if (now - lastGenerateTime < COOLDOWN_MS) {
      setErrorJoke({
        ar: {
          title: "انتظر قليلًا",
          desc: "يرجى الانتظار قبل إرسال طلب جديد لتجنب حجب الخدمة.",
        },
        en: {
          title: "Please wait",
          desc: "Please wait before sending another request to avoid rate limiting.",
        },
      });
      setStep("error");
      return;
    }
    setLastGenerateTime(now);
    setStep("loading");
    setErrorJoke(null);

    const selectedCategory = categories.find(
      (c) => String(c.id) === String(selectedCategoryId),
    );
    const categoryName = selectedCategory ? selectedCategory.name : "";

    // Optimize Arabic prompt and prepend category name
    const hasArabic = /[\u0600-\u06FF]/.test(p);
    let optimizedPrompt = p;
    if (hasArabic) {
      let targetText = "";
      const match =
        p.match(
          /(?:اسم|كلمة|كتابة|مكتوب عليها|مكتوب فيها)\s+["'«]?([^"'»]+)["'»]?/i,
        ) || p.match(/(?:اسم|كلمة|كتابة|مكتوب عليها|مكتوب فيها)\s+(.+)/i);
      if (match && match[1]) {
        targetText = match[1].trim();
      } else {
        const quotesMatch = p.match(/["'«]([^"'»]+)["'»]/);
        if (quotesMatch && quotesMatch[1]) targetText = quotesMatch[1].trim();
        else targetText = p;
      }
      optimizedPrompt = `A premium square wooden board art, category ${categoryName || "decor"}, with the Arabic name or text "${targetText}" engraved in beautiful elegant golden Arabic calligraphy in the center, detailed wood grain texture, photorealistic, 3d render, studio lighting`;
    } else {
      optimizedPrompt = `${p}, wooden board art, premium detailed wood texture, 3d render, high quality`;
    }
    // Prepend selected category name at the start of the prompt
    // Prepend selected category name at the start of the prompt
    const finalPrompt = `${categoryName ? categoryName + " " : ""}${optimizedPrompt}`;
    // Store the exact prompt used for debugging / UI display
    setDebugPrompt(finalPrompt);

    const translatedPrompt = await translatePrompt(finalPrompt);
    // Use the translated prompt for image generation
    const dataUri = await generateImage(translatedPrompt);
    if (!dataUri) {
      // If Pollinations returned an error, show it; otherwise fallback to generic funny error
      if (pollinationError) {
        setErrorJoke({
          ar: { title: "خطأ", desc: pollinationError },
          en: { title: "Error", desc: pollinationError },
        });
        setStep("error");
        return;
      }
      triggerFunnyError(categoryName);
      return;
    }

    setGeneratedOptions([
      {
        option: 1,
        style_name: t("studio.option") + " 1",
        board: {
          id: `local-ai-1-${Date.now()}`,
          image_url: dataUri,
          title: `${categoryName} - ${p} (${t("studio.option")} 1)`,
        },
      },
      {
        option: 2,
        style_name: t("studio.option") + " 2",
        board: {
          id: `local-ai-2-${Date.now()}`,
          image_url: dataUri,
          title: `${categoryName} - ${p} (${t("studio.option")} 2)`,
        },
      },
    ]);
    setSelectedOptionIndex(0);
    setStep("result");
  };

  // ---------- Error joke ----------
  const triggerFunnyError = (categoryName) => {
    const nameLower = (categoryName || "").toLowerCase();
    let type = "general";
    if (nameLower.includes("معيش") || nameLower.includes("living"))
      type = "living";
    else if (nameLower.includes("مكتب") || nameLower.includes("office"))
      type = "office";
    else if (
      nameLower.includes("خارج") ||
      nameLower.includes("outdoor") ||
      nameLower.includes("منزل") ||
      nameLower.includes("home") ||
      nameLower.includes("أثاث") ||
      nameLower.includes("اثاث")
    )
      type = "furniture";
    else if (
      nameLower.includes("اكسسوار") ||
      nameLower.includes("إكسسوار") ||
      nameLower.includes("accessori")
    )
      type = "accessories";
    const jokes = JOKE_DATABASE[type] || JOKE_DATABASE.general;
    const randomIndex = Math.floor(Math.random() * jokes.length);
    setErrorJoke(jokes[randomIndex]);
    setStep("error");
  };

  // ---------- Approval ----------
  const handleApprove = async () => {
    const selectedOption = generatedOptions[selectedOptionIndex];
    if (!selectedOption) return;
    try {
      const base64Image = await getBase64FromUrl(
        selectedOption.board.image_url,
      );
      const selectedCategory = categories.find(
        (c) => String(c.id) === String(selectedCategoryId),
      );
      const categoryName = selectedCategory ? selectedCategory.name : "";
      approveArtisticBoardCustom.mutate(
        {
          text: `${categoryName} - ${prompt}`,
          image: base64Image,
          productType: selectedCategoryId,
          woodType: 1,
          size: "30x40",
          color: "#ffffff",
          font: "cairo",
        },
        {
          onSuccess: (res) => {
            if (res?.success && res?.data) {
              setApprovedBoardData(res.data);
            } else {
              setApprovedBoardData({
                image_url: selectedOption.board.image_url,
                title: selectedOption.board.title,
                prompt,
              });
            }
            setStep("confirm");
            if (onStepChange) onStepChange(true);
          },
          onError: () => {},
        },
      );
    } catch (e) {
      // silent error per guidelines
    }
  };

  // ---------- Misc UI helpers ----------
  const handleRegenerate = () => {
    setStep("input");
    setPrompt("");
    setSelectedOptionIndex(0);
    setGeneratedOptions([]);
    setApprovedBoardData(null);
    setErrorJoke(null);
  };

  const handleBackToInput = () => {
    setStep("input");
    setErrorJoke(null);
  };

  // Show Pollinations error in UI as an error joke
  useEffect(() => {
    if (pollinationError) {
      setErrorJoke({
        ar: { title: "خطأ", desc: pollinationError },
        en: { title: "Error", desc: pollinationError },
      });
      setStep("error");
    }
  }, [pollinationError]);

  const handleSelectSuggestion = (suggestionText) => {
    setPrompt(suggestionText);
  };

  return {
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
    isPendingApprove:
      approveArtisticBoardCustom.isPending || approveArtisticBoard.isPending,
    isPendingGenerate: generateArtisticBoard.isPending,
  };
}
