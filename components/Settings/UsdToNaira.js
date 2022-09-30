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
import { useUpdateUsdToDollar } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { updateUsdToNairaSchema } from "utils/schema";

const UsdToNaira = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateUsdToNairaSchema),
    defaultValues: { value: data?.value },
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = (msg) => {
    toast({
      title: "Action Successful",
      description: "Updated USD to NGN rate",
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
  } = useUpdateUsdToDollar();

  const handleUpdate = (data) => {
    updateRate(data);
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
        USD to Dollar Rate
      </LargeHeading>

      <form onSubmit={handleSubmit(handleUpdate)}>
        <Stack mt="4">
          <Text fontSize="14px">USD To NGN</Text>
          <InputGroup>
            <InputLeftElement px="0">
              <Text fontSize="20" color={"app.primary.700"} fontWeight={700}>
                N
              </Text>
            </InputLeftElement>
            <Input {...register("value")} type="number" />
          </InputGroup>
          <InputError msg={errors?.value?.message} />
        </Stack>

        <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default UsdToNaira;
