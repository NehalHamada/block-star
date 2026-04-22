import * as yup from "yup";

export const getEmailSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.emailRequired")),
  });
