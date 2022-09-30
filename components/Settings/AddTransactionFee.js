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
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateGeneralFee } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError, underscoreToSpace } from "utils/helpers";
import { updateSendCryptoFeeSchema } from "utils/schema";
import { customScrollBar3 } from "utils/styles";

const AddTransactionFee = ({ options, isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [feeError, setFeeError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(updateSendCryptoFeeSchema),
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Added Fee",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setFeeError(null);
  };

  const {
    mutate: updateRate,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useUpdateGeneralFee();

  const handleUpdate = (data) => {
    if (!selectedOption) {
      setFeeError("Select a fee name to continue");
    } else updateRate({ ...data, fee_name: selectedOption });
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
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box bg="white" py="12" px="6">
        <LargeHeading color="app.primary.700" fontSize="20px">
          Add A Transaction Fee
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
              {underscoreToSpace(selectedOption) || "Select fee to add"}
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
                  {underscoreToSpace(option)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <InputError msg={feeError} />

          <Stack mt="4">
            <Text fontSize="14px">Cost</Text>
            <InputGroup>
              <InputLeftElement px="0">
                <Text fontSize="20" color={"app.primary.700"} fontWeight={700}>
                  N
                </Text>
              </InputLeftElement>
              <Input {...register("cost")} type="number" placeholder="" />
            </InputGroup>
            <InputError msg={errors?.cost?.message} />
          </Stack>

          <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
            Add Fee
          </Button>

          <Button mt="4" h="48px" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default AddTransactionFee;
