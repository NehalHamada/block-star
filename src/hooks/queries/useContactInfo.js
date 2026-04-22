import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import contactService from "../../api/services/contact.api.js";
import { toast } from "react-toastify";

export const useContactInfo = () => {
  return useQuery({
    queryKey: ["contact-info"],
    queryFn: () => contactService.getContactInfo(),
  });
};

export const useCreateContactMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contactMessage) =>
      contactService.createContactMessage(contactMessage),
    onSuccess: () => {
      toast.success("تم إرسال رسالتك بنجاح");
      // Refresh my-messages list so new message appears immediately
      queryClient.invalidateQueries({ queryKey: ["my-messages"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إرسال رسالتك");
    },
  });
};

export const useGetMyMessages = () => {
  return useQuery({
    queryKey: ["my-messages"],
    queryFn: () => contactService.getUserMessages(),
  });
};

export const useDeleteUserMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => contactService.deleteUserMessage(id),
    onSuccess: () => {
      toast.success("تم حذف رسالتك بنجاح");
      // Refresh my-messages list so deleted message disappears immediately
      queryClient.invalidateQueries({ queryKey: ["my-messages"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف رسالتك");
    },
  });
};
