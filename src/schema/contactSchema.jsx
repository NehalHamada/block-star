import * as yup from "yup";

export const getContactSchema = (t) =>
  yup.object().shape({
    first_name: yup.string().required(t("validation.firstNameRequired")),
    last_name: yup.string().required(t("validation.lastNameRequired")),
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.emailRequired")),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, t("validation.phoneDigitsOnly"))
      .min(10, t("validation.phoneMinLength"))
      .required(t("validation.phoneRequired")),
    message: yup.string().required(t("validation.required")),
  });
