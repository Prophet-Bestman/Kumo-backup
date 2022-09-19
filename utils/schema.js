import * as yup from "yup";

export const loginSchema = yup
  .object({
    name_field: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();
