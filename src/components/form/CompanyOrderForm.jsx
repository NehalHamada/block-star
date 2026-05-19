import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/Input.jsx";
import { Building2, Calendar, Mail, Phone, User } from "lucide-react";
import { CiStickyNote } from "react-icons/ci";
import { Button } from "../ui/Button.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCompanyOrderSchema } from "../../schema";
import { useCompanyOrders } from "../../hooks/queries/useCompanyOrders.js";
import { FormSelect } from "../DesignImage/FormSelect.jsx";
import { useTranslation } from "react-i18next";

export function CompanyOrderForm({ handleSuccess, services }) {
  const { t } = useTranslation();
  const schema = React.useMemo(() => getCompanyOrderSchema(t), [t]);
  const { mutate: createCompanyOrder, isPending } = useCompanyOrders();
  const today = new Date().toISOString().split("T")[0]; // e.g. "2026-02-25"

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const serviceOptions = React.useMemo(() => {
    if (!services) return [];
    const titles = services.map((s) => s.title).filter(Boolean);
    return Array.from(new Set(titles)).map((title) => ({
      label: title,
      value: title,
    }));
  }, [services]);

  const onSubmit = (data) => {
    // Map form field names to API field names
    const payload = {
      company_name: data.company_name,
      manager_name: data.manager_name,
      phone1: data.phone1,
      phone2: data.phone2 || undefined,
      email: data.email,
      service_type: data.service_type,
      description: data.description,
      expected_delivery: data.expected_delivery,
    };

    createCompanyOrder(payload, {
      onSuccess: () => {
        handleSuccess(true);
        reset();
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full mx-auto mb-10">
      {/* Section Title */}
      <p className="text-xl font-medium underline text-center my-5 md:my-0">
        {t("forms.companyOrderTitle")}
      </p>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          <Controller
            name="company_name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.companyNameLabel")}
                type="text"
                placeholder={t("forms.companyNamePlaceholder")}
                error={errors.company_name?.message}
                icon={<Building2 size={20} className="text-dark-gray" />}
              />
            )}
          />
          <Controller
            name="manager_name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.managerNameLabel")}
                type="text"
                placeholder={t("forms.managerNamePlaceholder")}
                error={errors.manager_name?.message}
                icon={<User size={20} className="text-dark-gray" />}
              />
            )}
          />

          <Controller
            name="phone1"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.phoneLabel")}
                type="text"
                placeholder={t("forms.phonePlaceholder")}
                error={errors.phone1?.message}
                icon={<Phone size={20} className="text-dark-gray" />}
              />
            )}
          />

          <Controller
            name="phone2"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.phoneExtraLabel")}
                type="text"
                placeholder={t("forms.phonePlaceholder")}
                error={errors.phone2?.message}
                icon={<Phone size={20} className="text-dark-gray" />}
              />
            )}
          />

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

          <Controller
            name="service_type"
            control={control}
            render={({ field }) => (
              <FormSelect
                className="block mb-1 text-sm font-medium text-dark-gray p-2"
                label={t("forms.serviceTypeLabel")}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                options={serviceOptions}
                error={errors.service_type?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.descriptionLabel")}
                type="text"
                placeholder={t("forms.descriptionPlaceholder")}
                error={errors.description?.message}
                icon={<CiStickyNote size={20} className="text-dark-gray" />}
              />
            )}
          />

          <Controller
            name="expected_delivery"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.deliveryDateLabel")}
                type="date"
                min={today}
                placeholder={t("forms.deliveryDateLabel")}
                error={errors.expected_delivery?.message}
                icon={<Calendar size={20} className="text-dark-gray" />}
              />
            )}
          />
        </div>

        <div className="flex justify-center max-w-xl mx-auto my-5 pt-5">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? t("forms.sendingOrder") : t("forms.sendOrder")}
          </Button>
        </div>
      </form>
    </div>
  );
}
