import { createStandaloneToast } from "@chakra-ui/react";

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
      errorToast("Authentication Error", error?.response?.data?.msg);
    }
  }
};
