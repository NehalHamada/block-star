import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/Input.jsx";
import { Button } from "./ui/Button.jsx";
import { useChangePassword } from "../hooks/queries/useProfile.js";
import { useTranslation } from "react-i18next";

export const ChangePassword = () => {
  const { t } = useTranslation();
  const { mutate: changePasswordData, isPending: isChangingPassword } =
    useChangePassword();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp_code: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const onSubmit = (data) => {
    // Send as plain JSON — backend expects application/json, not multipart/form-data
    changePasswordData(
      {
        otp: data.otp_code,
        new_password: data.new_password,
        new_password_confirmation: data.new_password_confirmation,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5"
      >
        {/* OTP Code */}
        <Controller
          name="otp_code"
          control={control}
          rules={{ required: t("validation.required") }}
          render={({ field }) => (
            <Input
              {...field}
              label={t("auth.verify")}
              type="text"
              placeholder={t("auth.otpVerifyDesc")}
              error={errors.otp_code?.message}
            />
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* New Password */}
          <Controller
            name="new_password"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.newPasswordLabel")}
                type="password"
                placeholder={t("forms.newPasswordPlaceholder")}
                error={errors.new_password?.message}
              />
            )}
          />

          {/* Confirm New Password */}
          <Controller
            name="new_password_confirmation"
            control={control}
            rules={{
              required: t("validation.required"),
              minLength: {
                value: 6,
                message: t("validation.passwordMin"),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.confirmPasswordLabel")}
                type="password"
                placeholder={t("forms.confirmPasswordPlaceholder")}
                error={errors.new_password_confirmation?.message}
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            className="w-full sm:w-auto px-12"
            disabled={isChangingPassword}
          >
            {isChangingPassword
              ? t("profile.changingPassword")
              : t("profile.changePassword")}
          </Button>
        </div>
      </form>
    </div>
  );
};
