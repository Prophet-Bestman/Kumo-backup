import {
  Box,
  Button,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateUtility } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { addUtilitySchema } from "utils/schema";

const AddUtility = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addUtilitySchema),
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Added Utility",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: updateUtility,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useUpdateUtility();

  const handleUpdate = (data) => {
    updateUtility(data);
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
          Add Utility
        </LargeHeading>

        <form onSubmit={handleSubmit(handleUpdate)}>
          <Stack mt="4">
            <Text fontSize="14px">Utility Name</Text>
            <Select {...register("utility_name")}>
              <option value="WAEC_PIN">WAEC PIN</option>
              <option value="NECO_PIN">NECO PIN</option>
              <option value="ELECTRICITY">ELECTRICITY</option>
              <option value="AIRTIME">AIRTIME</option>
              <option value="DATA">DATA </option>
            </Select>
            <InputError msg={errors?.utility_name?.message} />
          </Stack>

          <Stack mt="4">
            <Text fontSize="14px">Utility Status</Text>
            <Select {...register("utility_status")}>
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </Select>
            <InputError msg={errors?.utility_status?.message} />
          </Stack>

          <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
            Add Utility
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default AddUtility;
