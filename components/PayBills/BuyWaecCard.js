import { Box, Input, Stack, Text } from "@chakra-ui/react";
import TextButton from "components/TextButton";
import React from "react";

const BuyWaecCard = ({ setShowConfirm }) => {
  return (
    <Box bg="white" px="6" py="9" rounded="md">
      <Text mb="3" fontWeight={700} fontSize="20px">
        Buy WAEC Scratch Card
      </Text>
      <Text fontSize="12px" mb="9" w="85%">
        Purchase WAEC scratch card by entering the number of Pins to Porchase
      </Text>

      <Box>
        <Stack>
          <Text fontSize="12px">Number of Scratch Cards</Text>
          <Input type="number" />
        </Stack>

        <Box mt="16">
          <Text fontSize="18px" fontWeight={700} textAlign="center">
            N 0.00
          </Text>

          <Text
            fontSize="12px"
            mt="4"
            textAlign="center"
            color="app.primary.500"
          >
            Your Bal: NGN 75,000
          </Text>

          <TextButton onClick={() => setShowConfirm(true)} mt="6">
            Confirm
          </TextButton>
        </Box>
      </Box>
    </Box>
  );
};

export default BuyWaecCard;
