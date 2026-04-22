import React from "react";
import {
  useGetMyMessages,
  useDeleteUserMessage,
} from "../hooks/queries/useContactInfo.js";
import { MessageSquare, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { SkeletonLoader } from "./SkeletonLoader.jsx";

export function MyMessages() {
  const { t } = useTranslation();
  const { data: messagesData, isLoading } = useGetMyMessages();
  // API returns: { data: [...] } or { data: { data: [...] } }
  const messages = Array.isArray(messagesData?.data?.data)
    ? messagesData.data.data
    : Array.isArray(messagesData?.data)
      ? messagesData.data
      : [];

  if (isLoading) {
    return <SkeletonLoader variant="messages" />;
  }

  if (!messages.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-dark-gray">
        <MessageSquare size={48} className="text-secondary/40" />
        <p className="text-lg font-medium">{t("profile.noMessages")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => (
        <MessageCard key={msg.id} msg={msg} />
      ))}
    </div>
  );
}

const MessageCard = ({ msg }) => {
  const { t, i18n } = useTranslation();
  const { mutate: deleteMessage, isPending: isDeleting } =
    useDeleteUserMessage();
  const queryClient = useQueryClient();

  const date = msg.sent_at
    ? new Date(msg.sent_at).toLocaleDateString(
        i18n.language === "ar" ? "ar-EG" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      )
    : null;

  const handleDelete = () => {
    deleteMessage(msg.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["my-messages"] });
      },
    });
  };

  return (
    <div className=" border border-gray-100 rounded-2xl p-5 shadow-sm bg-secondary/5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-dark">{msg.full_name}</p>
          <p className="text-sm text-dark-gray">{msg.email}</p>
          {msg.phone && <p className="text-sm text-dark-gray">{msg.phone}</p>}
        </div>

        <div className="flex items-center gap-2">
          {date && (
            <span className="text-xs text-dark-gray whitespace-nowrap bg-secondary/10 px-3 py-1 rounded-full">
              {date}
            </span>
          )}
          {/* Delete button */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
            title={t("profile.deleteMessage")}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Message Body */}
      <p className="text-dark-gray leading-relaxed border-t pt-3">
        {msg.message}
      </p>
    </div>
  );
};
