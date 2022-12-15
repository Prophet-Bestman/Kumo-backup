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

export const updateUsdToNairaSchema = yup
  .object({
    value: yup.string().required("Value is required"),
  })
  .required();

export const updateSendCryptoFeeSchema = yup
  .object({
    cost: yup.string().required("Value is required"),
  })
  .required();

export const addCryptoAddressSchema = yup
  .object({
    coin_name: yup.string().required("Value is required"),
    address: yup.string().required("Wallet address is required"),
  })
  .required();

export const addCurrencySchema = yup
  .object({
    currency_name: yup.string().required("Currency name is required"),
    currency_code: yup.string().required("Currency code is required"),
  })
  .required();

export const addUtilitySchema = yup
  .object({
    utility_name: yup.string().required("Currency name is required"),
    utility_status: yup.string().required("Currency code is required"),
  })
  .required();

export const updateUtilitySchema = yup
  .object({
    utility_status: yup.string().required("Currency code is required"),
  })
  .required();

export const updateCurrencySchema = yup
  .object({
    currency_name: yup.string().required("Currency name is required"),
  })
  .required();

export const updateCryptoAddressSchema = yup
  .object({
    address: yup.string().required("Wallet address is required"),
  })
  .required();

export const updatePaypalSchema = yup
  .object({
    email: yup
      .string()
      .required("email address is required")
      .email("Enter a valid email"),
  })
  .required();

export const createPackageSchema = yup
  .object({
    package_name: yup.string().required("Package name is required"),
    token_name: yup.string().required("Token Name is required"),
    token_code: yup.string().required("Token Code is required"),
    package_duration: yup.string().required("Package duration is required"),
    package_apr: yup.string().required("Package Apr is required"),
    max_amount: yup.string().required("Max Amount  is required"),
    min_amount: yup.string().required("Min Amount  is required"),
    isFixed: yup.boolean().required("Min Amount  is required"),
  })
  .required();

export const updatePackageSchema = yup
  .object({
    package_name: yup.string().required("Package name is required"),
    package_apr: yup.string().required("Package Apr is required"),
    max_amount: yup.string().required("Max Amount  is required"),
    min_amount: yup.string().required("Min Amount  is required"),
    isFixed: yup.boolean().required("Min Amount  is required"),
  })
  .required();

export const addTokenSchema = yup
  .object({
    token_name: yup.string().required("Token Name is required"),
    token_code: yup.string().required("Token Code is required"),
  })
  .required();

export const fundWalletSchema = yup
  .object({
    currency_name: yup.string().required("Currency is required"),
    amount: yup.string().required("Amount is required"),
  })
  .required();

export const resetPinSchema = yup
  .object({
    pin: yup.string().required("Pin is required").min(4).max(4),
  })
  .required();

export const adminTextSchema = yup.object({
  admin_text: yup.string().required("Admin Text is required"),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required()
    .matches(
      /((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{8,18}\w)/,
      "Password should have at least one upper and lowercase, a number and a special character"
    )
    .min(7),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const createCryptoTokenSchema = yup
  .object({
    token_id: yup.string().required("Token ID is required"),
    name: yup.string().required("Token Name is required"),
    name: yup.string().required("Token Name is required"),
    code: yup.string().required("Token code is required"),
    token_to_usd: yup.string().required("Token Dollar rate is required"),
    token_to_naira: yup.string().required("Token Naira rate is required"),
  })
  .required();

export const updateCryptoTokenSchema = yup
  .object({
    name: yup.string().required("Token Name is required"),
    name: yup.string().required("Token Name is required"),
    code: yup.string().required("Token code is required"),
    token_to_usd: yup.string().required("Token Dollar rate is required"),
    token_to_naira: yup.string().required("Token Naira rate is required"),
    // is_listed: yup.string().required("Is listed is required"),
  })
  .required();
