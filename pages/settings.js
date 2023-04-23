import {
  Box,
  Button,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useGetAllFees,
  useGetAllMinMax,
  useGetBaseCurrency,
  useGetCoinRate,
  useGetCryptoAddresses,
  useGetPaypal,
  useGetPaypalRange,
  useGetSendCryptoFee,
  useGetTokenRate,
  useGetUtilities,
} from "api/settings";
import {
  AddBaseCurrency,
  AddCoinListing,
  AddCryptoAddress,
  AddFundWalletFee,
  AddTransactionFee,
  AirtimeList,
  CoinListings,
  SendCryptoFee,
  UpdateFundWalletFee,
  UpdateMinMax,
  UpdatePaypal,
  UpdatePaypalRange,
  // UpdateSendCryptoMinMax,
  UpdateTransactionFees,
  UsdToNaira,
} from "components/Settings";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";
import { FloatingAddBtn } from "components";
import { customScrollBar3 } from "utils/styles";
import AddCurrency from "components/Settings/AddCurrency";
import AddUtility from "components/Settings/AddUtitlity";
import UpdateUtility from "components/Settings/UpdateUtitlity";
import CreateToken from "components/Settings/CreateToken";
import AllListedTokens from "components/Settings/AllListedTokens";
import CoinRate from "components/Settings/CoinRate";
import TokenRate from "components/Settings/TokenRate";
import BaseCurrencies from "components/Settings/BaseCurrencies";
import AllDelistedTokens from "components/Settings/AllDelistedTokens";

