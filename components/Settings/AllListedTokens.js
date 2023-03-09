import {
  Box,
  Circle,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDeleteCryptotToken, useGetAllListedTokens } from "api/settings";
import ConfirmModal from "components/ConfirmModal";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { handleRequestError } from "utils/helpers";
import { customScrollBar3 } from "utils/styles";
import UpdateCryptoToken from "./UpdateCryptoToken";

const AllListedTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const { data } = useGetAllListedTokens();

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
    deleteToken(selectedToken.token_id);
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
        All Listed Tokens
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
                    setSelectedToken(token);
                    onUpdateOpen();
                  }}
                />
                <AiOutlineDelete
                  color="red"
                  cursor="pointer"
                  onClick={() => {
                    setSelectedToken(token);
                    onDeleteOpen();
                  }}
                />
                <Circle
                  bg={token.is_listed ? "green.400" : "red.400"}
                  size="8px"
                  my="auto"
                />
              </Flex>
              {isUpdateOpen && (
                <UpdateCryptoToken
                  onClose={onUpdateClose}
                  isOpen={isUpdateOpen}
                  token={selectedToken}
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

export default AllListedTokens;
