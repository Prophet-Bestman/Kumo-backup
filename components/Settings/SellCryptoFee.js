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
import { useUpdateSellCryptoFee } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { updateSendCryptoFeeSchema } from "utils/schema";

const SellCryptoFee = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateSendCryptoFeeSchema),
    defaultValues: { cost: data?.cost },
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Updated Sell Crypto Fee",
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
  } = useUpdateSellCryptoFee();

  const handleUpdate = (data) => {
    updateRate({ ...data, fee_name: "SELL_CRYPTO_FEE" });
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
        Sell Crypto Fee
      </LargeHeading>

      <form onSubmit={handleSubmit(handleUpdate)}>
        <Stack mt="4">
          <Text fontSize="14px">Cost</Text>
          <InputGroup>
            <InputLeftElement px="0">
              <Text fontSize="20" color={"app.primary.700"} fontWeight={700}>
                N
              </Text>
            </InputLeftElement>
            <Input {...register("cost")} type="number" />
          </InputGroup>
          <InputError msg={errors?.cost?.message} />
        </Stack>

        <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default SellCryptoFee;
