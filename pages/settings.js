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
import {
  AddCryptoAddress,
  AddFundWalletFee,
  AddTransactionFee,
  UpdateFundWalletFee,
  UpdatePaypal,
  UpdateTransactionFees,
  UsdToNaira,
} from "components/Settings";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { FloatingAddBtn } from "components";
import { customScrollBar3 } from "utils/styles";
import UpdateCryptoWallet from "components/Settings/UpdateCryptoWallet";

const initialTransactionFeeOptions = [
  "BUY_CRYPTO_FEE",
  "SELL_CRYPTO_FEE",
  "SEND_CRYPTO_FEE",
  "TRANSFER_TO_BANK_FEE",
  "TRANSFER_TO_KUMO_AGENT",
  "BUY_DATA_FEE",
  "BUY_AIRTIME_FEE",
];

const initialFundWalletFeeOptions = [
  "FUND_WALLET_DEBIT_CARD_FEE",
  "FUND_WALLET_CRYPTO_FEE",
  "FUND_WALLET_BANK_TRANSFER_FEE",
  "FUND_WALLET_PAYPAL_FEE",
  "FUND_WALLET_KUMO_AGENT_FEE",
];

const Settings = () => {
  const [usdToNaira, setUsdToNaira] = useState([]);
  const [addTransactionFeeOptions, setAddTransactionFeeOptions] = useState([]);
  const [addFundWalletFeeOptions, setAddFundWalletFeeOptions] = useState([]);
  const [transactionFees, setTransactionFees] = useState([]);
  const [fundWalletFees, setFundWalletFees] = useState([]);
  const [cryptoWallets, setCryptoWallets] = useState([]);
  const [paypal, setPaypal] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isWalletFeeOpen,
    onOpen: onWalletFeeOpen,
    onClose: onWalletFeeClose,
  } = useDisclosure();

  const {
    isOpen: isAddCryptoOpen,
    onOpen: onAddCryptoOpen,
    onClose: onAddCryptoClose,
  } = useDisclosure();

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

      setCryptoWallets(
        feesResp?.data?.filter((item) => item?.name === "crypto_address")[0]
          ?.addresses
      );
      setPaypal(feesResp?.data?.filter((item) => item?.name === "paypal")[0]);

      let allFees = feesResp?.data?.filter(
        (item) =>
          item?.name?.includes("FEE") || item?.name?.includes("TRANSFER")
      );

      setTransactionFees(
        allFees?.filter((item) => !item?.name?.includes("FUND_WALLET"))
      );

      setFundWalletFees(
        allFees?.filter((item) => item?.name?.includes("FUND_WALLET"))
      );
    }
  }, [feesResp]);

  useEffect(() => {
    // ===== FILTER LOGIC FOR ADD TRANSACTION FEE MODAL =====
    if (!!transactionFees && transactionFees?.length > 0) {
      let filteredFees = [];
      initialTransactionFeeOptions.forEach((feeOption) => {
        for (let i = 0; i < transactionFees?.length; i++) {
          if (transactionFees[i]?.name === feeOption) {
            return;
          }
        }
        filteredFees?.push(feeOption);
      });
      setAddTransactionFeeOptions(filteredFees);
    } else setAddTransactionFeeOptions(initialTransactionFeeOptions);

    //
    // ===== FILTER LOGIC FOR ADD FUND WALLET FEE MODAL =====
    if (!!fundWalletFees && fundWalletFees?.length > 0) {
      let filteredFees = [];
      initialFundWalletFeeOptions.forEach((feeOption) => {
        for (let i = 0; i < fundWalletFees?.length; i++) {
          if (fundWalletFees[i]?.name === feeOption) {
            return;
          }
        }
        filteredFees?.push(feeOption);
      });
      setAddFundWalletFeeOptions(filteredFees);
    } else setAddFundWalletFeeOptions(initialFundWalletFeeOptions);
  }, [transactionFees, fundWalletFees]);

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
          !!paypal?.email && <UpdatePaypal data={paypal} />
        )}

        {loadingFees ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <Skeleton h="15px" mt="4" w="50%" />
            <Skeleton h="30px" mt="4" w="80%" />
            <Skeleton h="30px" mt="4" />
          </Box>
        ) : (
          !!transactionFees &&
          transactionFees?.length > 0 && (
            <UpdateTransactionFees options={transactionFees} />
          )
        )}
        {loadingFees ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <Skeleton h="15px" mt="4" w="50%" />
            <Skeleton h="30px" mt="4" w="80%" />
            <Skeleton h="30px" mt="4" />
          </Box>
        ) : (
          !!fundWalletFees &&
          fundWalletFees?.length > 0 && (
            <UpdateFundWalletFee options={fundWalletFees} />
          )
        )}

        {loadingFees ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <Skeleton h="15px" mt="4" w="50%" />
            <Skeleton h="30px" mt="4" w="80%" />
            <Skeleton h="30px" mt="4" />
          </Box>
        ) : (
          !!cryptoWallets &&
          cryptoWallets?.length > 0 && (
            <UpdateCryptoWallet options={cryptoWallets} />
          )
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
            fontWeight={500}
            fontSize="14px"
          >
            <MenuItem onClick={onOpen}>Add Transaction Fee</MenuItem>
            <MenuItem onClick={onWalletFeeOpen}>Add Fund Wallet Fee</MenuItem>
            <MenuItem onClick={onAddCryptoOpen}>
              Add Crypto Wallet Address
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      {addTransactionFeeOptions?.length > 0 && isOpen && (
        <AddTransactionFee
          isOpen={isOpen}
          onClose={onClose}
          options={addTransactionFeeOptions}
        />
      )}
      {addFundWalletFeeOptions?.length > 0 && isWalletFeeOpen && (
        <AddFundWalletFee
          isOpen={isWalletFeeOpen}
          onClose={onWalletFeeClose}
          options={addFundWalletFeeOptions}
        />
      )}

      {isAddCryptoOpen && (
        <AddCryptoAddress isOpen={isAddCryptoOpen} onClose={onAddCryptoClose} />
      )}
    </Box>
  );
};

export default Settings;

Settings.requireAuth = true;
