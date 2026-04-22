import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getRegisterSchema } from "../../schema";
import { Button, Divider, Input } from "../ui";
import {
  Eye,
  EyeOff,
  FacebookIcon,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import authService from "../../api/services/authService.jsx";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../api/axiosInstance.js";
import { FaFacebook } from "react-icons/fa";

export function RegisterForm() {
  const { t } = useTranslation();
  const schema = React.useMemo(() => getRegisterSchema(t), [t]);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      const registrationData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.confirmPassword,
      };

      const response = await authService.register(registrationData);
      // Show success message
      if (response.message) {
        toast.success(response.message);
      }
      // Navigate to verify page with email
      navigate("/auth/verify", {
        state: { type: "register", email: data.email },
      });
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
        toast.error(t("validation.registerError"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/google/redirect");

      if (data.success) {
        window.location.href = data.data.url;
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/facebook/redirect");
      if (data.success) {
        window.location.href = data.data.url;
      }
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  return (
    <div className=" w-full">
      <p className="text-2xl font-bold text-center mb-8">
        {t("auth.registerTitle")}
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
        <Button
          type="button"
          variant="outline"
          onClick={handleFacebookLogin}
          className="w-full "
          icon={<FaFacebook color="#1877F2" size={25} />}
        >
          {t("auth.facebookLogin")}
        </Button>

        {/* Divider */}
        <Divider text={t("auth.or")} />

        {/* Name Input */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("forms.fullNameLabel")}
              type="text"
              id="name"
              placeholder={t("forms.fullNamePlaceholder")}
              error={errors.name?.message}
              icon={<User size={20} className="text-dark-gray" />}
              className="rounded-full!"
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
              id="phone"
              placeholder={t("forms.phonePlaceholder")}
              error={errors.phone?.message}
              icon={<Phone size={20} className="text-dark-gray" />}
              className="rounded-full!"
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
              id="email"
              placeholder={t("forms.emailPlaceholder")}
              error={errors.email?.message}
              icon={<Mail size={20} className="text-dark-gray" />}
              className="rounded-full!"
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
                className="rounded-full!"
              />
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-12 -translate-y-1/2 text-dark-gray cursor-pointer z-10 "
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {/* Password Input */}
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
                placeholder={t("forms.passwordPlaceholder")}
                error={errors.confirmPassword?.message}
                icon={<Lock size={20} className="text-dark-gray" />}
                className="rounded-full!"
              />
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute left-4 top-12 -translate-y-1/2 text-dark-gray cursor-pointer z-10 "
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
          {t("auth.register")}
        </Button>

        {/* Register Link */}
        <p className="text-center text-sm">
          {t("auth.haveAccount")}{" "}
          <Link
            to="/auth/login"
            className="font-medium hover:underline text-secondary"
          >
            {t("auth.login")}
          </Link>
        </p>
      </form>
    </div>
  );
}
