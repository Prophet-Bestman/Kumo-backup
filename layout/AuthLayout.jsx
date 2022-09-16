import { Box, Button, Flex, Img } from "@chakra-ui/react";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <Box minH={"100vh"} pos="relative" display="flex" justifyContent="center">
      <Box w="full" maxW="1620px">
        <Flex
          w="full"
          h="70px"
          bg="app.primary.900"
          px="12"
          alignItems="center"
          justify="space-between"
        >
          <Img src="/img/logo_full.png" h="30px" objectFit="contain" />

          <Flex alignItems="center">
            <Button
              variant="outline"
              rounded="full"
              borderColor="white"
              size="sm"
              _hover={{
                bg: "white",
                color: "app.primary.900",
              }}
              color="white"
            >
              Sign Up
            </Button>
          </Flex>
        </Flex>
        <Box h="calc(100vh - 70px)">{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
