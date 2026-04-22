import React from "react";
import { Button, Header } from "../components";
import { useNavigate } from "react-router-dom";
import { HeadlineCard } from "../components/HeadlineCard";
import {
  useDeleteHeadline,
  useHeadlines,
} from "../hooks/queries/useHeadlines.js";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const Headlines = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const breadcrumbs = [
    { label: t("common.home"), path: "/" },
    { label: t("headlines.title"), path: null },
  ];

  const { data: headlines, isLoading, error } = useHeadlines();
  const { mutate: deleteHeadline, isPending: isDeleting } = useDeleteHeadline();

  const handleEdit = (headline) => {
    navigate("/add-new-headlines", { state: { headline } });
  };

  const handleDelete = (id) => {
    if (window.confirm(t("headlines.confirmDelete"))) {
      deleteHeadline(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["headlines"] });
          toast.success(t("headlines.deleteSuccess"));
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      });
    }
  };

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col gap-5 items-center justify-center py-5 mb-5">
          <p className="text-3xl font-bold font-noto">{t("headlines.title")}</p>
          <p className="max-w-2xl text-center text-lg text-dark-gray">
            {t("headlines.desc")}
          </p>
        </div>
        <div className="w-full max-w-xl border border-dashed border-secondary hover:bg-secondary/10 rounded-full mx-auto mb-8">
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => navigate("/add-new-headlines")}
          >
            {t("headlines.addNew")}
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-dark-gray text-lg">{t("headlines.loading")}</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{t("headlines.loadError")}</p>
            </div>
          ) : headlines?.data?.length > 0 ? (
            headlines?.data?.map((headline) => (
              <HeadlineCard
                key={headline.id}
                headline={headline}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={isDeleting}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-dark-gray text-lg">
                {t("headlines.noHeadlines")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
