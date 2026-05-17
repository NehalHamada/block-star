import React, { useEffect } from "react";
import { SkeletonLoader } from "../SkeletonLoader.jsx";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getShippingSchema } from "../../schema";
import { Input } from "../ui/Input.jsx";
import { User, Mail, Phone, Building2 } from "lucide-react";
import { CiStickyNote } from "react-icons/ci";
import { PaymentMethod } from "./PaymentMethod.jsx";
import { Button } from "../ui/Button.jsx";
import {
  useAddressTypes,
  useGovernorates,
  useHeadlines,
} from "../../hooks/queries/useHeadlines.js";
import { useCreateOrder } from "../../hooks/queries/useOrders.js";
import { FormSelect } from "../DesignImage/FormSelect.jsx";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const OrderForm = ({ onShippingCostChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = React.useMemo(() => getShippingSchema(t), [t]);
  const { mutate: createOrder, isPending: isCreating } = useCreateOrder();

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      address_id: "new",
      payment_method: "cash_on_delivery",
    },
  });

  const { data: addressResponse, isLoading: headlinesLoading } = useHeadlines();
  const { data: addressTypesResponse, isLoading: typesLoading } =
    useAddressTypes();
  const { data: governoratesResponse, isLoading: govLoading } =
    useGovernorates();

  const addresses = React.useMemo(
    () => addressResponse?.data || [],
    [addressResponse],
  );
  const addressTypes = React.useMemo(
    () => addressTypesResponse?.data || [],
    [addressTypesResponse],
  );
  const governorates = React.useMemo(
    () => governoratesResponse?.data || [],
    [governoratesResponse],
  );

  const selectedAddressId = watch("address_id");
  const selectedCity = watch("city");

  // Options for saved addresses dropdown
  const savedAddressOptions = React.useMemo(() => {
    const opts = addresses.map((item) => ({
      value: String(item.id),
      label: `${item.type?.name || t("common.address")} - ${item.city} (${item.full_name})`,
    }));
    return [{ value: "new", label: t("cart.selectSavedAddress") }, ...opts];
  }, [addresses, t]);

  // Options for address types dropdown (for new address)
  const typeOptions = React.useMemo(() => {
    return addressTypes.map((type) => ({
      value: String(type.id),
      label: type.name,
    }));
  }, [addressTypes]);

  // Options for governorates dropdown
  const cityOptions = React.useMemo(() => {
    return governorates.map((gov) => ({
      value: gov.name, // The API expects the name string usually, or you can use ID if the backend expects it.
      label: gov.name,
      shipping_cost: gov.shipping_cost,
    }));
  }, [governorates]);

  // Update shipping cost when address or city changes
  useEffect(() => {
    if (onShippingCostChange) {
      if (selectedAddressId === "new") {
        const gov = governorates.find((g) => g.name === selectedCity);
        onShippingCostChange(gov ? gov.shipping_cost : 0);
      } else {
        const addr = addresses.find((a) => String(a.id) === selectedAddressId);
        if (addr) {
          // If the address object has a city that matches a governorate
          const gov = governorates.find((g) => g.name === addr.city);
          onShippingCostChange(gov ? gov.shipping_cost : 0);
        } else {
          onShippingCostChange(0);
        }
      }
    }
  }, [
    selectedAddressId,
    selectedCity,
    governorates,
    addresses,
    onShippingCostChange,
  ]);

  const onSubmit = (data) => {
    const payload = {
      billing_name: data.billing_name,
      billing_email: data.billing_email,
      billing_phone: data.billing_phone,
      billing_phone2: data.billing_phone2,
      payment_method: data.payment_method,
      notes: data.notes,
    };

    if (data.address_id === "new") {
      Object.assign(payload, {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.billing_phone,
        city: data.city,
        area: data.area,
        details: data.details,
        address_type_id: data.address_type_id,
      });
    } else {
      payload.address_id = data.address_id;
    }

    createOrder(payload, {
      onSuccess: (response) => {
        const paymentUrl = response?.payment_url;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          toast.success(t("orders.successMsg"));
          navigate("/cart/payment-success");
        }
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || t("studio.errorMsg"));
      },
    });
  };

  if (headlinesLoading || typesLoading || govLoading) {
    return <SkeletonLoader variant="form" />;
  }

  return (
    <div className="flex flex-col gap-4 w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-lg sm:text-xl font-semibold underline font-cairo py-5">
          {t("cart.billingDetails")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Controller
            name="billing_name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.fullNameLabel")}
                type="text"
                placeholder={t("forms.fullNamePlaceholder")}
                error={errors.billing_name?.message}
                icon={<User size={20} className="text-dark-gray" />}
              />
            )}
          />

          <Controller
            name="billing_email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.emailLabel")}
                type="email"
                placeholder={t("forms.emailPlaceholder")}
                error={errors.billing_email?.message}
                icon={<Mail size={20} className="text-dark-gray" />}
              />
            )}
          />

          <Controller
            name="billing_phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.phoneLabel")}
                type="tel"
                placeholder={t("forms.phonePlaceholder")}
                error={errors.billing_phone?.message}
                icon={<Phone size={20} className="text-dark-gray" />}
              />
            )}
          />

          <Controller
            name="billing_phone2"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.phoneExtraLabel")}
                type="tel"
                placeholder={t("forms.phonePlaceholder")}
                error={errors.billing_phone2?.message}
                icon={<Phone size={20} className="text-dark-gray" />}
              />
            )}
          />
        </div>

        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("forms.notesLabel")}
              placeholder={t("forms.notesPlaceholder")}
              icon={<CiStickyNote size={20} />}
              error={errors.notes?.message}
            />
          )}
        />

        <h2 className="text-lg sm:text-xl font-semibold underline pt-8 font-cairo">
          {t("cart.shippingAddress")}
        </h2>

        <div className="mb-6">
          <Controller
            name="address_id"
            control={control}
            render={({ field }) => (
              <FormSelect
                className="block mb-1 text-sm font-medium text-dark-gray mt-5"
                label={t("cart.selectSavedAddress")}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                options={savedAddressOptions}
                error={errors.address_id?.message}
              />
            )}
          />
        </div>

        {selectedAddressId === "new" && (
          <div className="bg-secondary/5 p-4 rounded-xl space-y-4 mb-6 border border-secondary/10">
            <h3 className="text-md font-semibold font-cairo text-secondary underline">
              {t("cart.addNewAddress")}
            </h3>

            <Controller
              name="address_type_id"
              control={control}
              render={({ field }) => (
                <FormSelect
                  className="block mb-1 text-sm font-medium text-dark-gray"
                  label={t("forms.addressTypeLabel")}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  options={typeOptions}
                  error={errors.address_type_id?.message}
                />
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    className="block mb-1 text-sm font-medium text-dark-gray"
                    label={t("forms.cityLabel")}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    options={cityOptions}
                    error={errors.city?.message}
                  />
                )}
              />
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t("forms.areaLabel")}
                    type="text"
                    placeholder={t("forms.areaPlaceholder")}
                    error={errors.area?.message}
                  />
                )}
              />
            </div>
            <Controller
              name="details"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("forms.addressDetailsLabel")}
                  type="text"
                  placeholder={t("forms.addressDetailsPlaceholder")}
                  error={errors.details?.message}
                  icon={<Building2 size={20} className="text-dark-gray" />}
                />
              )}
            />
          </div>
        )}

        <PaymentMethod control={control} name="payment_method" />
        <div className="w-full max-w-md mx-auto">
          <Button className="w-full my-10" type="submit" disabled={isCreating}>
            {isCreating ? t("cart.confirmingOrder") : t("cart.confirmOrder")}
          </Button>
        </div>
      </form>
    </div>
  );
};
