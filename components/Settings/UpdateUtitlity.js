import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeleteUtility, useUpdateUtility } from "api/settings";
import ConfirmModal from "components/ConfirmModal";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError, underscoreToSpace } from "utils/helpers";
import { updateUtilitySchema } from "utils/schema";
import { customScrollBar3 } from "utils/styles";

const UpdateUtility = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [utilityError, setUtilityError] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(updateUtilitySchema),
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Updated Utility",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setUtilityError(null);
  };

  useEffect(() => {
    if (!!selectedOption && !!selectedOption?.utility_status) {
      setValue("utility_status", selectedOption?.utility_status);
    }
  }, [selectedOption]);

  const {
    mutate: updateUtility,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useUpdateUtility();

  const {
    mutate: deleteUtility,
    isLoading: deleting,
    data: deleteResp,
    reset: resetDelete,
    error: deleteError,
  } = useDeleteUtility();

  const handleUpdate = (data) => {
    if (!selectedOption) {
      setUtilityError("Select a utility to continue");
    } else
      updateUtility({ ...data, utility_name: selectedOption?.utility_name });
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

  const handleDelete = () => {
    if (!!selectedOption) {
      const payload = { utility_name: selectedOption?.utility_name };
      deleteUtility(payload);
    }
  };

  useEffect(() => {
    if (!!deleteResp && deleteResp?.status === "success") {
      successToast("Deleted Utility State");
      resetDelete();
      setSelectedOption(null);

      onClose();
    }
  }, [deleteResp]);

  useEffect(() => {
    handleRequestError(deleteError);
    resetDelete();
  }, [deleteError]);

  return (
    <Box rounded="md" bg="white" py="12" px="6" shadow="md">
      <LargeHeading color="app.primary.700" fontSize="20px">
        Update Utility
      </LargeHeading>

      <form onSubmit={handleSubmit(handleUpdate)}>
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
            {underscoreToSpace(selectedOption?.utility_name) ||
              "Select utility to update"}
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
                {underscoreToSpace(option?.utility_name)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <InputError msg={utilityError} />

        <Stack mt="4">
          <Text fontSize="14px">Utility Status</Text>

          <Select {...register("utility_status")} placeholder="">
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </Select>
          <InputError msg={errors?.utility_status?.message} />
        </Stack>

        <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
          Update
        </Button>

        {!!selectedOption?.utility_name && (
          <Button mt="4" h="48px" variant="outline" onClick={onOpen}>
            Delete
          </Button>
        )}
      </form>

      <ConfirmModal
        message={"Are you sure you want to delete this utility?"}
        isLoading={deleting}
        primaryFunc={{ name: "Delete", func: handleDelete }}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default UpdateUtility;
