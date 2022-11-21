import { Box, Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddCurrency, useUpdateCryptoAddress } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { addCurrencySchema } from "utils/schema";

const AddCurrency = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCurrencySchema),
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Added Wallet Address",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: addCurrency,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useAddCurrency();

  const handleUpdate = (data) => {
    addCurrency(data);
  };

  useEffect(() => {
    if (!!updateResp && updateResp?.status === "success") {
      successToast();
      reset();
      onClose();
    }
  }, [updateResp]);

  useEffect(() => {
    handleRequestError(updateError);
    reset();
  }, [updateError]);

  return (
    <ModalCard onClose={onClose} isOpen={isOpen}>
      <Box bg="white" py="12" px="6">
        <LargeHeading color="app.primary.700" fontSize="20px">
          Add Currency
        </LargeHeading>

        <form onSubmit={handleSubmit(handleUpdate)}>
          <Stack mt="4">
            <Text fontSize="14px">Currency Name</Text>
            <Input {...register("currency_name")} />
            <InputError msg={errors?.currency_name?.message} />
          </Stack>

          <Stack mt="4">
            <Text fontSize="14px">Currency Code</Text>
            <Input {...register("currency_code")} />
            <InputError msg={errors?.currency_code?.message} />
          </Stack>

          <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
            Add Currency
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default AddCurrency;
