import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import studioService from "../../api/services/studio.api";
import i18n from "../../i18n/index.js";

const useStudio = () => {
  const queryClient = useQueryClient();
  const generateArtisticBoard = useMutation({
    mutationFn: (data) => studioService.generateArtisticBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artistic-boards"] });
    },
  });
  const approveArtisticBoard = useMutation({
    mutationFn: (id) => studioService.approveArtisticBoard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artistic-boards"] });
    },
  });
  const approveArtisticBoardCustom = useMutation({
    mutationFn: (data) => studioService.approveCustomBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artistic-boards"] });
      toast.success(i18n.t("studio.successMsg"));
    },
    onError: (error) => {
      console.error("Design approval error:", error);
      toast.error(i18n.t("studio.errorMsg"));
    },
  });
  return {
    generateArtisticBoard,
    approveArtisticBoard,
    approveArtisticBoardCustom,
  };
};

export default useStudio;
