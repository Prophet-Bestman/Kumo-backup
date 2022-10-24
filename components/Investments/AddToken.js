import {
  Box,
  Button,
  Grid,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddToken } from "api/investment";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { addTokenSchema } from "utils/schema";

const AddToken = ({ isOpen, onClose, package_id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(addTokenSchema),
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Succesfully Added Package Token",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: addToken,
    data: createResp,
    isLoading,
    error: createError,
    reset,
  } = useAddToken();

  const handleCreate = (data) => {
    const payload = {
      id: package_id,
      data: {
        package_token: `${data?.token_name}(${data?.token_code})`,
      },
    };
    addToken(payload);
  };

  useEffect(() => {
    if (!!createResp && createResp?.status === "success") {
      successToast();
      resetField("token_name", "");
      resetField("token_code", "");
      reset();
      onClose();
    }
  }, [createResp]);

  useEffect(() => {
    handleRequestError(createError);
    reset();
  }, [createError]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box p="6">
        <LargeHeading>Add Package Token</LargeHeading>

        <form onSubmit={handleSubmit(handleCreate)}>
          <Grid my="6" rowGap="4">
            <Stack>
              <Text fontSize="12px">Token Name</Text>
              <Input {...register("token_name")} />
              <InputError msg={errors?.token_name?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Token Code</Text>
              <Input {...register("token_code")} />
              <InputError msg={errors?.token_code?.message} />
            </Stack>
          </Grid>
          <Button isLoading={isLoading} type="submit">
            Add Token
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default AddToken;
