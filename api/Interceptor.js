import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useAuthContext } from "context/AuthProvider";
import React from "react";
import config from "utils/config";

const Interceptor = () => {
  const { signOut } = useAuthContext();

  const toast = useToast();
  const errorId = "error-toast";

  const errorToast = (text) =>
    toast({
      status: "error",
      title: "Error Occurred",
      position: "top",
      variant: "top-accent",
      size: "sm",
      duration: 2000,
      description: text,
      id: errorId,
    });

  axios.interceptors.request.use(
    (axiosConfig) => {
      const token = localStorage.getItem(config.key.token);
      if (!!token) {
        axiosConfig.headers.Authorization = `Bearer ${token}`;
      }
      return axiosConfig;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 401) {
          signOut();
          return;
        } else if (error?.response?.status === 404) {
          console.log("NOT FOUND");
          return;
        } else if (error.code === "ERR_BAD_REQUEST") {
          if (
            error?.response?.data?.message !== "token required" &&
            error?.response?.status !== 404
          )
            !toast.isActive(errorId) &&
              errorToast(
                error?.response?.data?.msg ||
                  error?.response?.data?.message ||
                  error.response.statusText
              );
        } else if (error.code === "ERR_NETWORK") {
          !toast.isActive(errorId) && errorToast(error?.message);
        } else {
          !toast.isActive(errorId) &&
            errorToast(
              error?.response?.data?.msg || error?.response?.data?.message
            );
        }
      } else if (error.request) {
      } else {
        // message.error(error?.response?.data?.msg);
      }

      return Promise.reject(error);
    }
  );
  return <div></div>;
};

export default Interceptor;
