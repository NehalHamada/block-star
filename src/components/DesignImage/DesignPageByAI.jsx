import { useState } from "react";
import { FormInput } from "./FormInput";
import { Button } from "../ui";
import { FaPaintBrush } from "react-icons/fa";
import {
  AiOutlineCheckCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import useStudio from "../../hooks/queries/useStudio";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BiSolidCheckCircle } from "react-icons/bi";

export function DesignPageByAI({ onStepChange }) {
  const { t } = useTranslation();
  const [step, setStep] = useState("input"); // 'input' | 'loading' | 'result' | 'confirm'
  const [prompt, setPrompt] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [generatedOptions, setGeneratedOptions] = useState([]); // API options array
  const [approvedBoardData, setApprovedBoardData] = useState(null); // from approve API response

  const { generateArtisticBoard, approveArtisticBoard } = useStudio();

  // Handle generate button click — calls real API
  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setStep("loading");

    generateArtisticBoard.mutate(
      { prompt },
      {
        onSuccess: (data) => {
          if (data?.success && data?.options?.length > 0) {
            setGeneratedOptions(data.options);
            setSelectedOptionIndex(0);
            setStep("result");
          } else {
            toast.error(t("studio.generateError"));
            setStep("input");
          }
        },
        onError: () => {
          toast.error(t("studio.serverError"));
          setStep("input");
        },
      },
    );
  };

  // Handle approve — sends selected option's id to API
  const handleApprove = () => {
    const selectedOption = generatedOptions[selectedOptionIndex];
    if (!selectedOption) return;

    approveArtisticBoard.mutate(selectedOption.board.id, {
      onSuccess: (res) => {
        if (res?.success && res?.data) {
          setApprovedBoardData(res.data);
        }
        setStep("confirm");
        if (onStepChange) onStepChange(true);
        toast.success(t("studio.approveSuccess"));
      },
      onError: () => {
        toast.error(t("studio.approveError"));
      },
    });
  };

  // Handle regenerate
  const handleRegenerate = () => {
    setStep("input");
    setPrompt("");
    setSelectedOptionIndex(0);
    setGeneratedOptions([]);
    setApprovedBoardData(null);
  };

  // --- Loading State ---
  if (step === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="flex justify-center">
            <AiOutlineLoading3Quarters className="text-6xl text-secondary animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-dark-gray">
              {t("studio.generating")}
            </h2>
            <p className="text-dark-gray">{t("studio.generatingDesc")}</p>
          </div>
        </div>
      </div>
    );
  }

  // --- Result State ---
  if (step === "result") {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Prompt Display */}
          <div className="w-full border-2 border-light-gray min-h-[100px] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaPaintBrush />
              <p className="text-dark-gray flex-1">{prompt}</p>
            </div>
          </div>

          {/* Generated Designs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {generatedOptions.map((option, index) => (
              <div
                key={option.board.id}
                className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${selectedOptionIndex === index
                    ? "ring-4 ring-secondary shadow-lg"
                    : "hover:shadow-md"
                  }`}
                onClick={() => setSelectedOptionIndex(index)}
              >
                <img
                  src={option.board.image_url}
                  alt={option.style_name ?? t("studio.finalDesign") + " " + (index + 1)}
                  className="w-full h-auto aspect-[4/3] object-cover"
                />

                {/* Option label */}
                <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {option.style_name ?? `${t("studio.option")} ${option.option}`}
                </div>

                {/* Selected Indicator */}
                {selectedOptionIndex === index && (
                  <div className="absolute top-3 left-3 bg-black/80 rounded-full p-1">
                    <BiSolidCheckCircle className="text-white text-2xl" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
            <Button onClick={handleRegenerate} className="w-full">
              {t("studio.editDesign")}
            </Button>
            <Button
              onClick={handleApprove}
              variant="outline"
              className="w-full"
              disabled={approveArtisticBoard.isPending}
            >
              {approveArtisticBoard.isPending ? (
                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              ) : (
                t("studio.approveDesign")
              )}
            </Button>
          </div>

          {/* Regenerate Link */}
          <div className="text-center pt-4">
            <button
              onClick={handleGenerate}
              disabled={generateArtisticBoard.isPending}
              className="inline-flex text-xl items-center gap-2 underline font-medium cursor-pointer disabled:opacity-50"
            >
              <FaPaintBrush />
              <span>{t("studio.regenerate")}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Confirm State ---
  if (step === "confirm") {
    // Use the real approved board data returned by the API
    const boardSvg =
      approvedBoardData?.image_url ??
      generatedOptions[selectedOptionIndex]?.board?.image_url;
    const boardTitle =
      approvedBoardData?.title ?? generatedOptions[selectedOptionIndex]?.board?.title;
    const boardPrompt = approvedBoardData?.prompt ?? prompt;

    return (
      <div className=" p-4 py-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-center text-2xl font-semibold underline decoration-2 underline-offset-4">
            {t("studio.confirmTitle")}
          </h1>

          {/* Board title from API */}
          {boardTitle && (
            <p className="text-center text-lg font-medium text-secondary">
              {boardTitle}
            </p>
          )}

          <div className="max-w-2xl mx-auto ">
            <img
              src={boardSvg}
              alt={boardTitle ?? t("studio.finalDesign")}
              className="w-full h-[300px] sm:h-[400px] object-contain rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2 justify-center py-2 px-2 w-[70%] bg-green-500/10 rounded-lg mx-auto">
            <span>
              <AiOutlineCheckCircle />
            </span>
            <span className="font-medium">{t("studio.designSaved")}</span>
          </div>

          {/* Prompt Display */}
          <div className="w-full border-2 border-light-gray min-h-[100px] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaPaintBrush />
              <p className="text-dark-gray flex-1">{boardPrompt}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Input State (Default) ---
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-10 px-4">
      <h1 className="text-center text-2xl font-semibold underline decoration-2 underline-offset-4">
        {t("studio.writeIdea")}
      </h1>

      <FormInput
        value={prompt}
        onChange={setPrompt}
        placeholder={t("studio.writeIdea")}
        prefix={<FaPaintBrush />}
        maxLength={300}
        showCounter
        multiline
      />

      {/* Generate Button */}
      <div className="flex justify-center pt-4 w-[50%] mx-auto">
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || generateArtisticBoard.isPending}
          className={`w-full ${prompt.trim()
              ? "bg-secondary text-white hover:bg-secondary/90 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {t("studio.generate")}
        </Button>
      </div>
    </div>
  );
}
