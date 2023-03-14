import { Box, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import {
  useDeleteCryptotToken,
  useGetAllDelistedTokens,
  useListToken,
} from "api/settings";
import ConfirmModal from "components/ConfirmModal";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { handleRequestError } from "utils/helpers";
import { customScrollBar3 } from "utils/styles";

const AllDelistedTokens = () => {
  const [selectedToken, setSelectedToken] = useState(null);
  const { data: delistedTokens, isLoading: loadingTokens } =
    useGetAllDelistedTokens();

  const { mutate: listToken, isLoading: listing } = useListToken();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

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
    if (deleteResp?.status === "success") {
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
        All Delisted Tokens
      </LargeHeading>

      <Box overflowY="auto" h="280px" sx={customScrollBar3}>
        {loadingTokens ? (
          <Spinner />
        ) : (
          delistedTokens?.data?.length > 0 &&
          delistedTokens?.data?.map((token, i) => (
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

              <Flex gap="2" color="app.primary.900">
                {listing && selectedToken?.token_id === token?.token_id ? (
                  <Spinner size="xs" />
                ) : (
                  <AiOutlineCheck
                    cursor="pointer"
                    fontSize="20px"
                    onClick={() => {
                      setSelectedToken(token);
                      listToken({ token_id: token?.token_id });
                    }}
                  />
                )}
                <AiOutlineDelete
                  color="red"
                  cursor="pointer"
                  onClick={() => {
                    setSelectedToken(token);
                    onDeleteOpen();
                  }}
                />
              </Flex>
            </Flex>
          ))
        )}
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

export default AllDelistedTokens;
