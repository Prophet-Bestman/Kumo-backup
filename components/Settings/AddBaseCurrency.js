import {
  Box,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddBaseCurrency } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { updateBaseCurrencySchema } from "utils/schema";

const AddBaseCurrency = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateBaseCurrencySchema),
  });

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

  const {
    mutate: addBaseCurrency,
    data: addResp,
    isLoading,
    error: addError,
    reset,
  } = useAddBaseCurrency();

  const handleUpdate = (data) => {
    addBaseCurrency(data);
  };

  useEffect(() => {
    if (!!addResp && addResp?.status === "success") {
      successToast("Added Kumo base currency");
      reset();
      onClose();
    }
  }, [addResp]);

  useEffect(() => {
    handleRequestError(addError);
    reset();
  }, [addError]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box display="flex" rounded="md" bg="white" py="12" px="6">
        <Box w="full">
          <LargeHeading color="app.primary.700" fontSize="20px">
            Add Base Currency
          </LargeHeading>

          <form onSubmit={handleSubmit(handleUpdate)}>
            <Stack mt="4">
              <Text fontSize="14px">Name</Text>

              <Input {...register("name")} />
              <InputError msg={errors?.name?.message} />
            </Stack>
            <Stack mt="4">
              <Text fontSize="14px">Code</Text>

              <Input {...register("code")} />
              <InputError msg={errors?.code?.message} />
            </Stack>
            <Stack mt="4">
              <Text fontSize="14px">Currency ID</Text>

              <Input {...register("currency_id")} />
              <InputError msg={errors?.currency_id?.message} />
            </Stack>

            <Stack mt="4">
              <Text fontSize="14px">Currency Symbol</Text>

              <Input {...register("symbol")} />
              <InputError msg={errors?.symbol?.message} />
            </Stack>

            <Stack mt="4">
              <Text fontSize="14px">Rate</Text>

              <Input {...register("rate")} />
              <InputError msg={errors?.rate?.message} />
            </Stack>

            <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
              Add Base Currency
            </Button>
          </form>
        </Box>
      </Box>
    </ModalCard>
  );
};

export default AddBaseCurrency;
