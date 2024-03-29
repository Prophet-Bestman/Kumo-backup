import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import LargeHeading from "components/LargeHeading";
import React from "react";
import { cryptoNumberWithCommas, numberWithCommas } from "utils/helpers";
import DebitWallet from "./DebitWallet";
import FundWallet from "./FundWallet";

const UserWallets = ({ user }) => {
  const { wallet_addresses, wallet_balance } = user;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDebitOpen,
    onClose: onDebitClose,
    onOpen: onDebitOpen,
  } = useDisclosure();

  return (
    <Box py="14" px={["4", "6", "10"]} rounded="md" bg="white">
      <Flex
        pos="relative"
        // templateColumns={"repeat(2, 1fr)"}
        // gap="8"
        // templateColumns={["repeat(1, 1fr)", , "repeat(2, 1fr)"]}
        rowGap="10"
        mt="30px"
        flexDir="column"
      >
        <Box
          display={["flex", , "grid"]}
          flexDir="column"
          pos="relative"
          templateColumns={["repeat(1, 1fr)", , "repeat(2, 1fr)"]}
          gap="8"
          rowGap="10"
          // alignItems="flex-end"
        >
          <GridItem colSpan={2}>
            <LargeHeading> Wallet Addresses</LargeHeading>
          </GridItem>
          {wallet_addresses?.length > 0 &&
            wallet_addresses?.map((wallet) => (
              <GridItem key={wallet.walletAddress}>
                <Stack mb="5">
                  <Flex
                    gap="1"
                    justifyContent={"space-between"}
                    alignItems="center"
                    paddingRight={"40px"}
                    color="app.primary.900"
                    textTransform={"capitalize"}
                    mb="2"
                  >
                    <Text fontWeight={500} fontSize="14px">
                      {wallet.name}
                    </Text>

                    {/* <Flex gap="1">
                    <Text fontWeight={500} fontSize="12px">
                      {wallet.code}:
                    </Text>
                    <Text fontSize="12px" fontWeight={600}>
                      {getWalletBalance(wallet.name, wallet_balance)}
                    </Text>
                  </Flex> */}
                  </Flex>

                  <Text fontWeight={500} fontSize="12px">
                    Wallet Address
                  </Text>
                  <Input value={wallet.walletAddress} disabled />

                  <Text fontWeight={500} fontSize="12px">
                    Crypto Address
                  </Text>
                  <Input value={wallet.cryptoAddress} disabled />
                </Stack>
              </GridItem>
            ))}

          <GridItem colSpan={2}>
            <LargeHeading> Base Currency</LargeHeading>
          </GridItem>

          {wallet_balance?.length > 0 &&
            wallet_balance?.map((wallet, i) => (
              <Stack mb="5" key={wallet?.code}>
                <Text
                  fontWeight={500}
                  fontSize="14px"
                  textTransform="capitalize"
                >
                  {wallet.name}
                </Text>

                <Input
                  value={
                    i === 0
                      ? numberWithCommas(wallet?.value)
                      : cryptoNumberWithCommas(wallet?.value)
                  }
                  disabled
                />
              </Stack>
            ))}

          {/* <Stack mb="5">
            <Text
              fontWeight={500}
              fontSize="14px"
              color="app.primary.900"
              textTransform={"capitalize"}
            >
              Naira
            </Text>

            <InputGroup>
              <Input
                value={`NGN: ${getWalletBalance(
                  "naira tether",
                  wallet_balance
                )}`}
                disabled
              />
            </InputGroup>
          </Stack> */}
        </Box>

        <Flex gap="6">
          <Button variant="outline" onClick={onDebitOpen}>
            Debit Wallet
          </Button>
          <Button onClick={onOpen}>Fund Wallet</Button>
        </Flex>
      </Flex>
      <FundWallet isOpen={isOpen} onClose={onClose} user={user} />
      <DebitWallet isOpen={isDebitOpen} onClose={onDebitClose} user={user} />
    </Box>
  );
};

export default UserWallets;
