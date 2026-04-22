import * as yup from "yup";

export const getRegisterSchema = (t) =>
  yup.object().shape({
    name: yup.string().required(t("validation.fullNameRequired")),
    phone: yup.string().required(t("validation.phoneRequired")),
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.emailRequired")),
    password: yup
      .string()
      .min(6, t("validation.passwordMin"))
      .required(t("validation.passwordRequired")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("validation.passwordsNotMatch"))
      .required(t("validation.passwordRequired")),
  });
