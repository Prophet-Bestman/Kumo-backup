import { Box, Button, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateUserStatus } from "api/users";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { adminTextSchema } from "utils/schema";

const AdminText = ({ isOpen, onClose, user_id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(adminTextSchema) });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "You have successfully blocked this user",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const errorToast = (msg) => {
    toast({
      title: "Action Failed",
      description: msg,
      status: "error",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: updateUser,
    data: updateResp,
    error,
    isLoading,
    reset,
  } = useUpdateUserStatus();

  const handleBlock = (data) => {
    const payload = {
      _id: user_id,
      status: "suspended",
      admin_text: data?.admin_text,
    };
    updateUser(payload);
  };

  useEffect(() => {
    if (!!updateResp && updateResp?.status === "success") {
      successToast();
      reset();
      onClose();
    } else if (updateResp?.status === "failed") {
      errorToast(updateResp?.msg);
      reset();
      onClose();
    }
  }, [updateResp]);

  useEffect(() => {
    handleRequestError(error);
    reset();
  }, [error]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box bg="white" py="12" px="6">
        <LargeHeading color="app.primary.700" fontSize="20px">
          Admin Text
        </LargeHeading>

        <form onSubmit={handleSubmit(handleBlock)}>
          <Stack mt="4">
            <Text fontSize="14px">Admin Text</Text>

            <Textarea {...register("admin_text")} placeholder="" />
            <InputError msg={errors?.admin_text?.message} />
          </Stack>

          <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
            Block user
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default AdminText;
