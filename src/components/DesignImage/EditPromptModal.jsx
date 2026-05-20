import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { RefreshCw } from "lucide-react";

// RATIONALE: Keep UI separate from logic per SDD. This modal only collects a new prompt and returns it.

const schema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }).max(300, { message: "Prompt must be ≤ 300 characters" })
});

export default function EditPromptModal({ isOpen, currentPrompt, onClose, onSave }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { prompt: currentPrompt }
  });

  useEffect(() => {
    if (isOpen) reset({ prompt: currentPrompt });
  }, [isOpen, currentPrompt, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    onSave(data.prompt);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="relative w-full max-w-lg mx-4 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="mb-4 text-xl font-bold text-primary font-cairo text-center">
          {t("studio.editPromptTitle", { defaultValue: "Edit Prompt" })}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <textarea
            {...register("prompt")}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none font-cairo"
            placeholder={t("studio.writeIdea")}
          />
          {errors.prompt && (
            <p className="text-sm text-red-600 font-cairo">{errors.prompt.message}</p>
          )}
          <div className="flex justify-end space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 font-cairo text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
            >
              {t("studio.cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 font-cairo text-sm bg-primary hover:bg-primary/90 text-white rounded-md flex items-center"
            >
              {isSubmitting && <RefreshCw className="animate-spin mr-2" size={16} />}
              {t("studio.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
