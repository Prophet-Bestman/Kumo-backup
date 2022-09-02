import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { CompleteTransaction, DebitCards, Wallet } from "components/FundWallet";
import BankTransfer from "components/FundWallet/BankTransfer";
import CryptoOption from "components/FundWallet/CryptoOption";
import PaypalOption from "components/FundWallet/Paypal";

import React, { useState } from "react";

const FundWallet = () => {
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
          <Box bg="white" px="6" py="9" rounded="md">
            <Text mb="3" fontWeight={700} fontSize="20px">
              Payment method
            </Text>
            <Text fontSize="11px" mb="9" w="85%">
              Your wallet wil be credited upon the method you chose to fund your
              {/* wallet on */}
            </Text>
            <Box>
              {Object.keys(paymentMethods)?.length > 0 &&
                Object.values(paymentMethods)?.map((method) => (
                  <Box
                    cursor="pointer"
                    mb="2"
                    px="18px"
                    py="4"
                    fontWeight="700"
                    color="app.primary.900"
                    bg="app.primaryTrans"
                    rounded="md"
                    onClick={() => setSelectedMethod(method)}
                  >
                    {method}
                  </Box>
                ))}
            </Box>
          </Box>
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
