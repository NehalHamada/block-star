import * as yup from "yup";

export const getShippingSchema = (t) =>
  yup.object().shape({
    billing_name: yup.string().required(t("validation.fullNameRequired")),
    billing_email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.emailRequired")),
    billing_phone: yup
      .string()
      .matches(/^[0-9]+$/, t("validation.phoneDigitsOnly"))
      .min(10, t("validation.phoneMinLength"))
      .required(t("validation.phoneRequired")),
    billing_phone2: yup
      .string()
      .matches(/^[0-9]*$/, t("validation.phoneDigitsOnly"))
      .optional(),
    address_id: yup.string().required(t("validation.addressRequired")),
    first_name: yup.string().when("address_id", {
      is: "new",
      then: (schema) => schema.required(t("validation.firstNameRequired")),
      otherwise: (schema) => schema.optional(),
    }),
    last_name: yup.string().when("address_id", {
      is: "new",
      then: (schema) => schema.required(t("validation.lastNameRequired")),
      otherwise: (schema) => schema.optional(),
    }),
    city: yup.string().when("address_id", {
      is: "new",
      then: (schema) => schema.required(t("validation.cityRequired")),
      otherwise: (schema) => schema.optional(),
    }),
    area: yup.string().when("address_id", {
      is: "new",
      then: (schema) => schema.required(t("validation.areaRequired")),
      otherwise: (schema) => schema.optional(),
    }),
    details: yup.string().when("address_id", {
      is: "new",
      then: (schema) => schema.required(t("validation.addressDetailsRequired")),
      otherwise: (schema) => schema.optional(),
    }),
    address_type_id: yup.mixed().when("address_id", {
      is: "new",
      then: (schema) =>
        schema
          .required(t("validation.addressTypeRequired"))
          .test(
            "not-empty",
            t("validation.addressTypeRequired"),
            (value) => value !== undefined && value !== null && value !== "",
          ),
      otherwise: (schema) => schema.optional(),
    }),
    notes: yup.string().optional(),
    payment_method: yup
      .string()
      .oneOf(
        ["cash_on_delivery", "myfatoorah"],
        t("validation.paymentMethodInvalid"),
      )
      .required(t("validation.paymentMethodRequired")),
  });
