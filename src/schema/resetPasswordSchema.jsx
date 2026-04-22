import * as yup from "yup";

export const getResetPasswordSchema = (t) =>
  yup.object().shape({
    password: yup
      .string()
      .required(t("validation.newPasswordRequired"))
      .min(6, t("validation.passwordMin")),
    confirmPassword: yup
      .string()
      .required(t("validation.passwordRequired"))
      .oneOf([yup.ref("password")], t("validation.passwordsNotMatch")),
  });
