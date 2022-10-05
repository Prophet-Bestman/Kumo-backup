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
import { useUpdatePaypal } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { updatePaypalSchema } from "utils/schema";

const UpdatePaypal = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePaypalSchema),
    defaultValues: { email: data?.email },
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = (msg) => {
    toast({
      title: "Action Successful",
      description: "Updated Paypal Email",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: updatePaypalEmail,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useUpdatePaypal();

  const handleUpdate = (data) => {
    updatePaypalEmail(data);
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
    <Box rounded="md" bg="white" py="12" px="6" shadow="md">
      <LargeHeading color="app.primary.700" fontSize="20px">
        Paypal Email
      </LargeHeading>

      <form onSubmit={handleSubmit(handleUpdate)}>
        <Stack mt="4">
          <Text fontSize="14px">Email</Text>
          <Input {...register("email")} />
          <InputError msg={errors?.email?.message} />
        </Stack>

        <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default UpdatePaypal;
