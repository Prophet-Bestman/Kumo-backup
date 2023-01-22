import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
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

const UsdToNaira = ({ data, loading }) => {
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

  const successToast = () => {
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
    <Box display="flex" rounded="md" bg="white" py="12" px="6" shadow="md">
      {loading ? (
        <Spinner mx="auto" size="lg" />
      ) : (
        <Box w={"full"}>
          <LargeHeading color="app.primary.700" fontSize="20px">
            Naira to Dollar Rate
          </LargeHeading>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Stack mt="4">
              <Text fontSize="14px">NGN To USD</Text>
              <InputGroup>
                <InputLeftElement px="0">
                  <Text
                    fontSize="20"
                    color={"app.primary.700"}
                    fontWeight={700}
                  >
                    N
                  </Text>
                </InputLeftElement>
                <Input
                  {...register("value")}
                  type="number"
                  defaultValue={data?.value}
                />
              </InputGroup>
              <InputError msg={errors?.value?.message} />
            </Stack>

            <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
              Update
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default UsdToNaira;
