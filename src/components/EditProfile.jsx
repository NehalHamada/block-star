import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/Input.jsx";
import { Mail, Phone } from "lucide-react";
import { Button } from "./ui/Button.jsx";
import { useUpdateProfileData } from "../hooks/queries/useProfile.js";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const EditProfile = ({ userData }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateProfileData, isPending } = useUpdateProfileData();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userData) {
      const nameParts = userData.name?.split(" ") || ["", ""];
      const [first_name = "", last_name = ""] = nameParts;
      reset({
        first_name,
        last_name,
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", `${data.first_name} ${data.last_name}`.trim());
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    updateProfileData(formData, {
      onSuccess: (response) => {
        toast.success(response?.message || t("profile.updateSuccess"));
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        setIsEditing(false);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            t("profile.updateError"),
        );
      },
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          {/* First Name */}
          <Controller
            name="first_name"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.firstNameLabel")}
                type="text"
                placeholder={t("forms.firstNamePlaceholder")}
                error={errors.first_name?.message}
                disabled={!isEditing}
              />
            )}
          />

          {/* Last Name */}
          <Controller
            name="last_name"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.lastNameLabel")}
                type="text"
                placeholder={t("forms.lastNamePlaceholder")}
                error={errors.last_name?.message}
                disabled={!isEditing}
              />
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: t("validation.required"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("validation.email"),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.emailLabel")}
                type="email"
                placeholder={t("forms.emailPlaceholder")}
                error={errors.email?.message}
                icon={<Mail size={20} className="text-dark-gray" />}
                disabled={!isEditing}
              />
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.phoneLabel")}
                type="text"
                placeholder={t("forms.phonePlaceholder")}
                error={errors.phone?.message}
                icon={<Phone size={20} className="text-dark-gray" />}
                disabled={!isEditing}
              />
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {!isEditing ? (
            <Button
              type="button"
              onClick={handleEdit}
              className="w-full sm:w-auto px-12"
            >
              {t("profile.edit")}
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="w-full sm:w-auto px-8"
              >
                {t("profile.cancel")}
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto px-12"
                disabled={isPending}
              >
                {isPending ? t("profile.saving") : t("profile.save")}
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
