import {
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeleteCryptoAddress, useUpdateCryptoAddress } from "api/settings";
import ConfirmModal from "components/ConfirmModal";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError, underscoreToSpace } from "utils/helpers";
import { updateCryptoAddressSchema } from "utils/schema";
import { customScrollBar3 } from "utils/styles";

const UpdateCryptoWallet = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [walletError, setWalletError] = useState(null);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(updateCryptoAddressSchema),
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = (msg) => {
    toast({
      title: "Action Successful",
      description: msg,
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setWalletError(null);
  };

  useEffect(() => {
    if (!!selectedOption && !!selectedOption?.address) {
      setValue("address", selectedOption?.address);
    }
  }, [selectedOption]);

  const {
    mutate: updateWallet,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useUpdateCryptoAddress();

  const {
    mutate: deleteAddress,
    data: deleteResp,
    isLoading: deleting,
    error: deleteError,
    reset: resetDelete,
  } = useDeleteCryptoAddress();

  const handleUpdate = (data) => {
    if (!selectedOption) {
      setWalletError("Select a Wallet to continue");
    } else updateWallet({ ...data, coin_name: selectedOption?.coin_name });
  };

  useEffect(() => {
    if (!!updateResp && updateResp?.status === "success") {
      successToast("Updated Wallet Address");
      reset();
    }
  }, [updateResp]);

  useEffect(() => {
    handleRequestError(updateError);
    reset();
  }, [updateError]);

  const handleDelete = () => {
    if (!!selectedOption) {
      const payload = { coin_name: selectedOption?.coin_name };
      deleteAddress(payload);
    }
  };

  useEffect(() => {
    if (!!deleteResp && deleteResp?.status === "success") {
      successToast("Deleted Wallet Address");
      resetDelete();
      onClose();
    }
  }, [deleteResp]);

  useEffect(() => {
    handleRequestError(deleteError);
    resetDelete();
  }, [deleteError]);

  return (
    <Box shadow={"md"} bg="white" py="12" px="6">
      <LargeHeading color="app.primary.700" fontSize="20px">
        Update Wallet Address
      </LargeHeading>

      <form onSubmit={handleSubmit(handleUpdate)}>
        <Stack mt="4">
          <Text fontSize="14px">Coin Name</Text>
          {/* <Input {...register("coin_name")} /> */}

          <Menu>
            <MenuButton
              size="sm"
              color="app.primary.500"
              bg="white"
              boxShadow="md"
              w="full"
              h="48px"
              my="4"
              borderWidth="1px"
              borderColor="app.primary.500"
              _hover={{
                bg: "app.primaryTrans",
              }}
              as={Button}
              sx={{
                boxShadow: " rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;",
              }}
            >
              {underscoreToSpace(selectedOption?.coin_name || "") ||
                "Select wallet update"}
            </MenuButton>

            <MenuList
              pos="relative"
              zIndex="docked"
              maxH="200px"
              overflowY="auto"
              sx={customScrollBar3}
            >
              {options?.map((option, i) => (
                <MenuItem
                  key={i}
                  fontWeight={500}
                  fontSize="14px"
                  onClick={() => handleSelect(option)}
                >
                  {underscoreToSpace(option?.coin_name)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <InputError msg={walletError} />
        </Stack>

        <Stack mt="4">
          <Text fontSize="14px">Address</Text>
          <Input {...register("address")} />
          <InputError msg={errors?.address?.message} />
        </Stack>

        <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
          Update
        </Button>
        {!!selectedOption?.coin_name && (
          <Button
            mt="4"
            h="48px"
            variant="outline"
            isLoading={isLoading}
            onClick={onOpen}
          >
            Delete
          </Button>
        )}
      </form>

      <ConfirmModal
        message={"Are you sure you want to delete this address?"}
        isLoading={deleting}
        primaryFunc={{ name: "Delete", func: handleDelete }}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default UpdateCryptoWallet;
