import React, { useEffect, useState, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../ui/Input.jsx";
import { Mail, Phone } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { FormSelect } from "../DesignImage/FormSelect.jsx";
import {
  useAddressTypes,
  useCreateHeadline,
  useUpdateHeadline,
} from "../../hooks/queries/useHeadlines.js";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getHeadlineSchema } from "../../schema";

export const AddNewHeadlinesFrom = () => {
  const { t } = useTranslation();
  const schema = useMemo(() => getHeadlineSchema(t), [t]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editingHeadline = location.state?.headline;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: editingHeadline?.full_name?.split(" ")[0] || "",
      last_name: editingHeadline?.full_name?.split(" ")[1] || "",
      phone: editingHeadline?.phone || "",
      email: editingHeadline?.email || "",
      city: editingHeadline?.city || "",
      region: editingHeadline?.area || "",
      address: editingHeadline?.details || "",
      address_type_id: editingHeadline?.type?.id || undefined,
    },
  });

  const { data: addressTypesData } = useAddressTypes();
  const [addressTypes, setAddressTypes] = useState([]);
  const { mutateAsync: createHeadline } = useCreateHeadline();
  const { mutateAsync: updateHeadline } = useUpdateHeadline();

  useEffect(() => {
    const fetchAddressTypes = async () => {
      try {
        const mapped = (addressTypesData?.data || []).map((type) => ({
          value: type.id,
          label: type.name,
        }));
        setAddressTypes(mapped);
      } catch (error) {
        console.error("Error fetching address types:", error);
      }
    };
    fetchAddressTypes();
  }, [addressTypesData]);

  const handleCreateHeadline = async (data) => {
    try {
      const response = await createHeadline(data);
      toast.success(response?.message || t("headlines.addSuccess"));
      queryClient.invalidateQueries({ queryKey: ["headlines"] });
      reset();
      navigate("/headlines");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleUpdateHeadline = async (id, formData) => {
    try {
      const response = await updateHeadline({ id, headline: formData });
      toast.success(response?.message || t("headlines.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: ["headlines"] });
      reset();
      navigate("/headlines");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("city", data.city);
    formData.append("area", data.region);
    formData.append("details", data.address);
    if (data.address_type_id) {
      formData.append("address_type_id", data.address_type_id);
    }

    try {
      if (editingHeadline) {
        handleUpdateHeadline(editingHeadline.id, formData);
      } else {
        handleCreateHeadline(formData);
      }
    } catch (error) {
      console.error("Error creating headline:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full mx-auto mb-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
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

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.cityLabel")}
                type="text"
                placeholder={t("forms.cityPlaceholder")}
                error={errors.city?.message}
              />
            )}
          />
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.areaLabel")}
                type="text"
                placeholder={t("forms.areaPlaceholder")}
                error={errors.region?.message}
              />
            )}
          />
        </div>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("forms.addressDetailsLabel")}
              type="text"
              placeholder={t("forms.addressDetailsPlaceholder")}
              error={errors.address?.message}
            />
          )}
        />
        <Controller
          name="address_type_id"
          control={control}
          render={({ field }) => (
            <FormSelect
              className="block mb-1 text-sm font-medium text-dark-gray mt-5"
              label={t("forms.addressTypeLabel")}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              options={addressTypes}
              error={errors.address_type_id?.message}
            />
          )}
        />
        <div className="flex justify-center max-w-xl mx-auto my-5 pt-5">
          <Button type="submit" className="w-full">
            {editingHeadline ? t("forms.update") : t("forms.add")}
          </Button>
        </div>
      </form>
    </div>
  );
};
