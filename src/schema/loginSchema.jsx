import * as yup from "yup";

export const getLoginSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t("validation.emailRequired"))
      .email(t("validation.email")),
    password: yup
      .string()
      .required(t("validation.passwordRequired") || t("validation.required"))
      .min(6, t("validation.passwordMin")),
  });
