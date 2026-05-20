import { useState } from "react";

/**
 * Pollinations AI hook – no API key or Turnstile token required.
 * Generates a Pollinations image URL and proxies it via images.weserv.nl
 * to bypass CORS/Turnstile restrictions. Returns the proxied URL
 * that can be used directly as an <img> source.
 *
 * RATIONALE: Cache the generated URL per prompt so that identical prompts
 * always return the same image, eliminating randomness. When Arabic text is
 * detected we append a simple hint "(Arabic text)" to help the service
 * interpret the prompt correctly.
 */
const promptCache = new Map();

export const usePollinationsAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const translatePrompt = async (prompt) => {
    // If Arabic characters detected, translate to English using Google Translate API (reliable, free for simple requests)
    if (/[\u0600-\u06FF]/.test(prompt)) {
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(prompt)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data && data[0]) {
          const translatedText = data[0].map((item) => item[0]).join("");
          return translatedText;
        }
      } catch (_) {
        // fallback to original prompt on translation failure
      }
    }
    return prompt;
  };

  const generateImage = async (prompt, variation = "") => {
    // Use a composite key for caching to differentiate variations
    const cacheKey = `${prompt}::${variation}`;
    if (promptCache.has(cacheKey)) {
      return promptCache.get(cacheKey);
    }
    setLoading(true);
    setError(null);
    try {
      const translated = await translatePrompt(prompt);
      // Append variation if provided (e.g., style cues)
      const finalPrompt = variation
        ? `${translated}, ${variation}`
        : translated;
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}`;
      const proxiedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(pollinationsUrl)}`;
      // Cache using the composite key
      promptCache.set(cacheKey, proxiedUrl);
      return proxiedUrl;
    } catch (e) {
      const msg = e?.message ?? "Unexpected error while building image URL.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateImage, translatePrompt, loading, error };
};
