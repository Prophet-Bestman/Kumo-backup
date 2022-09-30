import {
  Box,
  Button,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetAllFees, useUpdateCryptoAddress } from "api/settings";
import { AddFee, UpdateCryptoFees, UsdToNaira } from "components/Settings";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { FloatingAddBtn } from "components";
import { customScrollBar3 } from "utils/styles";

const initialFeeOptions = [
  "BUY_CRYPTO_FEE",
  "SELL_CRYPTO_FEE",
  "SEND_CRYPTO_FEE",
  "TRANSFER_TO_BANK_FEE",
  "TRANSFER_TO_KUMO_AGENT",
  "BUY_DATA_FEE",
  "BUY_AIRTIME_FEE",
];

const Settings = () => {
  const [usdToNaira, setUsdToNaira] = useState([]);
  const [addFeeOptions, setAddFeeOptions] = useState([]);
  const [allFees, setAllFees] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setActiveNav } = useNavContext();
  useEffect(() => {
    setActiveNav(navStates.settings);
  }, []);

  const { data: feesResp, isLoading: loadingFees } = useGetAllFees();

  const {
    data: updateResp,
    mutate: updateCrypto,
    isLoading,
  } = useUpdateCryptoAddress();

  useEffect(() => {
    if (!!feesResp && feesResp?.status === "success") {
      setUsdToNaira(
        feesResp?.data?.filter((item) => item?.name === "usdToNgn")[0]
      );
      setAllFees(
        feesResp?.data?.filter((item) => item?.name?.includes("CRYPTO_FEE"))
      );
    }
  }, [feesResp]);

  useEffect(() => {
    if (!!allFees && allFees?.length > 0) {
      let filteredFees = [];
      initialFeeOptions.forEach((feeOption) => {
        for (let i = 0; i < allFees?.length; i++) {
          if (allFees[i]?.name === feeOption) {
            return;
          }
        }
        filteredFees?.push(feeOption);
      });
      setAddFeeOptions(filteredFees);
      // );
    }
  }, [allFees]);

  const handleUpdateCryptoAddress = () => {
    const payload = {
      coin_name: "Bitcoin",
      address: "0x20949098304891238492349",
    };
    updateCrypto(payload);
  };

  return (
    <Box p="6">
      <Grid templateColumns={"repeat(3, 1fr)"} gap="4" my="5">
        {loadingFees ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <Skeleton h="15px" mt="4" w="50%" />
            <Skeleton h="30px" mt="4" w="80%" />
            <Skeleton h="30px" mt="4" />
          </Box>
        ) : (
          !!usdToNaira?.value && <UsdToNaira data={usdToNaira} />
        )}

        {loadingFees ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <Skeleton h="15px" mt="4" w="50%" />
            <Skeleton h="30px" mt="4" w="80%" />
            <Skeleton h="30px" mt="4" />
          </Box>
        ) : (
          !!allFees &&
          allFees?.length > 0 && <UpdateCryptoFees options={allFees} />
        )}
      </Grid>
      <Box pos="fixed" bottom={8} right={8}>
        <Menu>
          <MenuButton variant="unstyled" as={Button}>
            <FloatingAddBtn />
          </MenuButton>

          <MenuList
            pos="relative"
            zIndex="docked"
            maxH="200px"
            overflowY="auto"
            sx={customScrollBar3}
          >
            <MenuItem fontWeight={500} fontSize="14px" onClick={onOpen}>
              Add Fee
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      {addFeeOptions?.length > 0 && isOpen && (
        <AddFee isOpen={isOpen} onClose={onClose} options={addFeeOptions} />
      )}
    </Box>
  );
};

export default Settings;

Settings.requireAuth = true;
