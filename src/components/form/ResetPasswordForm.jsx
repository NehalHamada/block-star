import { Eye, EyeOff, Lock } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "../ui/index.js";
import { getResetPasswordSchema } from "../../schema/index.js";
import { toast } from "react-toastify";
import authService from "../../api/services/authService.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function ResetPasswordForm() {
  const { t } = useTranslation();
  const schema = React.useMemo(() => getResetPasswordSchema(t), [t]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};

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
    // Validate that we have email and OTP from navigation state
    if (!email || !otp) {
      toast.error(t("validation.missingInfo"));
      navigate("/auth/forgot-password");
      return;
    }

    const payload = {
      email: email,
      code: otp,
      password: data.password,
      password_confirmation: data.confirmPassword,
    };

    setIsSubmitting(true);
    try {
      const response = await authService.resetPassword(payload);

      // Show success message
      if (response.message) {
        toast.success(response.message);
      } else {
        toast.success(t("validation.resetSuccess"));
      }
      navigate("/auth/login");
    } catch (error) {
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
        toast.error(t("validation.resetError"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" w-full ">
      <p className="text-2xl font-bold text-center mb-8">
        {t("auth.resetPasswordTitle")}
      </p>
      <p className="text-center text-base max-w-md mx-auto text-dark-gray mb-10">
        {t("auth.resetPasswordDesc")}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* New Password Input */}
        <div className="relative">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.newPasswordLabel")}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={t("forms.newPasswordPlaceholder")}
                error={errors.password?.message}
                icon={<Lock size={20} className="text-dark-gray" />}
                className="!rounded-full"
              />
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-[52px] -translate-y-1/2 text-dark-gray cursor-pointer z-10 "
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.confirmPasswordLabel")}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder={t("forms.confirmPasswordPlaceholder")}
                error={errors.confirmPassword?.message}
                icon={<Lock size={20} className="text-dark-gray" />}
                className="!rounded-full"
              />
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute left-4 top-[52px] -translate-y-1/2 text-dark-gray cursor-pointer z-10 "
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {t("auth.resetPasswordTitle")}
        </Button>
      </form>
    </div>
  );
}
