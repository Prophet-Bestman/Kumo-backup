import { Box, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useDelistToken, useGetAllListedTokens } from "api/settings";
import LargeHeading from "components/LargeHeading";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { customScrollBar3 } from "utils/styles";
import UpdateCryptoToken from "./UpdateCryptoToken";

const AllListedTokens = () => {
  const [selectedToken, setSelectedToken] = useState(null);
  const { data: listedTokensResp, isLoading: loadingTokens } =
    useGetAllListedTokens();

  const { mutate: delistToken, isLoading: delisting } = useDelistToken();

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  return (
    <Box rounded="md" bg="white" py="12" px="6" shadow="md" h="full">
      <LargeHeading color="app.primary.700" fontSize="20px">
        All Listed Tokens
      </LargeHeading>

      <Box overflowY="auto" h="280px" sx={customScrollBar3}>
        {loadingTokens ? (
          <Spinner />
        ) : (
          listedTokensResp?.data?.length > 0 &&
          listedTokensResp?.data?.map((token, i) => (
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

              <Flex gap="2">
                {delisting && selectedToken?.token_id === token?.token_id ? (
                  <Spinner size="xs" />
                ) : (
                  <BiBlock
                    color="app.red"
                    cursor="pointer"
                    fontSize="20px"
                    onClick={() => {
                      setSelectedToken(token);
                      delistToken({ token_id: token?.token_id });
                    }}
                  />
                )}

                <AiFillEdit
                  color="app.primary"
                  cursor="pointer"
                  onClick={() => {
                    setSelectedToken(token);
                    onUpdateOpen();
                  }}
                />
              </Flex>
            </Flex>
          ))
        )}
      </Box>

      {isUpdateOpen && (
        <UpdateCryptoToken
          onClose={onUpdateClose}
          isOpen={isUpdateOpen}
          token={selectedToken}
        />
      )}
    </Box>
  );
};

export default AllListedTokens;
