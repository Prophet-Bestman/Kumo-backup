import { Box, Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateToken, useGetCryptoTokens } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { createCryptoTokenSchema } from "utils/schema";

const CreateToken = ({ isOpen, onClose }) => {
  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Succesfully Created Token",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createCryptoTokenSchema) });

  const {
    mutate: createToken,
    isLoading,
    data: createResp,
    error: createError,
    reset,
  } = useCreateToken();

  useEffect(() => {
    if (!!createResp && createResp?.status === "success") {
      successToast();
      reset();
      onClose();
    }
  }, [createResp]);

  useEffect(() => {
    handleRequestError(createError);
    reset();
  }, [createError]);

  return (
    <ModalCard onClose={onClose} isOpen={isOpen}>
      <Box bg="white" py="12" px="6">
        <LargeHeading color="app.primary.700" fontSize="20px">
          Create Token
        </LargeHeading>
        <form onSubmit={handleSubmit(createToken)}>
          <Stack mt="4">
            <Text fontSize="14px"> Token ID</Text>
            <Input {...register("token_id")} />
            <InputError msg={errors?.token_id?.message} />
          </Stack>
          <Stack mt="4">
            <Text fontSize="14px"> Name</Text>
            <Input {...register("name")} />
            <InputError msg={errors?.name?.message} />
          </Stack>
          <Stack mt="4">
            <Text fontSize="14px">Code</Text>
            <Input {...register("code")} />
            <InputError msg={errors?.code?.message} />
          </Stack>
          <Stack mt="4">
            <Text fontSize="14px">Price in USD</Text>
            <Input {...register("token_to_usd")} type="tel" />
            <InputError msg={errors?.token_to_usd?.message} />
          </Stack>
          {/* <Stack mt="4">
            <Text fontSize="14px">Price in Naira</Text>
            <Input {...register("token_to_naira")} type="tel" />
            <InputError msg={errors?.token_to_naira?.message} />
          </Stack> */}
          <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
            Create Token
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default CreateToken;
