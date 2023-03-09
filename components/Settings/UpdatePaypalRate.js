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
import { useUpdatePaypalRange } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { updatePaypalRangeSchema } from "utils/schema";

const UpdatePaypalRange = ({ paypalRange, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePaypalRangeSchema),
    defaultValues: { ...paypalRange },
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Updated Paypal Range",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: updatePaypalRange,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useUpdatePaypalRange();

  const handleUpdate = (data) => {
    updatePaypalRange({ ...data, fee_name: "FUND_WALLET_PAYPAL_FEE" });
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
        <Box w="full">
          <LargeHeading color="app.primary.700" fontSize="20px">
            Update Paypal Range
          </LargeHeading>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Grid gap="4" my="4">
              <Stack>
                <Text fontSize="14px">Range</Text>
                <Input {...register("range")} />
                <InputError msg={errors?.range?.message} />
              </Stack>
            </Grid>

            <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
              Update
            </Button>
          </form>
          {/* )} */}
        </Box>
      )}
    </Box>
  );
};

export default UpdatePaypalRange;
