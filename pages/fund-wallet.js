import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { ActionOptions } from "components";
import {
  BankTransfer,
  CompleteTransaction,
  CryptoOption,
  DebitCards,
  PaypalOption,
  Wallet,
} from "components/FundWallet";
import { navStates, useNavContext } from "context/NavProvider";

import React, { useEffect, useState } from "react";

const FundWallet = () => {
  const { setActiveNav } = useNavContext();
  useEffect(() => {
    setActiveNav(navStates?.fund_wallet);
  }, []);

  const paymentMethods = {
    crypto: "Via Crypto",
    bank: "Via Bank Transfer",
    paypal: "Via Paypal",
    card: "Debit Card",
  };

  const transactionStages = {
    selectMethod: "SELECT METHOD",
    completeTransaction: "COMPLETE TRANSACTION",
  };
  const [transactionStage, setTransactionStage] = useState(
    transactionStages?.selectMethod
  );
  const [selectedMethod, setSelectedMethod] = useState(null);

  const completeTransaction = () => {
    setTransactionStage(transactionStages.completeTransaction);
  };

  return (
    <Box p="6">
      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        <GridItem colSpan={1}>
          <Box bg="white" px="6" py="9" rounded="md">
            <Text mb="3" fontWeight={700} fontSize="20px">
              Fund Wallet
            </Text>
            <Text fontSize="11px" mb="9" w="85%">
              Select the wallet you want to fund and type much would you like to
              fund your wallet?
            </Text>
            <Wallet />
          </Box>
        </GridItem>

        <GridItem>
          <ActionOptions
            title="Payment method"
            subtitle="Your wallet wil be credited upon the method you chose to fund your wallet on"
            options={paymentMethods}
            setOption={setSelectedMethod}
          />
        </GridItem>

        <GridItem colSpan={1}>
          {transactionStage === transactionStages?.selectMethod && (
            <>
              {selectedMethod === paymentMethods?.crypto && (
                <CryptoOption completeTransaction={completeTransaction} />
              )}
              {selectedMethod === paymentMethods?.bank && (
                <BankTransfer completeTransaction={completeTransaction} />
              )}
              {selectedMethod === paymentMethods?.paypal && (
                <PaypalOption completeTransaction={completeTransaction} />
              )}
              {selectedMethod === paymentMethods?.card && (
                <DebitCards completeTransaction={completeTransaction} />
              )}
            </>
          )}

          {transactionStage === transactionStages?.completeTransaction && (
            <CompleteTransaction />
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default FundWallet;

FundWallet.requireAuth = true;
