import React, { useState } from "react";
import OTPInputField from "../OTPInputField.jsx";
import { Button } from "../ui";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../api/services/authService.jsx";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { getFriendlyErrorMessage } from "../../utils/errors.js";

export function OTPForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { type, email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError(t("validation.enterOtp"));
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (type === "register") {
        const response = await authService.verifyEmail({
          email: email,
          code: otp,
        });

        // Save token and user data
        if (response.data?.token) {
          login(response.data?.token);
        }

        // Show success message
        if (response.data?.message) {
          toast.success(response.data.message);
        } else {
          toast.success(t("validation.verifySuccess"));
        }

        // Navigate to home
        navigate("/");
      } else if (type === "forgot-password") {
        // For forgot password, use the correct endpoint
        const response = await authService.verifyEmailForResetPassword({
          email: email,
          code: otp,
        });
        // Show success message
        if (response.data?.message) {
          toast.success(response.data.message);
        } else {
          toast.success(t("validation.verifySuccess"));
        }
        navigate("/auth/reset-password", {
          state: { email, otp },
        });
      }
    } catch (error) {
      setError(t("validation.otpInvalid"));
      toast.error(getFriendlyErrorMessage(error, t, "validation.otpError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await authService.resendCode({ email });

      if (response.message) {
        toast.success(response.message);
      } else {
        toast.success(t("validation.resendSuccess"));
      }
    } catch (error) {
      toast.error(getFriendlyErrorMessage(error, t, "validation.resendError"));
    }
  };

  return (
    <div className="w-full">
      <p className="text-2xl font-bold text-center mb-8">
        {type === "forgot-password"
          ? t("auth.confirmIdentity")
          : t("auth.verifyAccount")}
      </p>
      <p className="text-center text-base max-w-md mx-auto text-dark-gray mb-10">
        {type === "forgot-password"
          ? t("auth.otpForgotDesc")
          : t("auth.otpVerifyDesc")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <OTPInputField value={otp} onChange={setOtp} />

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting || otp.length !== 6}
        >
          {t("auth.verify")}
        </Button>

        {/* Resend OTP */}
        <p className="text-center text-sm text-dark-gray">
          {t("auth.didNotReceiveCode")}{" "}
          <button
            type="button"
            className="text-secondary hover:underline font-medium"
            onClick={handleResendCode}
          >
            {t("auth.resendCode")}
          </button>
        </p>
      </form>
    </div>
  );
}
