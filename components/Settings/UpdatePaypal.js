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
import { useUpdatePaypal } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { updatePaypalEmailSchema } from "utils/schema";

const UpdatePaypal = ({ data, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePaypalEmailSchema),
    defaultValues: data,
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
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
    mutate: updatePaypal,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useUpdatePaypal();

  const handleUpdate = (data) => {
    updatePaypal(data);
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
            Update Paypal
          </LargeHeading>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Grid gap="4" my="4">
              <Stack>
                <Text fontSize="14px">Email</Text>
                <Input {...register("email")} />
                <InputError msg={errors?.email?.message} />
              </Stack>
              {/* <Stack>
                <Text fontSize="14px">Range</Text>
                <Input {...register("rate")} />
                <InputError msg={errors?.rate?.message} />
              </Stack> */}
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

export default UpdatePaypal;
