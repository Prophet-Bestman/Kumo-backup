import {
  Box,
  Button,
  Grid,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Stack,
  Switch,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePackage } from "api/investment";
import { useGetAllCoinListing, useGetAllListedTokens } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import { useAuthContext } from "context/AuthProvider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { createPackageSchema } from "utils/schema";
import { customScrollBar3 } from "utils/styles";

const CreatePackage = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState();

  const { data: listedTokens, isLoading: loadingTokens } =
    useGetAllListedTokens({ refetchOnWindowFocus: false });

  const { data: coinsResp, isLoading: loadingCoins } = useGetAllCoinListing({
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!loadingCoins && !loadingTokens) {
      let formattedTokens = [];
      if (!!coinsResp && coinsResp?.status === "success") {
        const coins = coinsResp?.data?.map((coin) => ({
          name: coin?.name,
          token_code: coin?.code,
        }));
        formattedTokens = [...formattedTokens, ...coins];
      }
      if (!!listedTokens && listedTokens?.status === "success") {
        const tokens = listedTokens?.data?.map((token) => ({
          name: token?.name,
          token_code: token?.token_code,
        }));
        formattedTokens = [...formattedTokens, ...tokens];
      }
      setTokens([...tokens, ...formattedTokens]);
    }
  }, [coinsResp, listedTokens, loadingCoins, loadingTokens]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createPackageSchema) });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Succesfully Created Investment Package",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: createPackage,
    data: createResp,
    isLoading,
    error: createError,
    reset,
  } = useCreatePackage();

  const handleCreate = (data) => {
    const payload = {
      ...data,
      package_token: selectedToken.name,
      token_code: selectedToken.token_code,
      admin_creator_id: user?.user_id || user?._id,
      admin_creator_name: `${user?.first_name} ${user?.last_name}`,
      isFixed: data?.isFixed ? "true" : "false",
    };
    createPackage(payload);
  };

  useEffect(() => {
    if (!!createResp && createResp?.status === "success") {
      successToast();
      reset();
      onClose();
    }
  }, [createResp]);

  useEffect(() => {
    handleRequestError(createError);
    reset();
  }, [createError]);

  const selectToken = (token) => {
    setSelectedToken(token);
  };

  return (
    <ModalCard isOpen={isOpen} onClose={onClose} isCentered={false}>
      <Box py="6">
        <LargeHeading>Create Investment Package</LargeHeading>

        <form onSubmit={handleSubmit(handleCreate)}>
          <Grid rowGap="4" my="12">
            <Stack>
              <Text fontSize="12px">Package Name</Text>
              <Input {...register("package_name")} />
              <InputError msg={errors?.package_name?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Select Token</Text>
              {loadingCoins || loadingTokens ? (
                <Progress isIndeterminate colorScheme="gray" />
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
                    {selectedToken?.name || "Select token to add"}
                  </MenuButton>

                  <MenuList
                    pos="relative"
                    zIndex="docked"
                    maxH="200px"
                    overflowY="auto"
                    sx={customScrollBar3}
                  >
                    {tokens?.map((option, i) => (
                      <MenuItem
                        key={i}
                        fontWeight={500}
                        fontSize="14px"
                        onClick={() => selectToken(option)}
                      >
                        {option?.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}
              <InputError msg={errors?.package_name?.message} />
            </Stack>

            {/* <Stack>
              <Text fontSize="12px">Token Code</Text>
              <Input {...register("token_code")} />
              <InputError msg={errors?.token_code?.message} />
            </Stack> */}
            <Stack>
              <Text fontSize="12px">Package Duration</Text>
              <Input {...register("package_duration")} />
              <InputError msg={errors?.package_duration?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Package Apr</Text>
              <Input {...register("package_apr")} />
              <InputError msg={errors?.package_apr?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Referral Percentage</Text>
              <Input {...register("referral_percentage")} />
              <InputError msg={errors?.referral_percentage?.message} />
            </Stack>

            <Stack>
              <Text fontSize="12px">Min Amount</Text>
              <Input {...register("min_amount")} type="tel" />
              <InputError msg={errors?.min_amount?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Max Amount</Text>
              <Input {...register("max_amount")} type="tel" />
              <InputError msg={errors?.max_amount?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Info</Text>
              <Textarea {...register("info")} />
              <InputError msg={errors?.info?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Is Fixed?</Text>
              <Switch {...register("isFixed")} />
              <InputError msg={errors?.isFixed?.message} />
            </Stack>

            <Button isLoading={isLoading} type="submit">
              Create
            </Button>
          </Grid>
        </form>
      </Box>
    </ModalCard>
  );
};

export default CreatePackage;
