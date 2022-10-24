import { createStandaloneToast } from "@chakra-ui/react";
import { statusColors, statuses } from "./constants";

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
  let approx = number.toFixed(2);
  return approx.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function underscoreToSpace(str = "") {
  return str.replace(/_/g, " ");
}

export const getStatusColor = (status) => {
  if (status?.toLocaleLowerCase() === statuses?.pending)
    return statusColors?.pending;
  if (
    status?.toLocaleLowerCase() === statuses?.failed ||
    status?.toLocaleLowerCase() === statuses?.inactive ||
    status?.toLocaleLowerCase() === statuses?.terminated
  )
    return statusColors?.failed;
  if (
    status?.toLocaleLowerCase() === statuses?.fulfilled ||
    status?.toLocaleLowerCase() === statuses?.ongoing ||
    status?.toLocaleLowerCase() === statuses?.active
  )
    return statusColors?.fulfilled;
};