const initialTransactionFeeOptions = [
  "BUY_CRYPTO_FEE",
  "SELL_CRYPTO_FEE",
  // "SEND_CRYPTO_FEE",
  "TRANSFER_TO_BANK_FEE",
  "TRANSFER_TO_KUMO_AGENT_FEE",
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

const initialMinMaxOptions = [
  {
    name: "BUY_MIN_MAX",
    min: "",
    max: "",
  },
  {
    name: "SELL_MIN_MAX",
    min: "",
    max: "",
  },
  {
    name: "SEND_MIN_MAX",
    min: "",
    max: "",
  },
  {
    name: "FUND_WALLET_MIN_MAX",
    min: "",
    max: "",
  },
  {
    name: "TRANSFER_TO_BANK_MIN_MAX",
    min: "",
    max: "",
  },
  {
    name: "TRANSFER_TO_KUMO_AGENT_MIN_MAX",
    min: "",
    max: "",
  },
];

const Settings = () => {
  const [usdToNaira, setUsdToNaira] = useState([]);
  const [addTransactionFeeOptions, setAddTransactionFeeOptions] = useState([]);
  const [addFundWalletFeeOptions, setAddFundWalletFeeOptions] = useState([]);
  const [transactionFees, setTransactionFees] = useState([]);
  const [fundWalletFees, setFundWalletFees] = useState([]);
  const [utilities, setUtitlities] = useState([]);
  const [minMaxOptions, setMinMaxOptions] = useState(initialMinMaxOptions);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isUtilityOpen,
    onOpen: onUtilityOpen,
    onClose: onUtilityClose,
  } = useDisclosure();
  const {
    isOpen: isAddBaseOpen,
    onOpen: onAddBaseOpen,
    onClose: onAddBaseClose,
  } = useDisclosure();

  const {
    isOpen: isWalletFeeOpen,
    onOpen: onWalletFeeOpen,
    onClose: onWalletFeeClose,
  } = useDisclosure();

  const {
    isOpen: isAddCurrencyOpen,
    // onOpen: onAddCurrencyOpen,
    onClose: onAddCurrencyClose,
  } = useDisclosure();

  const {
    isOpen: isAddCoinOpen,
    onOpen: onAddCoinOpen,
    onClose: onAddCoinClose,
  } = useDisclosure();
  const {
    isOpen: isCreateTokenOpen,
    onOpen: onCreateTokenOpen,
    onClose: onCreateTokenClose,
  } = useDisclosure();

  const {
    isOpen: isAddCryptoOpen,
    // onOpen: onAddCryptoOpen,
    onClose: onAddCryptoClose,
  } = useDisclosure();

  const { setActiveNav } = useNavContext();
  useEffect(() => {
    setActiveNav(navStates.settings);
  }, []);

  const { data: feesResp, isLoading: loadingFees } = useGetAllFees();
  useGetCryptoAddresses();
  const { data: utilityResp, isLoading: loadingUtilities } = useGetUtilities();

  const { data: paypalResp, isLoading: loadingPaypal } = useGetPaypal();
  const { data: paypalRangeResp, isLoading: loadingPaypalRange } =
    useGetPaypalRange();

  const { data: baseCurrencyResp, isLoading: loadingBaseCurrency } =
    useGetBaseCurrency();

  const { data: tokenRateResp, isLoading: loadingTokenRate } =
    useGetTokenRate();
  const { data: coinRateResp, isLoading: loadingCoinRate } = useGetCoinRate();
  const { data: minMaxResp, isLoading: loadingMinMax } = useGetAllMinMax();
  const { data: sendCryptoFeeResp, isLoading: loadingSendCryptoFee } =
    useGetSendCryptoFee();

  //  ================ USEEFFECTS ==========
  useEffect(() => {
    if (!!feesResp && feesResp?.status === "success") {
      setUsdToNaira(
        feesResp?.data?.filter(
          (item) => item?.name?.toLowerCase() === "usdtongn"
        )[0]
      );

      let allFees = feesResp?.data?.filter(
        (item) =>
          item?.name?.includes("FEE") || item?.name?.includes("TRANSFER")
      );

      setTransactionFees(
        allFees?.filter(
          (item) =>
            !item?.name?.includes("FUND_WALLET") &&
            !item?.name?.includes("MIN_MAX")
        )
      );

      setFundWalletFees(
        allFees?.filter((item) => item?.name?.includes("FUND_WALLET"))
      );
    }
  }, [feesResp]);

  useEffect(() => {
    if (
      !!minMaxResp &&
      minMaxResp?.status === "success" &&
      minMaxResp?.data?.length > 0
    ) {
      const newMinMax = initialMinMaxOptions.map(
        (initialMinMax) =>
          minMaxResp?.data?.find(
            (remoteMinMax) => remoteMinMax.name === initialMinMax.name
          ) || initialMinMax
      );

      setMinMaxOptions(newMinMax);
    }
  }, [minMaxResp]);

  useEffect(() => {
    if (!!utilityResp && utilityResp?.status === "success") {
      setUtitlities(utilityResp?.data?.utilities);
    }
  }, [utilityResp]);

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

  return (
    <Box py="12" px={["4", "6", "12"]}>
      {(loadingBaseCurrency ||
        loadingCoinRate ||
        loadingFees ||
        loadingPaypal ||
        loadingTokenRate ||
        loadingMinMax ||
        loadingUtilities) && (
        <Progress size="xs" isIndeterminate colorScheme="gray" />
      )}
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap="12"
        my="5"
      >
        <BaseCurrencies />
        {!loadingBaseCurrency && (
          <AddBaseCurrency
            baseCurrency={baseCurrencyResp?.data[0] || null}
            loading={loadingBaseCurrency}
          />
        )}
        {!loadingCoinRate && (
          <CoinRate data={coinRateResp?.data} loading={loadingCoinRate} />
        )}
        {!loadingTokenRate && (
          <TokenRate data={tokenRateResp?.data} loading={loadingTokenRate} />
        )}

        {
          <SendCryptoFee
            options={sendCryptoFeeResp?.data}
            loading={loadingSendCryptoFee}
          />
        }
        {!loadingFees && (
          <>
            <UsdToNaira data={usdToNaira} loading={loadingFees} />
            <UpdateTransactionFees
              loading={loadingFees}
              options={transactionFees}
            />
            <UpdateMinMax loading={loadingFees} options={minMaxOptions} />
            {/* <UpdateSendCryptoMinMax /> */}
            <UpdateFundWalletFee
              loading={loadingFees}
              options={fundWalletFees}
            />
          </>
        )}
        {!loadingPaypal && (
          <UpdatePaypal loading={loadingPaypal} data={paypalResp?.data} />
        )}
        {!loadingPaypalRange && (
          <UpdatePaypalRange
            loading={loadingPaypalRange}
            paypalRange={paypalRangeResp?.data}
          />
        )}
        {!loadingUtilities && (
          <UpdateUtility loading={loadingUtilities} options={utilities} />
        )}
        {/* <CryptoTokens /> */}
        <CoinListings />
        <AirtimeList />
        <AllListedTokens />
        <AllDelistedTokens />
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
            <MenuItem onClick={onAddBaseOpen}>Add Base Currency</MenuItem>
            {/* <MenuItem onClick={onAddCurrencyOpen}>Add Currency</MenuItem> */}
            <MenuItem onClick={onCreateTokenOpen}>Create Token</MenuItem>
            <MenuItem onClick={onAddCoinOpen}>Add Coin to listing </MenuItem>
            <MenuItem onClick={onUtilityOpen}>Add Utility</MenuItem>
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
      {isAddCoinOpen && (
        <AddCoinListing isOpen={isAddCoinOpen} onClose={onAddCoinClose} />
      )}
      {isCreateTokenOpen && (
        <CreateToken isOpen={isCreateTokenOpen} onClose={onCreateTokenClose} />
      )}
      {isAddCurrencyOpen && (
        <AddCurrency isOpen={isAddCurrencyOpen} onClose={onAddCurrencyClose} />
      )}
      {isUtilityOpen && (
        <AddUtility isOpen={isUtilityOpen} onClose={onUtilityClose} />
      )}
      {isAddBaseOpen && (
        <AddBaseCurrency isOpen={isAddBaseOpen} onClose={onAddBaseClose} />
      )}
    </Box>
  );
};

export default Settings;

Settings.requireAuth = true;
