import { createStandaloneToast } from "@chakra-ui/react";
import { statusColors, statuses } from "./constants";
import commaNumber from "comma-number";

const { toast } = createStandaloneToast();

const errorToast = (title, msg) => {
  toast({
    title: title,
    description: msg,
    status: "error",
    duration: 3000,
    isClosable: true,
    variant: "subtle",
    position: "top",
  });
};

export const handleRequestError = (error) => {
  if (!!error) {
    if (error?.code === "ERR_NETWORK") {
      errorToast(
        "Network Error",
        "There's an issue with your network. Try again."
      );
    } else if (error?.response?.status === 500) {
      errorToast("Server Error", "We are sorry. Internal Server Error");
    } else if (error?.response?.status === 400) {
      errorToast("Bad Request ", error?.response?.data?.msg);
    } else if (error?.response?.status === 401) {
      errorToast("Autorization Error", error?.response?.data?.msg);
    } else
      errorToast(
        "Error Occured",
        error?.response?.data?.msg || error?.response?.statusText
      );
  }
};

export function numberWithCommas(number = 0) {
  let approx = parseFloat(number).toFixed(2);
  return commaNumber(approx);
}

export function cryptoNumberWithCommas(number = 0) {
  if (typeof number === "number") {
    let approx = parseFloat(number).toFixed(6);
    return commaNumber(approx);
  }
}

export function numberWithCommasNoDecimal(number = 0) {
  let approx = parseInt(number);
  return approx.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function underscoreToSpace(str = "") {
  if (!str) return str;
  else return str.replace(/_/g, " ");
}

export const getStatusColor = (status) => {
  if (typeof status === "boolean") {
    if (status) {
      return statusColors?.fulfilled;
    } else return statusColors?.failed;
  } else {
    if (status?.toLocaleLowerCase() === statuses?.pending)
      return statusColors?.pending;
    if (
      status?.toLocaleLowerCase() === statuses?.failed ||
      status?.toLocaleLowerCase() === statuses?.unverified ||
      status?.toLocaleLowerCase() === statuses?.inactive ||
      status?.toLocaleLowerCase() === statuses?.terminated
    )
      return statusColors?.failed;
    if (
      status?.toLocaleLowerCase() === statuses?.fulfilled ||
      status?.toLocaleLowerCase() === statuses?.ongoing ||
      status?.toLocaleLowerCase() === statuses?.verified ||
      status?.toLocaleLowerCase() === statuses?.active
    )
      return statusColors?.fulfilled;
  }
};

export function getWalletBalanceFromUser(user, wallet_name) {
  if (!user || !wallet_name) return;
  return (
    user?.wallet_balance?.find(
      (balance) =>
        balance?.name?.toLocaleLowerCase() === wallet_name?.toLocaleLowerCase()
    )?.value || 0
  );
}

export const flattenObject = (obj) => {
  const flattened = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value));
    } else {
      flattened[key] = value;
    }
  });

  return flattened;
};

export const filterBaseCurrency = (amount, transaction) => {
  if (
    transaction?.type !== "SELL CRYPTO" &&
    transaction?.type !== "BUY CRYPTO"
  ) {
    return amount;
  } else {
    return (
      (transaction?.type === "BUY CRYPTO" &&
        transaction.mode === "DEBIT" &&
        amount) ||
      (transaction?.type === "SELL CRYPTO" &&
        transaction.mode === "CREDIT" &&
        amount)
    );
  }
};

export const filterCrypto = (amount, transaction) => {
  if (
    transaction?.type !== "SELL CRYPTO" &&
    transaction?.type !== "BUY CRYPTO"
  ) {
    return amount;
  } else {
    return (
      (transaction?.type === "BUY CRYPTO" &&
        transaction.mode === "CREDIT" &&
        amount) ||
      (transaction?.type === "SELL CRYPTO" &&
        transaction.mode === "DEBIT" &&
        amount)
    );
  }
};
