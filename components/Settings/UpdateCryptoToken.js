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
import { useUpdateCryptoToken } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { updateCryptoTokenSchema } from "utils/schema";

const UpdateCryptoToken = ({ isOpen, onClose, token }) => {
  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Succesfully Updated Token",
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
  } = useForm({
    resolver: yupResolver(updateCryptoTokenSchema),
    defaultValues: token,
  });

  const {
    mutate: updateToken,
    isLoading,
    data: updateResp,
    error: updateError,
    reset,
  } = useUpdateCryptoToken();

  const handleUpdate = (data) => {
    delete data.is_listed;
    updateToken({ ...data });
  };

  useEffect(() => {
    if (!!updateResp && updateResp?.status === "success") {
      successToast();
      reset();
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
          Update Token
        </LargeHeading>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Grid gap="4" mb="5">
            <Stack>
              <Text fontSize="14px"> Name</Text>
              <Input {...register("name")} />
              <InputError msg={errors?.name?.message} />
            </Stack>
            <Stack>
              <Text fontSize="14px">Code</Text>
              <Input {...register("code")} />
              <InputError msg={errors?.code?.message} />
            </Stack>
            <Stack>
              <Text fontSize="14px">Token to USD</Text>
              <Input {...register("token_to_usd")} type="tel" />
              <InputError msg={errors?.token_to_usd?.message} />
            </Stack>
          </Grid>

          <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
            Update Token
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default UpdateCryptoToken;
