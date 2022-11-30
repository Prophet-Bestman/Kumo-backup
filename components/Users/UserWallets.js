import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  InputGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { numberWithCommas } from "utils/helpers";
import DebitWallet from "./DebitWallet";
import FundWallet from "./FundWallet";

const getWalletBalance = (name, wallets) => {
  const filteredWallet = wallets?.filter((wallet) => wallet?.name === name);

  return numberWithCommas(parseInt(filteredWallet[0]?.value));
};

const UserWallets = ({ user }) => {
  const { wallet_addreses, wallet_balance } = user;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDebitOpen,
    onClose: onDebitClose,
    onOpen: onDebitOpen,
  } = useDisclosure();

  return (
    <Box px="10" py="14" rounded="md" bg="white">
      <Grid
        pos="relative"
        // templateColumns={"repeat(2, 1fr)"}
        // gap="8"
        rowGap="10"
        mt="30px"
      >
        <Grid
          pos="relative"
          templateColumns={"repeat(2, 1fr)"}
          gap="8"
          rowGap="10"
          alignItems="flex-end"
        >
          {wallet_addreses?.length > 0 &&
            wallet_addreses?.map((wallet) => (
              <Stack mb="5" key={wallet?.walletAddress}>
                <Text
                  fontWeight={500}
                  fontSize="14px"
                  color="app.primary.900"
                  textTransform={"capitalize"}
                >
                  {wallet.name}
                </Text>
                <Flex gap="1">
                  <Text fontWeight={500} fontSize="12px">
                    {wallet.code}:
                  </Text>
                  <Text fontSize="12px" fontWeight={600}>
                    {getWalletBalance(wallet.name, wallet_balance)}
                  </Text>
                </Flex>
                <InputGroup>
                  <Input value={wallet.walletAddress} disabled />
                </InputGroup>
              </Stack>
            ))}
          <Stack mb="5">
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
                value={`NGN: ${getWalletBalance("naira", wallet_balance)}`}
                disabled
              />
            </InputGroup>
          </Stack>
        </Grid>

        <Flex gap="6">
          <Button variant="outline" onClick={onDebitOpen}>
            Debit Wallet Wallet
          </Button>
          <Button onClick={onOpen}>Fund Wallet</Button>
        </Flex>
      </Grid>
      <FundWallet isOpen={isOpen} onClose={onClose} user={user} />
      <DebitWallet isOpen={isDebitOpen} onClose={onDebitClose} user={user} />
    </Box>
  );
};

export default UserWallets;
