import {
  Box,
  Button,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAddToken } from "api/investment";
import { useGetAllCoinListing, useGetAllListedTokens } from "api/settings";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect, useState } from "react";
import { handleRequestError } from "utils/helpers";
import { customScrollBar3 } from "utils/styles";

const AddToken = ({ isOpen, onClose, package_id }) => {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState();

  const { data: listedTokens, isLoading: loadingTokens } =
    useGetAllListedTokens({ refetchOnWindowFocus: false });

  const { data: coinsResp, isLoading: loadingCoins } = useGetAllCoinListing({
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!loadingCoins && !loadingTokens) {
      let formattedTokens = [];
      if (!!coinsResp && coinsResp?.status === "success") {
        const coins = coinsResp?.data?.map((coin) => ({
          name: coin?.name,
          token_code: coin?.code,
        }));
        formattedTokens = [...formattedTokens, ...coins];
      }
      if (!!listedTokens && listedTokens?.status === "success") {
        const tokens = listedTokens?.data?.map((token) => ({
          name: token?.name,
          token_code: token?.code,
        }));
        formattedTokens = [...formattedTokens, ...tokens];
      }
      setTokens([...tokens, ...formattedTokens]);
    }
  }, [coinsResp, listedTokens, loadingCoins, loadingTokens]);

  const selectToken = (token) => {
    setSelectedToken(token);
  };

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Succesfully Added Package Token",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: addToken,
    data: createResp,
    isLoading,
    error: createError,
    reset,
  } = useAddToken();

  const handleCreate = (data) => {
    const payload = {
      id: package_id,
      data: {
        package_token: `${selectedToken?.name}(${selectedToken?.token_code})`,
      },
    };
    addToken(payload);
  };

  useEffect(() => {
    if (!!createResp && createResp?.status === "success") {
      successToast();
      reset();
      onClose();
    }
  }, [createResp]);

  useEffect(() => {
    handleRequestError(createError);
    reset();
  }, [createError]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box p="6">
        <LargeHeading>Add Package Token</LargeHeading>

        <Grid my="6" rowGap="4">
          <Stack>
            <Text fontSize="12px">Select Token</Text>
            {loadingCoins || loadingTokens ? (
              <Progress isIndeterminate colorScheme="gray" />
            ) : (
              <Menu>
                <MenuButton
                  size="sm"
                  color="app.primary.500"
                  bg="white"
                  boxShadow="md"
                  w="full"
                  h="48px"
                  my="2"
                  borderWidth="1px"
                  borderColor="app.primary.500"
                  _hover={{
                    bg: "app.primaryTrans",
                  }}
                  as={Button}
                  sx={{
                    boxShadow: " rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;",
                  }}
                >
                  {selectedToken?.name || "Select token to add"}
                </MenuButton>

                <MenuList
                  pos="relative"
                  zIndex="docked"
                  maxH="200px"
                  overflowY="auto"
                  sx={customScrollBar3}
                >
                  {tokens?.map((option, i) => (
                    <MenuItem
                      key={i}
                      fontWeight={500}
                      fontSize="14px"
                      onClick={() => selectToken(option)}
                    >
                      {option?.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
          </Stack>
        </Grid>
        <Button
          isLoading={isLoading}
          disabled={!selectedToken}
          onClick={handleCreate}
        >
          Add Token
        </Button>
      </Box>
    </ModalCard>
  );
};

export default AddToken;
