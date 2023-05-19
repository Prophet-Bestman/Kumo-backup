import { Box, Grid, Input, Stack, Text } from "@chakra-ui/react";
import LargeHeading from "components/LargeHeading";
import React from "react";

const TransactionRate = ({ transactionRate }) => {
  return (
    <Box>
      <LargeHeading>Transaction Rate</LargeHeading>

      <Grid
        templateColumns={["repeat(1, 1fr)", , "repeat(2, 1fr)"]}
        w={["100%", , , "85%"]}
        gap="8"
      >
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Crypto Amount
          </Text>
          <Input isReadOnly value={transactionRate?.coin_dollar_rate} />
        </Stack>
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Naira - Dollar Rate
          </Text>
          <Input isReadOnly value={transactionRate?.naira_dollar_rate} />
        </Stack>
      </Grid>
    </Box>
  );
};

export default TransactionRate;
