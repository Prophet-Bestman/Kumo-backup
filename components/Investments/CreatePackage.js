import {
  Box,
  Button,
  Grid,
  Input,
  Stack,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePackage } from "api/investment";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import { useAuthContext } from "context/AuthProvider";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { createPackageSchema } from "utils/schema";

const CreatePackage = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createPackageSchema) });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Succesfully Created Investment Package",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: createPackage,
    data: createResp,
    isLoading,
    error: createError,
    reset,
  } = useCreatePackage();

  const handleCreate = (data) => {
    const payload = {
      ...data,
      package_token: `${data?.token_name}(${data?.token_code})`,
      admin_creator_id: user?.user_id,
      admin_creator_name: `${user?.first_name} ${user?.last_name}`,
    };
    createPackage(payload);
  };

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
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box py="6">
        <LargeHeading>Create Investment Package</LargeHeading>

        <form onSubmit={handleSubmit(handleCreate)}>
          <Grid rowGap="4" my="12">
            <Stack>
              <Text fontSize="12px">Name</Text>
              <Input {...register("package_name")} />
              <InputError msg={errors?.package_name?.message} />
            </Stack>
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
            <Stack>
              <Text fontSize="12px">Package Duration</Text>
              <Input {...register("package_duration")} type="number" />
              <InputError msg={errors?.package_duration?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Package Apr</Text>
              <Input {...register("package_apr")} />
              <InputError msg={errors?.package_apr?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Max Amount</Text>
              <Input {...register("max_amount")} type="number" />
              <InputError msg={errors?.max_amount?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Min Amount</Text>
              <Input {...register("min_amount")} type="number" />
              <InputError msg={errors?.min_amount?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Is Fixed?</Text>
              <Switch {...register("isFixed")} />
              <InputError msg={errors?.isFixed?.message} />
            </Stack>

            <Button isLoading={isLoading} type="submit">
              Create
            </Button>
          </Grid>
        </form>
      </Box>
    </ModalCard>
  );
};

export default CreatePackage;
