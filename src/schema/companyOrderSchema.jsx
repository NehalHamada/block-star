import * as yup from "yup";

export const getCompanyOrderSchema = (t) =>
  yup.object().shape({
    company_name: yup.string().required(t("validation.companyNameRequired")),
    manager_name: yup.string().required(t("validation.managerNameRequired")),
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.emailRequired")),
    phone1: yup
      .string()
      .matches(/^[0-9]+$/, t("validation.phoneDigitsOnly"))
      .min(10, t("validation.phoneMinLength"))
      .required(t("validation.phoneRequired")),
    phone2: yup
      .string()
      .matches(/^[0-9]*$/, t("validation.phoneDigitsOnly"))
      .min(10, t("validation.phoneMinLength"))
      .optional()
      .nullable(),
    service_type: yup.string().required(t("validation.serviceTypeRequired")),
    description: yup.string().required(t("validation.descriptionRequired")),
    expected_delivery: yup
      .string()
      .required(t("validation.deliveryDateRequired"))
      .test(
        "is-today-or-future",
        t("validation.deliveryDateFuture"),
        (value) => {
          if (!value) return false;
          const today = new Date().toISOString().split("T")[0];
          return value >= today;
        },
      ),
  });
