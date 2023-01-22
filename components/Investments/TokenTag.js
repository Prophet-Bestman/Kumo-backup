import { Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useRemoveToken } from "api/investment";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { handleRequestError } from "utils/helpers";

const TokenTag = ({ token, id }) => {
  const {
    mutate: removeToken,
    data: deleteResp,
    error: deleteError,
    isLoading,
    reset: resetDelete,
  } = useRemoveToken();

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = (msg) => {
    toast({
      title: "Action Successful",
      description: msg,
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const handleDelete = () => {
    let payload = {
      id: id,
      data: {
        package_token: token,
      },
    };
    removeToken(payload);
  };

  useEffect(() => {
    if (!!deleteResp && deleteResp?.status === "success") {
      successToast("Succesfully Removed Token");
      resetDelete();
    }
  }, [deleteResp]);

  useEffect(() => {
    handleRequestError(deleteError);
    resetDelete();
  }, [deleteError]);

  return (
    <Flex
      px="4"
      py="2"
      shadow="sm"
      w="fit-content"
      bg="#00000009"
      alignItems="center"
      gap="2"
      rounded="sm"
    >
      <Text>{token}</Text>

      {!isLoading ? (
        <AiOutlineClose size="14px" cursor="pointer" onClick={handleDelete} />
      ) : (
        <Spinner size="xs" />
      )}
    </Flex>
  );
};

export default TokenTag;
