import {
  Box,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiEdit } from "react-icons/bi";

const getWalletBalance = (name, wallets) => {
  const filteredWallet = wallets?.filter((wallet) => wallet?.name === name);

  return filteredWallet[0]?.value;
};

const UserWallets = ({ user }) => {
  const { wallet_addreses, wallet_balance } = user;

  return (
    <Grid rowGap="8" p="6" py="12" rounded="md" bg="white" pos="relative">
      <Text textAlign="center" fontSize="20px" fontWeight={600}>
        Wallets
      </Text>

      <Box>
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
                <Input value={wallet.walletAddress} />
                {/* <InputRightElement>
                  <BiEdit size="20px" cursor="pointer" />
                </InputRightElement> */}
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
            />
          </InputGroup>
        </Stack>
      </Box>
    </Grid>
  );
};

export default UserWallets;
