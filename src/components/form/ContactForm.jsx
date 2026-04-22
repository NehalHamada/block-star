import { Mail, Phone, User } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../ui/Input.jsx";
import { Button } from "../ui/Button.jsx";
import { useCreateContactMessage } from "../../hooks/queries/useContactInfo.js";
import { useTranslation } from "react-i18next";
import { getContactSchema } from "../../schema";

export function ContactForm() {
  const { t } = useTranslation();
  const schema = React.useMemo(() => getContactSchema(t), [t]);
  const { mutate: createContactMessage } = useCreateContactMessage();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (_data) => {
    createContactMessage(_data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7  my-5">
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("forms.firstNameLabel")}
              type="text"
              placeholder={t("forms.firstNamePlaceholder")}
              error={errors.first_name?.message}
              icon={<User size={20} className="text-dark-gray" />}
            />
          )}
        />
        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("forms.lastNameLabel")}
              type="text"
              placeholder={t("forms.lastNamePlaceholder")}
              error={errors.last_name?.message}
              icon={<User size={20} className="text-dark-gray" />}
            />
          )}
        />

        {/* Phone Input */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("forms.phoneLabel")}
              type="text"
              placeholder={t("forms.phonePlaceholder")}
              error={errors.phone?.message}
              icon={<Phone size={20} className="text-dark-gray" />}
            />
          )}
        />

        {/* Email Input */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("forms.emailLabel")}
              type="email"
              placeholder={t("forms.emailPlaceholder")}
              error={errors.email?.message}
              icon={<Mail size={20} className="text-dark-gray" />}
            />
          )}
        />
      </div>
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t("forms.messageLabel")}
            type="textarea"
            placeholder={t("forms.messagePlaceholder")}
            error={errors.message?.message}
            icon={<Mail size={20} className="text-dark-gray" />}
          />
        )}
      />
      <div className="flex justify-center max-w-xl mx-auto my-5 pt-5">
        <Button type="submit" className="w-full">
          {t("common.send")}
        </Button>
      </div>
    </form>
  );
}
