import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button, Divider } from "../ui";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { getLoginSchema } from "../../schema";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../api/services/authService.jsx";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { startSocialLogin } from "../../utils/socialAuth.js";
import { getFriendlyErrorMessage } from "../../utils/errors.js";

export function LoginForm() {
  const { t, i18n } = useTranslation();
  const schema = React.useMemo(() => getLoginSchema(t), [t]);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      // Save token and user data
      if (response.data?.token) {
        login(response.data?.token);
      }

      // Show success message
      if (response.data?.message) {
        toast.success(response.data?.message);
      } else {
        toast.success(t("validation.loginSuccess"));
      }

      // Navigate to home
      navigate("/");
    } catch (error) {
      // Handle validation errors
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((errorArray) => {
          if (Array.isArray(errorArray)) {
            errorArray.forEach((msg) => toast.error(msg));
          }
        });
      } else {
        toast.error(getFriendlyErrorMessage(error, t, "validation.loginError"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await startSocialLogin("/auth/google/redirect");
    } catch (error) {
      // Handled silently
    }
  };


  return (
    <div className=" w-full ">
      <p className="text-2xl font-bold text-center mb-8">
        {t("auth.loginTitle")}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Google Login Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full "
          icon={<FcGoogle size={25} />}
        >
          {t("auth.googleLogin")}
        </Button>


        {/* Divider */}
        <Divider text={t("auth.or")} />

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

        {/* Password Input */}
        <div className="relative">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("forms.passwordLabel")}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={t("forms.passwordPlaceholder")}
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

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            to="/auth/forgot-password"
            className="text-sm hover:underline text-dark-gray"
          >
            {t("auth.forgotPasswordTitle")}
            {i18n.language === "ar" ? "؟" : "?"}
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {t("auth.login")}
        </Button>

        {/* Register Link */}
        <p className="text-center text-sm">
          {t("auth.noAccount")}{" "}
          <Link
            to="/auth/register"
            className="font-medium hover:underline text-secondary"
          >
            {t("auth.createNewAccount")}
          </Link>
        </p>
      </form>
    </div>
  );
}
