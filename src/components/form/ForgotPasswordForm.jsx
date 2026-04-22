import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getEmailSchema } from "../../schema";
import { Button, Input } from "../ui";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../api/services/authService.jsx";
import { useTranslation } from "react-i18next";

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const schema = React.useMemo(() => getEmailSchema(t), [t]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await authService.forgotPassword({
        email: data.email,
      });

      // Show success message
      if (response?.message) {
        toast.success(response.message);
      } else {
        toast.success(t("validation.forgotSent"));
      }

      // Navigate to verify page
      navigate("/auth/verify", {
        state: { type: "forgot-password", email: data.email },
      });
    } catch (error) {
      console.error("Forgot password error:", error);

      // Handle validation errors
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((errorArray) => {
          if (Array.isArray(errorArray)) {
            errorArray.forEach((msg) => toast.error(msg));
          }
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(t("validation.otpError"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" w-full ">
      <p className="text-2xl font-bold text-center mb-8">
        {t("auth.forgotPasswordTitle")}
      </p>
      <p className="text-center text-base max-w-md mx-auto text-dark-gray mb-10">
        {t("auth.forgotPasswordDesc")}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("forms.emailLabel")}
              type="email"
              id="email"
              placeholder={t("forms.emailPlaceholder")}
              error={errors.email?.message}
              icon={<Mail size={20} className="text-dark-gray" />}
              className="!rounded-full"
            />
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {t("auth.sendCode")}
        </Button>
      </form>
    </div>
  );
}
