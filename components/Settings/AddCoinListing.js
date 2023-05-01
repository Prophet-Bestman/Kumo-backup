import {
  Box,
  Button,
  Checkbox,
  Grid,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAddCoinToListing, useGetExternalCoins } from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import SearchSelect from "components/SearchSelect";
import React, { useEffect, useState } from "react";
import { handleRequestError } from "utils/helpers";
import debounce from "lodash.debounce";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddCoinListing = ({ isOpen, onClose }) => {
  const [externalCoins, setExternalCoins] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectCoinError, setSelectCoinError] = useState(null);
  const [is_child, setIs_child] = useState(false);

  const addCoinToListingSchema = yup
    .object({
      image: yup.string(),
      main_address: yup.string().required("Main Address is required"),
      ...(is_child && {
        name: yup.string().required("Coin name is required"),
        coin_id: yup.string().required("Coin Id is required"),
        code: yup.string().required("Code is required"),
        parent_code: yup.string().required("Parent Code is required"),
        alias: yup.string().required("Alias is required"),
      }),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addCoinToListingSchema) });

  const {
    data: coinsResp,
    isLoading: loadingExternalCoins,
    refetch,
  } = useGetExternalCoins(searchText);

  useEffect(() => {
    if (!!searchText && searchText?.length > 2) {
      refetch(1, searchText);
    } else refetch(1, "");
  }, [searchText]);

  useEffect(() => {
    if (!!coinsResp && coinsResp?.status === "success")
      setExternalCoins(coinsResp?.data);
  }, [coinsResp]);

  const handleChange = debounce((e) => {
    e?.target?.value?.length > 2
      ? setSearchText(e?.target?.value)
      : setSearchText(null);
  }, 700);

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Coin has been listed",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: addCoin,
    data: updateResp,
    isLoading,
    error: updateError,
    reset,
  } = useAddCoinToListing();

  const handleAddListing = (data) => {
    console.log(data);
    if (!is_child && !selectedCoin) {
      setSelectCoinError("Select a coin to continue");
    } else {
      const payload = {
        is_child,
        ...(!is_child && {
          name: selectedCoin.name,
          code: selectedCoin.symbol,
          coin_id: selectedCoin.id,
        }),
        ...data,
      };
      console.log(payload);
      addCoin(payload);
    }
  };

  useEffect(() => {
    if (!!updateResp && updateResp?.status === "success") {
      successToast();
      reset();
      onClose();
    }
  }, [updateResp]);

  useEffect(() => {
    handleRequestError(updateError);
    reset();
  }, [updateError]);

  const getItemValue = (value) => {
    return {
      name: value?.name,
      key: value?.id,
    };
  };

  const handleSelectCoin = (coin) => {
    setSelectCoinError(null);
    setSelectedCoin(coin);
  };

  return (
    <ModalCard onClose={onClose} isOpen={isOpen} isCentered={false}>
      <Box bg="white" py="12" px="6">
        <LargeHeading color="app.primary.700" fontSize="20px">
          Add Coin
        </LargeHeading>

        <Grid mt="5" gap="6">
          <Stack>
            <Checkbox
              value={is_child}
              onChange={() => setIs_child((prev) => !prev)}
              colorScheme="teal"
            >
              Child-coin?
            </Checkbox>
            <Text fontSize="12px" color="#888">
              Please check this box if you are adding a child coin{" "}
            </Text>
          </Stack>
          {!is_child && (
            <Stack>
              <Text fontSize="14px" fontWeight={600} mb="1">
                Select Coin
              </Text>
              <SearchSelect
                handleChange={handleChange}
                values={externalCoins}
                // defaultValue={area}
                placeholder="Search Crytocurrency with exact name"
                setValue={setSearchText}
                getItemValue={getItemValue}
                isLoading={loadingExternalCoins}
                handleSelect={handleSelectCoin}
              />
              <InputError msg={selectCoinError} />
            </Stack>
          )}
          {is_child && (
            <>
              <Stack>
                <Text fontSize="14px" fontWeight={600} mb="1">
                  Name
                </Text>
                <Input {...register("name")} />
                <InputError msg={errors?.name?.message} />
              </Stack>
              <Stack>
                <Text fontSize="14px" fontWeight={600} mb="1">
                  Coin Id
                </Text>
                <Input {...register("coin_id")} />
                <InputError msg={errors?.coin_id?.message} />
              </Stack>
              <Stack>
                <Text fontSize="14px" fontWeight={600} mb="1">
                  Code
                </Text>
                <Input {...register("code")} />
                <InputError msg={errors?.code?.message} />
              </Stack>
            </>
          )}
          <Stack>
            <Text fontSize="14px" fontWeight={600} mb="1">
              Main Address
            </Text>
            <Input {...register("main_address")} />
            <InputError msg={errors?.main_address?.message} />
          </Stack>

          <Stack>
            <Text fontSize="14px" fontWeight={600} mb="1">
              Parent Code {!is_child && " (Optional)"}
            </Text>
            <Input {...register("parent_code")} />
            <InputError msg={errors?.parent_code?.message} />
          </Stack>
          <Stack>
            <Text fontSize="14px" fontWeight={600} mb="1">
              Alias {!is_child && " (Optional)"}
            </Text>
            <Input {...register("alias")} />
            <InputError msg={errors?.alias?.message} />
          </Stack>
          <Stack>
            <Text fontSize="14px" fontWeight={600} mb="1">
              Link to logo (Optional)
            </Text>
            <Input {...register("image")} />
            <InputError msg={errors?.image?.message} />
          </Stack>
        </Grid>

        <Button
          mt="4"
          h="48px"
          onClick={handleSubmit(handleAddListing)}
          isLoading={isLoading}
        >
          Add Currency
        </Button>
      </Box>
    </ModalCard>
  );
};

export default AddCoinListing;
