import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useAuthContext } from "context/AuthProvider";
import { useMutation } from "react-query";
import { baseUrl } from "./baseUrl";

const request = `${baseUrl}/admin/auth`;

export const useLogin = () => {
  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Login Successful",
      description: "Redirecting...",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const { signIn } = useAuthContext();

  return useMutation(
    (values) => axios.post(request + "/login", values).then((res) => res.data),
    {
      onSuccess: (res) => {
        signIn(res.data);
        successToast();
      },
    }
  );
};
