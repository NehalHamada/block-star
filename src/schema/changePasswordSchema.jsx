import * as yup from "yup";

export const getChangePasswordSchema = (t) =>
  yup.object().shape({
    currentPassword: yup
      .string()
      .required(t("validation.currentPasswordRequired"))
      .min(6, t("validation.passwordMin")),
    password: yup
      .string()
      .required(t("validation.newPasswordRequired"))
      .min(6, t("validation.passwordMin")),
    confirmPassword: yup
      .string()
      .required(t("validation.passwordRequired"))
      .oneOf([yup.ref("password")], t("validation.passwordsNotMatch")),
  });
