import {
  Box,
  Button,
  Grid,
  Input,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDelistToken,
  useListToken,
  useListUnlistToken,
  useUpdateCryptoToken,
} from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { updateCryptoTokenSchema } from "utils/schema";

const UpdateCryptoToken = ({ isOpen, onClose, token }) => {
  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Succesfully Updated Token",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateCryptoTokenSchema),
    defaultValues: token,
  });

  const {
    mutate: updateToken,
    isLoading,
    data: updateResp,
    error: updateError,
    reset,
  } = useUpdateCryptoToken();

  const {
    mutate: delistToken,
    isLoading: delisting,
    data: delistResp,
    error: delistError,
    reset: delistReset,
  } = useDelistToken();

  const {
    mutate: listToken,
    isLoading: listingToken,
    data: listResp,
    error: listError,
    reset: listReset,
  } = useListToken();

  const handleUpdate = (data) => {
    delete data.is_listed;
    updateToken({ ...data });
  };

  const handleListing = (data) => {
    updateListing({ token_id: token?.token_id, data: { list: data } });
    token?.is_listed
      ? delistToken({ token_id: token?.token_id })
      : listToken({ token_id: token?.token_id });
  };

  useEffect(() => {
    if (!!updateResp && updateResp?.status === "success") {
      successToast();
      reset();
    }
    if (!!listResp && listResp?.status === "success") {
      successToast();
      listReset();
    }
    if (!!delistResp && delistResp?.status === "success") {
      successToast();
      delistReset();
    }
  }, [updateResp, listResp, delistResp]);

  useEffect(() => {
    handleRequestError(updateError);
    reset();
    handleRequestError(listError);
    listReset();
    handleRequestError(delistError);
    delistReset();
  }, [updateError, listError, delistError]);

  return (
    <ModalCard onClose={onClose} isOpen={isOpen}>
      <Box bg="white" py="12" px="6">
        <LargeHeading color="app.primary.700" fontSize="20px">
          Create Token
        </LargeHeading>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Grid gap="4" mb="5">
            <Stack>
              <Text fontSize="14px"> Name</Text>
              <Input {...register("name")} />
              <InputError msg={errors?.name?.message} />
            </Stack>
            <Stack>
              <Text fontSize="14px">Code</Text>
              <Input {...register("code")} />
              <InputError msg={errors?.code?.message} />
            </Stack>
            <Stack>
              <Text fontSize="14px">Token to USD</Text>
              <Input {...register("token_to_usd")} type="tel" />
              <InputError msg={errors?.token_to_usd?.message} />
            </Stack>
            {/* <Stack>
              <Text fontSize="14px">Token to Naira</Text>
              <Input {...register("token_to_naira")} type="tel" />
              <InputError msg={errors?.token_to_naira?.message} />
            </Stack> */}

            <Box>
              {token.is_listed ? (
                <Tag bg="green.100" color="green.500" py="2" px="3">
                  {token?.is_listed ? "Listed" : "Not Listed"}
                </Tag>
              ) : (
                <Tag bg="red.100" color="red.500" py="2" px="3">
                  {token?.is_listed ? "Listed" : "Not Listed"}
                </Tag>
              )}
            </Box>
          </Grid>

          <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
            Update Token
          </Button>

          <Button
            mt="4"
            h="48px"
            variant={"ghost"}
            onClick={() => handleListing(token.is_listed ? "false" : "true")}
            isLoading={listingToken || delisting}
          >
            {token.is_listed ? "Delist Token" : "List Token"}
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default UpdateCryptoToken;
