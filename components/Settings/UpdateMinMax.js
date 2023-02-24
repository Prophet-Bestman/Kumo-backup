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
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateMinMax } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError, underscoreToSpace } from "utils/helpers";
import { updateMinMaxSchema } from "utils/schema";
import { customScrollBar3 } from "utils/styles";

const UpdateMinMax = ({ options, loading }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feeError, setFeeError] = useState(null);
  //   const [selectedType, setSelectedType] = useState(null);

  //   const handleChange = (e) => {
  //     setSelectedType(e?.target?.value);
  //   };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(updateMinMaxSchema),
    defaultValues: selectedOption,
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Updated Min/Max",
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

  useEffect(() => {
    if (!!selectedOption && !!selectedOption?.name) {
      setValue("min", selectedOption?.min);
      setValue("max", selectedOption?.max);
    }
  }, [selectedOption]);

  const {
    mutate: updateMinMax,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useUpdateMinMax();

  const handleUpdate = (data) => {
    if (!selectedOption) {
      setFeeError("Select a transaction name to continue");
    } else {
      updateMinMax({ ...data, transaction_name: selectedOption?.name });
    }
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
            Update Transaction Min & Max
          </LargeHeading>

          <Text fontSize="14px" mt="6">
            Select Fee Type
          </Text>

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
              {underscoreToSpace(selectedOption?.name) || "Select fee to add"}
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
                  {underscoreToSpace(option.name)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <InputError msg={feeError} />
          {!!selectedOption && (
            <form onSubmit={handleSubmit(handleUpdate)}>
              <Stack mt="4">
                <Text fontSize="14px">Min Amount</Text>
                <InputGroup>
                  <InputLeftElement px="0">
                    <Text
                      fontSize="20"
                      color={"app.primary.700"}
                      fontWeight={700}
                    >
                      N
                    </Text>
                  </InputLeftElement>
                  <Input {...register("min")} placeholder="" />
                </InputGroup>
                <InputError msg={errors?.cost?.message} />
              </Stack>

              <Stack mt="4">
                <Text fontSize="14px">Max Amount</Text>
                <InputGroup>
                  <InputLeftElement px="0">
                    <Text
                      fontSize="20"
                      color={"app.primary.700"}
                      fontWeight={700}
                    >
                      N
                    </Text>
                  </InputLeftElement>
                  <Input {...register("max")} placeholder="" />
                </InputGroup>
                <InputError msg={errors?.max?.message} />
              </Stack>

              <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
                Update Fee
              </Button>
            </form>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UpdateMinMax;
