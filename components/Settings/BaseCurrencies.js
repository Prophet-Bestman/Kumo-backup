import {
  Box,
  Flex,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDeleteBaseCurrency, useGetBaseCurrency } from "api/settings";
import ConfirmModal from "components/ConfirmModal";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { handleRequestError } from "utils/helpers";
import { customScrollBar3 } from "utils/styles";
import UpdateBaseCurrency from "./UpdateBaseCurrency";

const BaseCurrencies = () => {
  const [baseCurrencies, setBaseCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const { data, isLoading } = useGetBaseCurrency();

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
      setBaseCurrencies(data?.data);
    }
  }, [data]);

  const {
    mutate: deleteBaseCurrency,
    isLoading: deleting,
    data: deleteResp,
    reset: resetDelete,
    error: deleteError,
  } = useDeleteBaseCurrency();

  useEffect(() => {
    if (!!deleteResp && deleteResp?.status === "success") {
      successToast("Succesfully Deleted Base Currency");
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
        Base Currencies
      </LargeHeading>

      <Box overflowY="auto" h="280px" sx={customScrollBar3}>
        {isLoading ? (
          <Spinner size="lg" mx="auto" />
        ) : (
          baseCurrencies?.length > 0 &&
          baseCurrencies?.map((baseCurrency, i) => (
            <Flex
              key={i}
              my="2"
              py="3"
              px="2"
              justifyContent="space-between"
              bg="#efefef"
              gap="6"
            >
              <Text fontSize="14px" fontWeight="600">
                {baseCurrency.name}
              </Text>

              <Text fontSize="14px" fontWeight="600" ml="auto">
                {baseCurrency.rate}
              </Text>

              <Flex gap="2">
                <AiFillEdit
                  color="app.primary"
                  cursor="pointer"
                  onClick={() => {
                    setSelectedCurrency(baseCurrency);
                    onUpdateOpen();
                  }}
                />
                <AiOutlineDelete
                  color="red"
                  cursor="pointer"
                  onClick={() => {
                    setSelectedCurrency(baseCurrency);
                    onDeleteOpen();
                  }}
                />
              </Flex>
              {isUpdateOpen && (
                <UpdateBaseCurrency
                  onClose={onUpdateClose}
                  isOpen={isUpdateOpen}
                  baseCurrency={selectedCurrency}
                />
              )}
            </Flex>
          ))
        )}
      </Box>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        primaryFunc={{
          name: "Delete",
          func: () => deleteBaseCurrency(selectedCurrency.currency_id),
        }}
        message={"Are you sure you want to delete this token"}
        isLoading={deleting}
      />
    </Box>
  );
};

export default BaseCurrencies;
