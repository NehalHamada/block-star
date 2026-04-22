import * as yup from "yup";

export const getHeadlineSchema = (t) =>
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
    city: yup.string().required(t("validation.cityRequired")),
    region: yup.string().required(t("validation.areaRequired")),
    address: yup.string().required(t("validation.addressDetailsRequired")),
    address_type_id: yup
      .mixed()
      .required(t("validation.addressTypeRequired"))
      .test(
        "not-empty",
        t("validation.addressTypeRequired"),
        (value) => value !== undefined && value !== null && value !== "",
      ),
  });
