import { Box, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import {
  useDeleteCryptotToken,
  useGetAllCoinListing,
  useRemoveCoinFromListing,
} from "api/settings";
import ConfirmModal from "components/ConfirmModal";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { handleRequestError } from "utils/helpers";
import { customScrollBar3 } from "utils/styles";

const CoinListings = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { data } = useGetAllCoinListing();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

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

  useEffect(() => {
    if (!!data && data?.data?.length > 0) {
      setCoins(data?.data);
    }
  }, [data]);

  const {
    mutate: removeCoin,
    data: deleteResp,
    isLoading,
    reset: resetDelete,
    error: deleteError,
  } = useRemoveCoinFromListing();

  const handleDelete = () => {
    removeCoin(selectedCoin);
    // console.log(selectedCoin);
  };

  useEffect(() => {
    if (!!deleteResp && deleteResp?.status === "success") {
      successToast("Succesfully Removed Coin From Listing");
      resetDelete();
      onDeleteClose();
    }
  }, [deleteResp]);

  useEffect(() => {
    handleRequestError(deleteError);
    resetDelete();
  }, [deleteError]);

  return (
    <Box rounded="md" bg="white" py="12" px="6" shadow="md" h="full">
      <LargeHeading color="app.primary.700" fontSize="20px">
        Coin Listing
      </LargeHeading>

      <Box overflowY="auto" h="280px" sx={customScrollBar3}>
        {coins?.length > 0 &&
          coins?.map((coin) => (
            <Flex
              key={coin.code}
              my="2"
              py="3"
              px="2"
              justifyContent="space-between"
              bg="#efefef"
            >
              <Text fontSize="14px" fontWeight="600">
                {coin.name}
              </Text>

              <AiOutlineDelete
                color="red"
                cursor="pointer"
                onClick={() => {
                  setSelectedCoin(coin?.coin_id);
                  onDeleteOpen();
                }}
              />
            </Flex>
          ))}
      </Box>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        primaryFunc={{ name: "Remove Coin", func: handleDelete }}
        message={"Are you sure you want to remove this coin from the lising"}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default CoinListings;
