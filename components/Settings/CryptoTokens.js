import { Box, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useDeleteCryptotToken, useGetCryptoTokens } from "api/settings";
import ConfirmModal from "components/ConfirmModal";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { handleRequestError } from "utils/helpers";
import { customScrollBar3 } from "utils/styles";
import UpdateCryptoToken from "./UpdateCryptoToken";

const CryptoTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const { data } = useGetCryptoTokens();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

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

  useEffect(() => {
    if (!!data && data?.data?.length > 0) {
      setTokens(data?.data);
    }
  }, [data]);

  const {
    mutate: deleteToken,
    data: deleteResp,
    isLoading,
    reset: resetDelete,
    error: deleteError,
  } = useDeleteCryptotToken();

  const handleDelete = () => {
    deleteToken(selectedToken);
  };

  useEffect(() => {
    if (!!deleteResp && deleteResp?.status === "success") {
      successToast("Succesfully Deleted Token");
      resetDelete();
      onDeleteClose();
    }
  }, [deleteResp]);

  useEffect(() => {
    handleRequestError(deleteError);
    resetDelete();
  }, [deleteError]);

  return (
    <Box rounded="md" bg="white" py="12" px="6" shadow="md" h="full">
      <LargeHeading color="app.primary.700" fontSize="20px">
        Crypto Tokens
      </LargeHeading>

      <Box overflowY="auto" h="280px" sx={customScrollBar3}>
        {tokens?.length > 0 &&
          tokens?.map((token, i) => (
            <Flex
              key={i}
              my="2"
              py="3"
              px="2"
              justifyContent="space-between"
              bg="#efefef"
            >
              <Text fontSize="14px" fontWeight="600">
                {token.name}
              </Text>

              <Flex gap="2">
                <AiFillEdit
                  color="app.primary"
                  cursor="pointer"
                  onClick={() => {
                    onUpdateOpen();
                  }}
                />
                <AiOutlineDelete
                  color="red"
                  cursor="pointer"
                  onClick={() => {
                    setSelectedToken(token?.token_id);
                    onDeleteOpen();
                  }}
                />
              </Flex>
              {isUpdateOpen && (
                <UpdateCryptoToken
                  onClose={onUpdateClose}
                  isOpen={isUpdateOpen}
                  token={token}
                />
              )}
            </Flex>
          ))}
      </Box>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        primaryFunc={{ name: "Delete Token", func: handleDelete }}
        message={"Are you sure you want to delete this token"}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default CryptoTokens;
