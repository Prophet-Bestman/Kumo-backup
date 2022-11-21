import { Box, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useDeleteCurrency, useGetCurrencies } from "api/settings";
import ConfirmModal from "components/ConfirmModal";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { handleRequestError } from "utils/helpers";

const Currencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const { data } = useGetCurrencies();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose,
    onDeleteClose,
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
    if (!!data && data?.data?.currencies?.length > 0) {
      setCurrencies(data?.data?.currencies);
    }
  }, [data]);

  const {
    mutate: deleteCurrency,
    data: deleteResp,
    isLoading,
    reset: resetDelete,
    error: deleteError,
  } = useDeleteCurrency();

  console.log(currencies);

  const handleDelete = () => {
    deleteCurrency(selectedCurrency);
  };

  useEffect(() => {
    if (!!deleteResp && deleteResp?.status === "success") {
      successToast("Succesfully Deleted Currency");
      resetDelete();
      onClose();
    }
  }, [deleteResp]);

  useEffect(() => {
    handleRequestError(deleteError);
    resetDelete();
  }, [deleteError]);

  return (
    <Box rounded="md" bg="white" py="12" px="6" shadow="md">
      <LargeHeading color="app.primary.700" fontSize="20px">
        Currencies
      </LargeHeading>

      <Box>
        {currencies?.length > 0 &&
          currencies?.map((currency, i) => (
            <Flex
              key={i}
              my="2"
              py="3"
              px="2"
              justifyContent="space-between"
              bg="#efefef"
            >
              <Text fontSize="14px" fontWeight="600">
                {currency.currency_name}
              </Text>

              <AiOutlineDelete
                color="red"
                cursor="pointer"
                onClick={() => {
                  setSelectedCurrency(currency?.currency_name);
                  onDeleteOpen();
                }}
              />
            </Flex>
          ))}
      </Box>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        primaryFunc={{ name: "Delete Currency", func: handleDelete }}
        message={"Are you sure you want to delete this currency"}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Currencies;
