import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDeleteBaseCurrency,
  useUpdateBaseCurrency,
  useUpdateUsdToDollar,
} from "api/settings";
import ConfirmModal from "components/ConfirmModal";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { updateBaseCurrencySchema } from "utils/schema";

const AddBaseCurrency = ({ baseCurrency }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(updateBaseCurrencySchema),
    defaultValues: baseCurrency,
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
    mutate: updateRate,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useUpdateBaseCurrency();

  const {
    mutate: deleteBaseCurrency,
    isLoading: deleting,
    data: deleteResp,
    reset: resetDelete,
  } = useDeleteBaseCurrency();

  const handleUpdate = (data) => {
    updateRate(data);
  };

  useEffect(() => {
    if (!!updateResp && updateResp?.status === "success") {
      successToast("Updated Kumo base currency");
      reset();
    }
  }, [updateResp]);

  useEffect(() => {
    handleRequestError(updateError);
    reset();
  }, [updateError]);

  useEffect(() => {
    if (!!deleteResp && deleteResp?.status === "success") {
      successToast("Succesfully deleted base currency");
      resetDelete();
      resetField("name");
      resetField("code");
      resetField("currency_id");
      onClose();
    }
  }, [deleteResp]);

  return (
    <Box rounded="md" bg="white" py="12" px="6" shadow="md">
      <LargeHeading color="app.primary.700" fontSize="20px">
        Update Base Currency
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
          <Text fontSize="14px">Current ID</Text>

          <Input {...register("currency_id")} />
          <InputError msg={errors?.currency_id?.message} />
        </Stack>

        <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
          Update
        </Button>
      </form>
      {!!baseCurrency?.code && (
        <Button mt="4" h="48px" variant="link" color="red.400" onClick={onOpen}>
          Delete
        </Button>
      )}

      <ConfirmModal
        isLoading={deleting}
        isOpen={isOpen}
        message={"Are you sure you want to delete the base currency?"}
        onClose={onClose}
        primaryFunc={{
          name: "Delete",
          func: () => deleteBaseCurrency(baseCurrency?.code),
        }}
        secondaryFunc
      />
    </Box>
  );
};

export default AddBaseCurrency;
