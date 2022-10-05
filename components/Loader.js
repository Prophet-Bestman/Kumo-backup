import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Flex h="410px" w="full" justify="center" alignItems="center">
      <Spinner size="xl" color="app.primary.900" />
    </Flex>
  );
};
export default Loader;
