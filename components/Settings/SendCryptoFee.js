import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Select,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetAllCoinListing,
  useUpdateGeneralFee,
  useUpdateSendCryptoFee,
} from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError, underscoreToSpace } from "utils/helpers";
import { updateSendCryptoFeeSchema } from "utils/schema";
import { customScrollBar3 } from "utils/styles";

const SendCryptoFee = ({ loading }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feeError, setFeeError] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const { data: coinsResp, isLoading: loadingCoins } = useGetAllCoinListing();

  const handleChange = (e) => {
    setSelectedType(e?.target?.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(updateSendCryptoFeeSchema),
    defaultValues: selectedOption,
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Updated Fee",
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
    if (!!selectedOption && !!selectedOption?.cost) {
      setValue("cost", selectedOption?.cost);
    }
  }, [selectedOption]);

  const {
    mutate: updateFee,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useUpdateSendCryptoFee();

  const handleUpdate = (data) => {
    if (!selectedOption) {
      setFeeError("Select a fee name to continue");
    } else {
      if (selectedType === "VALUE") {
        delete data.cap_value;
      }
      updateFee({ ...data, name: selectedOption?.name });
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
            Update Send Crypto Fees
          </LargeHeading>

          <Text fontSize="14px" mt="6">
            Select Fee Type
          </Text>

          {loadingCoins ? (
            <Progress colorScheme="gray" isIndeterminate />
          ) : (
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
                {coinsResp?.data?.map((option, i) => (
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
          )}
          <InputError msg={feeError} />
          {!!selectedOption && (
            <form onSubmit={handleSubmit(handleUpdate)}>
              <Stack mt="4">
                <Text fontSize="14px">Cost Type</Text>
                <Select
                  {...register("cost_type")}
                  placeholder="Select Cost Type"
                  onChange={handleChange}
                  value={selectedType || selectedOption?.cost_type}
                >
                  <option value="PERCENTAGE">PERCENTAGE</option>
                  <option value="VALUE">VALUE</option>
                </Select>
                <InputError msg={errors?.cost_type?.message} />
              </Stack>

              <Stack mt="4">
                <Text fontSize="14px">Cost</Text>
                <InputGroup>
                  {((!selectedType && selectedOption.cost_type === "VALUE") ||
                    selectedType === "VALUE") && (
                    <InputLeftElement px="0">
                      <Text
                        fontSize="20"
                        color={"app.primary.700"}
                        fontWeight={700}
                      >
                        N
                      </Text>
                    </InputLeftElement>
                  )}
                  <Input {...register("cost")} placeholder="" />

                  {((!selectedType &&
                    selectedOption.cost_type === "PERCENTAGE") ||
                    selectedType === "PERCENTAGE") && (
                    <InputRightElement px="0">
                      <Text
                        fontSize="20"
                        color={"app.primary.700"}
                        fontWeight={700}
                      >
                        %
                      </Text>
                    </InputRightElement>
                  )}
                </InputGroup>
                <InputError msg={errors?.cost?.message} />
              </Stack>

              {(selectedType === "VALUE"
                ? null
                : selectedType === "PERCENTAGE" ||
                  selectedOption.cost_type === "PERCENTAGE") && (
                <Stack mt="4">
                  <Text fontSize="14px">Cap Value</Text>
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
                    <Input
                      {...register("cap_value")}
                      type="number"
                      placeholder=""
                      defaultValue={selectedOption.cap_value}
                    />
                  </InputGroup>

                  <InputError msg={errors?.cap_value?.message} />
                </Stack>
              )}

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

export default SendCryptoFee;
