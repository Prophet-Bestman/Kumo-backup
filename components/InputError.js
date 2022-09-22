import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MdError } from "react-icons/md";

const InputError = ({ msg }) => {
  return (
    <>
      {!!msg && (
        <Flex alignItems="center" gap="1" color="red.400" fontWeight={500}>
          <MdError />
          <Text textTransform="capitalize" fontSize="12px">
            {msg}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default InputError;
