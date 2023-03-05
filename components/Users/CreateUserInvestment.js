import {
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetPackages } from "api/investment";
import { useCreateUserInvestment } from "api/users";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";

import { customScrollBar3 } from "utils/styles";
import { updateInvestmentSchema } from "utils/schema";

const CreateUserInvestment = ({ isOpen, onClose, user }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputError, setInputError] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setInputError(null);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateInvestmentSchema) });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Successfully Created Investment",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const { data: packeagesResp, isLoading: loadingPackages } = useGetPackages();
  const watchedValue = watch("investment_amount");

  useEffect(() => {
    setInputError(null);
  }, [watchedValue]);

  const {
    mutate: createInvestment,
    data: createResp,
    error,
    isLoading,
    reset,
  } = useCreateUserInvestment();

  const submitInvestment = (data) => {
    if (
      !!data &&
      (data?.investment_amount < selectedOption?.min_amount ||
        data?.investment_amount > selectedOption?.max_amount)
    ) {
      setInputError(
        `Investment amonunt must be between ${selectedOption?.min_amount} and ${selectedOption?.max_amount} ${selectedOption?.package_token[0]}`
      );
    } else {
      const payload = {
        ...data,
        user_name: `${user?.first_name} ${user?.last_name}`,
        package_id: selectedOption?._id,
        investment_token: selectedOption?.package_token[0],
        investment_duration: selectedOption?.package_duration[0],
        investment_apr: selectedOption?.package_apr,
        user_id: user?._id,
      };
      createInvestment(payload);
    }
  };

  useEffect(() => {
    if (!!createResp && createResp?.status === "success") {
      successToast();
      reset();
      onClose();
    }
  }, [createResp]);

  useEffect(() => {
    handleRequestError(error);
    reset();
  }, [error]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box bg="white" py="12" px="6">
        <form onSubmit={handleSubmit(submitInvestment)}>
          <LargeHeading color="app.primary.700" fontSize="20px">
            Reset User Password
          </LargeHeading>

          <Stack mt="8" mb="6">
            <Text fontSize="xs">Select Investment Package</Text>

            <Menu>
              <MenuButton
                size="sm"
                color="app.primary.500"
                bg="white"
                boxShadow="md"
                w="full"
                h="48px"
                my="2"
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
                {selectedOption?.package_name || "Select an investment package"}
              </MenuButton>

              <MenuList
                pos="relative"
                zIndex="docked"
                maxH="200px"
                overflowY="auto"
                sx={customScrollBar3}
              >
                {loadingPackages ? (
                  <Spinner color="app.primary.900" />
                ) : (
                  packeagesResp?.data?.map((option, i) => (
                    <MenuItem
                      key={i}
                      fontWeight={500}
                      fontSize="14px"
                      onClick={() => handleSelect(option)}
                    >
                      {option.package_name}
                    </MenuItem>
                  ))
                )}
              </MenuList>
            </Menu>
          </Stack>

          {selectedOption && (
            <Stack my="6">
              <Text fontSize="xs">Investment Amount</Text>
              <Input
                placeholder="Investment Amount"
                {...register("investment_amount")}
              />
              <InputError
                msg={errors?.investment_amount?.message || inputError}
              />
              <Text fontWeight="500" fontSize="xs" mt="3">
                Note:
              </Text>
              <Text fontSize="xs">
                Min = {selectedOption?.min_amount}{" "}
                {selectedOption?.package_token[0]}
              </Text>
              <Text fontSize="xs">
                Max = {selectedOption?.max_amount}{" "}
                {selectedOption?.package_token[0]}
              </Text>
            </Stack>
          )}

          <Button
            h="48px"
            type="submit"
            isLoading={isLoading}
            disabled={!selectedOption}
          >
            Create Investement
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default CreateUserInvestment;
