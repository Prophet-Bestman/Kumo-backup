import {
  Box,
  Button,
  Grid,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDebitWallet } from "api/utilities";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { fundWalletSchema } from "utils/schema";

const DebitWallet = ({ isOpen, onClose, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({ resolver: yupResolver(fundWalletSchema) });

  const toast = useToast();

  const successToast = () => {
    toast({
      title: "User's wallet Debited",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const {
    mutate: debitWallet,
    data: debitResp,
    error: debitError,
    isLoading,
    reset,
  } = useDebitWallet();

  const handleDebit = (data) => {
    const payload = {
      _id: user?._id,
      data: { ...data },
    };

    debitWallet(payload);
  };

  useEffect(() => {
    if (!!debitResp && debitResp?.status === "success") {
      successToast();
      resetField("currency_name");
      resetField("amount");
      reset();
      onClose();
    }
  }, [debitResp]);

  useEffect(() => {
    handleRequestError(debitError);
    reset();
  }, [debitError]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box p={6}>
        <LargeHeading fontSize="20px">Debit Wallet</LargeHeading>

        <form onSubmit={handleSubmit(handleDebit)}>
          <Grid rowGap="5" my="8">
            <Stack>
              <Text fontSize={"12px"} fontWeight="600">
                Currency
              </Text>
              <Select
                textTransform="capitalize"
                placeholder="Select Currency"
                {...register("currency_name")}
              >
                {user?.wallet_balance?.map((currency) => (
                  <option key={currency?.cryptoAddress} value={currency?.name}>
                    {currency?.name}
                  </option>
                ))}
              </Select>
              <InputError msg={errors?.currency_name?.message} />
            </Stack>
            <Stack>
              <Text fontSize={"12px"} fontWeight="600">
                Amount
              </Text>
              <Input {...register("amount")} type="tel" placeholder="500,000" />
              <InputError msg={errors?.amount?.message} />
            </Stack>

            <Button isLoading={isLoading} type="submit">
              Debit
            </Button>
          </Grid>
        </form>
      </Box>
    </ModalCard>
  );
};

export default DebitWallet;
