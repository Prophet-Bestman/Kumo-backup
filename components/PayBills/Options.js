import { Box, Text } from "@chakra-ui/react";
import React from "react";

const BillsOptions = ({ setOption, options }) => {
  return (
    <Box bg="white" px="6" py="9" rounded="md">
      <Text mb="3" fontWeight={700} fontSize="20px">
        Make purchase
      </Text>
      <Text fontSize="12px" mb="9" w="85%">
        Select purchase you want to make
      </Text>
      <Box>
        {Object.keys(options)?.length > 0 &&
          Object.values(options)?.map((option) => (
            <Box
              cursor="pointer"
              mb="2"
              px="18px"
              py="4"
              fontWeight="700"
              color="app.primary.900"
              bg="app.primaryTrans"
              rounded="md"
              onClick={() => setOption(option)}
            >
              {option}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default BillsOptions;
