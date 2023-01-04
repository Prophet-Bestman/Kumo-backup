import {
  Box,
  Button,
  Grid,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSetCoinRate } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { updateCoinRateSchema } from "utils/schema";

const CoinRate = ({ data, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateCoinRateSchema),
    defaultValues: data,
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = (msg) => {
    toast({
      title: "Action Successful",
      description: "Updated Coin Rate",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: updateCoinRate,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useSetCoinRate();

  const handleUpdate = (data) => {
    updateCoinRate(data);
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
        <Spinner size="lg" mx="auto" />
      ) : (
        <Box w="full" mx="auto">
          <LargeHeading color="app.primary.700" fontSize="20px">
            Update Coin Rate
          </LargeHeading>

          <form onSubmit={handleSubmit(handleUpdate)}>
            <Grid gap="4" my="4">
              <Stack>
                <Text fontSize="14px">Buy Rate</Text>
                <Input {...register("buy_rate")} type="tel" />
                <InputError msg={errors?.buy_rate?.message} />
              </Stack>
              <Stack>
                <Text fontSize="14px">Sell Rate</Text>
                <Input {...register("sell_rate")} type="tel" />
                <InputError msg={errors?.sell_rate?.message} />
              </Stack>
            </Grid>

            <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
              Update
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default CoinRate;
