import { Box, Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddCoinToListing,
  useGetExternalCoins,
  useUpdateCurrency,
} from "api/settings";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import SearchSelect from "components/SearchSelect";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { addCurrencySchema } from "utils/schema";
import debounce from "lodash.debounce";

const AddCoinListing = ({ isOpen, onClose }) => {
  const [externalCoins, setExternalCoins] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectCoinError, setSelectCoinError] = useState(null);

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

  const handleAddListing = () => {
    if (!selectedCoin) {
      setSelectCoinError("Select a coin to continue");
    } else {
      const payload = {
        name: selectedCoin.name,
        code: selectedCoin.symbol,
        coin_id: selectedCoin.id,
      };
      addCoin(payload);
    }
    // addCurrency();
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
    <ModalCard onClose={onClose} isOpen={isOpen}>
      <Box bg="white" py="12" px="6">
        <LargeHeading color="app.primary.700" fontSize="20px">
          Add Coin
        </LargeHeading>

        <Stack>
          <SearchSelect
            handleChange={handleChange}
            values={externalCoins}
            // defaultValue={area}
            placeholder="Search Areas"
            setValue={setSearchText}
            getItemValue={getItemValue}
            isLoading={loadingExternalCoins}
            handleSelect={handleSelectCoin}
          />
          <InputError msg={selectCoinError} />
        </Stack>

        <Button
          mt="4"
          h="48px"
          onClick={handleAddListing}
          isLoading={isLoading}
        >
          Add Currency
        </Button>
      </Box>
    </ModalCard>
  );
};

export default AddCoinListing;
