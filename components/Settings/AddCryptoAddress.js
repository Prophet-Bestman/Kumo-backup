import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateCryptoAddress, useUpdateSendCryptoFee } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { addCryptoAddressSchema } from "utils/schema";

const AddCryptoAddress = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCryptoAddressSchema),
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Updated Send Crypto Fee",
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
  } = useUpdateCryptoAddress();

  const handleUpdate = (data) => {
    updateRate(data);
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
          Send Crypto Fee
        </LargeHeading>

        <form onSubmit={handleSubmit(handleUpdate)}>
          <Stack mt="4">
            <Text fontSize="14px">Coin Name</Text>
            <Input {...register("coin_name")} />
            <InputError msg={errors?.coin_name?.message} />
          </Stack>

          <Stack mt="4">
            <Text fontSize="14px">Address</Text>
            <Input {...register("address")} />
            <InputError msg={errors?.address?.message} />
          </Stack>

          <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
            Update
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default AddCryptoAddress;
