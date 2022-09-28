import * as yup from "yup";

export const loginSchema = yup
  .object({
    name_field: yup.string().required("Email/Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const createAgentSchema = yup
  .object({
    agent_name: yup.string().required("Agent's Full name is required"),
    agent_email: yup
      .string()
      .required("Agent's Full name is required")
      .email("Enter a valid email"),
    agent_phone: yup
      .string()
      .required("Agent's Phone Number is required")
      .min(11, "Phone number must be 11 digits")
      .max(11, "Phone number must be 11 digits"),
    account_name: yup.string().required("Agent's Account name is required"),
    account_number: yup
      .string()
      .required("Agent's Account Number is required")
      .min(10, "Account number must be 10 digits")
      .max(10, "Account number must be 10 digits"),
    bank_name: yup.string().required("Agent's Bank name is required"),
  })
  .required();

export const addFilterSchema = yup
  .object({
    value: yup.string().required("A value is required"),
  })
  .required();

export const updateAgentSchema = yup
  .object({
    agent_name: yup.string().required("Agent's Full name is required"),
    agent_email: yup
      .string()
      .required("Agent's Full name is required")
      .email("Enter a valid email"),
    agent_phone: yup
      .string()
      .required("Agent's Phone Number is required")
      .min(11, "Enter a valid phone number")
      .max(14, "Enter a valid phone number"),
    account_name: yup.string().required("Agent's Account name is required"),
    account_number: yup
      .string()
      .required("Agent's Account Number is required")
      .min(10, "Account number must be 10 digits")
      .max(10, "Account number must be 10 digits"),
    bank_name: yup.string().required("Agent's Bank name is required"),
  })
  .required();

export const updateTransactionSchema = yup
  .object({
    admin_description: yup.string().required("Admin description is required"),
  })
  .required();
