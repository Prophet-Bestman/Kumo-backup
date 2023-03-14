import { Box, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useGetCryptoTokens } from "api/settings";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { customScrollBar3 } from "utils/styles";
import UpdateCryptoToken from "./UpdateCryptoToken";

const CryptoTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const { data, isLoading: loadingTokens } = useGetCryptoTokens();

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  useEffect(() => {
    if (!!data && data?.data?.length > 0) {
      setTokens(data?.data);
    }
  }, [data]);

  return (
    <Box rounded="md" bg="white" py="12" px="6" shadow="md" h="full">
      <LargeHeading color="app.primary.700" fontSize="20px">
        Crypto Tokens
      </LargeHeading>

      <Box overflowY="auto" h="280px" sx={customScrollBar3}>
        {loadingTokens ? (
          <Spinner colorScheme="gray" mx="auto" />
        ) : (
          tokens?.length > 0 &&
          tokens?.map((token, i) => (
            <Flex
              key={i}
              my="2"
              py="3"
              px="2"
              justifyContent="space-between"
              bg="#efefef"
            >
              <Text fontSize="14px" fontWeight="600">
                {token.name}
              </Text>

              <AiFillEdit
                color="app.primary"
                cursor="pointer"
                onClick={() => {
                  setSelectedToken(token);
                  onUpdateOpen();
                }}
              />
              {isUpdateOpen && (
                <UpdateCryptoToken
                  onClose={onUpdateClose}
                  isOpen={isUpdateOpen}
                  token={selectedToken}
                />
              )}
            </Flex>
          ))
        )}
      </Box>
    </Box>
  );
};

export default CryptoTokens;
